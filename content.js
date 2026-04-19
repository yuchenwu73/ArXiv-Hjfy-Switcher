// 在 arXiv 摘要页添加"幻觉翻译"链接
(function () {
  'use strict';

  // 必须在 arXiv 摘要页
  if (!/^\/abs\//.test(window.location.pathname)) return;

  // 提取 arXiv ID（保留版本号，使 hjfy 精确定位到对应版本；兼容 trailing slash、老格式如 cond-mat/0501001）
  let arxivId = window.location.pathname.substring(5);
  arxivId = arxivId.replace(/\/+$/, '');     // 去尾部斜杠

  if (!arxivId) return;

  // 定位父元素（主选择器 + 备用选择器）
  let parentElement =
    document.querySelector('#abs-outer > div.extra-services > div.full-text > ul') ||
    document.querySelector('.full-text ul');
  if (!parentElement) return;

  // 避免重复添加
  if (document.querySelector('#hjfy-link-li')) return;

  // 创建链接
  const link = document.createElement('a');
  link.href = `https://hjfy.top/arxiv/${arxivId}`;
  link.textContent = '幻觉翻译';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.title = '跳转到 hjfy.top 查看翻译';

  const li = document.createElement('li');
  li.id = 'hjfy-link-li';
  li.appendChild(link);

  parentElement.appendChild(li);
})();
