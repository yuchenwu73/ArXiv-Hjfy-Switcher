// 在 arXiv 摘要页添加"幻觉翻译"链接
(function () {
  'use strict';

  // 仅在 arXiv 摘要页执行
  if (!window.location.pathname.startsWith('/abs/')) return;

  const pathname = window.location.pathname;
  let arxivIdWithVersion = pathname.substring(5);

  if (!arxivIdWithVersion) return;

  // 移除版本号
  const arxivId = arxivIdWithVersion.replace(/v\d+$/, '');

  // 定位父元素
  const parentSelector = '#abs-outer > div.extra-services > div.full-text > ul';
  let parentElement = document.querySelector(parentSelector);

  if (!parentElement) {
    // 尝试备用选择器
    parentElement = document.querySelector('.full-text ul');
    if (!parentElement) return;
  }

  // 检查是否已经添加过
  if (document.querySelector('#hjfy-link-li')) return;

  // 创建链接
  const newLink = document.createElement('a');
  newLink.href = `https://hjfy.top/arxiv/${arxivId}`;
  newLink.textContent = '幻觉翻译';
  newLink.target = '_blank';
  newLink.title = '跳转到 hjfy.top 查看翻译';

  const newLi = document.createElement('li');
  newLi.id = 'hjfy-link-li';
  newLi.appendChild(newLink);

  parentElement.appendChild(newLi);
})();
