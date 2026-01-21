// 核心切换逻辑
async function performSwitch(tab) {
  const url = tab.url;
  if (!url) {
    return; // 安全检查
  }

  let newUrl = null;
  const parsedUrl = new URL(url);
  const pathname = parsedUrl.pathname;

  // --- 逻辑 1: 从 arXiv 跳转到 幻觉翻译 (HJFY) ---

  // 1a. 从摘要页 (abs)
  if (url.startsWith('https://arxiv.org/abs/')) {
    const idWithVersion = pathname.substring(5);
    const id = idWithVersion.replace(/v\d+$/, '');
    newUrl = `https://hjfy.top/arxiv/${id}`;
  }

  // 1b. 从 PDF 页 (pdf)
  else if (url.startsWith('https://arxiv.org/pdf/')) {
    let idWithVersion = pathname.substring(5);
    if (idWithVersion.endsWith('.pdf')) {
      idWithVersion = idWithVersion.slice(0, -4);
    }
    const id = idWithVersion.replace(/v\d+$/, '');
    newUrl = `https://hjfy.top/arxiv/${id}`;
  }

  // --- 逻辑 2: 从 幻觉翻译 (HJFY) 跳回 arXiv ---
  else if (url.startsWith('https://hjfy.top/arxiv/')) {
    const id = pathname.substring(7);
    if (id) {
      newUrl = `https://arxiv.org/abs/${id}`;
    }
  }

  // --- 执行跳转 ---
  if (newUrl) {
    await chrome.tabs.create({
      url: newUrl,
      index: tab.index + 1,
    });
  } else {
    console.log("此页面不是 arXiv 或 HJFY 页面，不执行跳转。");
  }
}

// 监听插件图标的点击事件
chrome.action.onClicked.addListener(performSwitch);

// 监听快捷键 (Ctrl+Shift+H)
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "toggle-switch") {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      performSwitch(tab);
    }
  }
});