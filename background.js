// 从 arXiv 页面 pathname 提取 arxiv ID（保留版本号；兼容 abs/pdf、.pdf 后缀、trailing slash、老格式如 cond-mat/0501001）
function extractArxivIdFromArxiv(pathname) {
  const match = pathname.match(/^\/(?:abs|pdf)\/(.+)$/);
  if (!match) return null;

  let id = match[1];
  id = id.replace(/\/+$/, '');             // 去除 trailing slash
  if (id.toLowerCase().endsWith('.pdf')) { // 去除 .pdf 后缀（版本号保留）
    id = id.slice(0, -4);
  }
  return id || null;
}

// 从 HJFY 页面 pathname 提取 arxiv ID（保留版本号）
function extractArxivIdFromHjfy(pathname) {
  const match = pathname.match(/^\/arxiv\/(.+)$/);
  if (!match) return null;

  let id = match[1].replace(/\/+$/, '');
  return id || null;
}

// 核心切换逻辑
async function performSwitch(tab) {
  if (!tab || !tab.url) return;

  let parsedUrl;
  try {
    parsedUrl = new URL(tab.url);
  } catch (e) {
    return;
  }

  const hostname = parsedUrl.hostname.replace(/^www\./, '');
  const pathname = parsedUrl.pathname;
  let newUrl = null;

  // arXiv → 幻觉翻译
  if (hostname === 'arxiv.org') {
    const id = extractArxivIdFromArxiv(pathname);
    if (id) newUrl = `https://hjfy.top/arxiv/${id}`;
  }
  // 幻觉翻译 → arXiv
  else if (hostname === 'hjfy.top') {
    const id = extractArxivIdFromHjfy(pathname);
    if (id) newUrl = `https://arxiv.org/abs/${id}`;
  }

  if (newUrl) {
    await chrome.tabs.create({
      url: newUrl,
      index: tab.index + 1,
    });
  } else {
    console.log('[arXiv ↔ HJFY] 当前页面不是 arXiv 或 HJFY 页面，不执行跳转。URL:', tab.url);
  }
}

// 监听插件图标点击
chrome.action.onClicked.addListener(performSwitch);

// 监听快捷键
chrome.commands.onCommand.addListener(async (command) => {
  if (command !== 'toggle-switch') return;
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) await performSwitch(tab);
  } catch (err) {
    console.error('[arXiv ↔ HJFY] 快捷键执行失败:', err);
  }
});

// 安装/更新时检测快捷键是否分配成功（Chrome 在快捷键冲突时会静默留空）
chrome.runtime.onInstalled.addListener(async (details) => {
  try {
    const commands = await chrome.commands.getAll();
    const toggle = commands.find((c) => c.name === 'toggle-switch');
    if (toggle && !toggle.shortcut) {
      console.warn(
        '[arXiv ↔ HJFY] 快捷键未分配（可能被其他扩展占用）。' +
        '请到 chrome://extensions/shortcuts 手动设置。'
      );
      // 首次安装时自动打开快捷键设置页；更新时不打扰用户
      if (details.reason === 'install') {
        chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
      }
    }
  } catch (err) {
    console.error('[arXiv ↔ HJFY] 检测快捷键状态失败:', err);
  }
});
