// 监听插件图标的点击事件
chrome.action.onClicked.addListener(async (tab) => {
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
    // 路径: /abs/2401.01234v1 或 /abs/hep-th/9409089
    const idWithVersion = pathname.substring(5); // 截取 "/abs/" (长度5) 之后
    // 移除版本号 (v1, v2...)
    const id = idWithVersion.replace(/v\d+$/, ''); 
    newUrl = `https://hjfy.top/arxiv/${id}`;
  } 
  
  // 1b. 从 PDF 页 (pdf)
  else if (url.startsWith('https://arxiv.org/pdf/')) {
    // 路径: /pdf/2401.01234.pdf 或 /pdf/hep-th/9409089.pdf
    let idWithVersion = pathname.substring(5); // 截取 "/pdf/" (长度5) 之后
    
    // 移除 .pdf 后缀
    if (idWithVersion.endsWith('.pdf')) {
        idWithVersion = idWithVersion.slice(0, -4); // 移除最后 4 个字符
    }
    
    // 移除版本号
    const id = idWithVersion.replace(/v\d+$/, ''); 
    newUrl = `https://hjfy.top/arxiv/${id}`;
  }
  
  // --- 逻辑 2: [你缺少的功能] 从 幻觉翻译 (HJFY) 跳回 arXiv ---
  
  else if (url.startsWith('https://hjfy.top/arxiv/')) {
    // 路径: /arxiv/2401.01234
    const id = pathname.substring(7); // "/arxiv/" 长度为 7
    if (id) {
      newUrl = `https://arxiv.org/abs/${id}`; // 默认跳回摘要页
    }
  }

  // --- 执行跳转 ---
  
  // 如果成功生成了 newUrl，就在新标签页中打开它
  if (newUrl) {
    await chrome.tabs.create({
        url: newUrl,
        index: tab.index + 1, // 定位到当前标签右侧
      });
  } else {
    console.log("此页面不是 arXiv 或 HJFY 页面，不执行跳转。");
  }
});