# ArXiv ↔ 幻觉翻译 切换器

<p align="left">
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg">
</p>

一键在 arXiv (PDF/abs) 页面 与 [幻觉翻译](https://hjfy.top/) 页面之间**双向切换**。

## 致谢 (Acknowledgements)

本项目基于 [guantongpeng/arxiv-hjfy-extension](https://github.com/guantongpeng/arxiv-hjfy-extension) 仓库 修改，增加了双向切换功能并优化了 ID 提取逻辑。感谢原作者 [Tongpeng Guan](https://github.com/guantongpeng)。

## 功能特性
-   **双向识别**：自动识别 arXiv 页面（`abs` 和 `pdf` 路径）和幻觉翻译页面。
-   **arXiv -> 幻觉翻译**：支持从 arXiv 摘要页或 PDF 页跳转到对应的幻觉翻译页。
-   **幻觉翻译 -> arXiv**：支持从幻觉翻译页跳回到 arXiv 摘要页。
-   **智能定位**：新标签页智能定位到当前标签右侧。
-   **现代规范**：基于 Manifest V3 规范开发。

## 安装方法

1.  打开谷歌浏览器扩展程序`chrome://extensions/`（或 Edge 浏览器的 `edge://extensions/`）。
2.  在页面右上角，**打开“开发者模式”**。

    ![image-20251028011741982](./assets/image-20251028011741982.png)

3.  下载本仓库（点击 `Code` -> `Download ZIP`），并**解压缩**。
4.  点击左上角的“**加载未打包的扩展程序**”，选择你刚刚**解压缩的那个文件夹**。
5.  加载成功后即可使用。

    <img src="./assets/image-20251028011701406.png" alt="image-20251028011701406" style="zoom:50%;" />

## 使用示例

点击浏览器右上角的插件图标即可触发跳转：

**1. 从 arXiv 跳转到 幻觉翻译**

（1）原始网址 (摘要页)
[https://arxiv.org/abs/2410.07087v1](https://arxiv.org/abs/2410.07087v1)

（2）转换后网址
[https://hjfy.top/arxiv/2410.07087](https://hjfy.top/arxiv/2410.07087)

**2. 从 幻觉翻译 跳回 arXiv**

（1）原始网址
[https://hjfy.top/arxiv/2410.07087](https://hjfy.top/arxiv/2410.07087)

（2）转换后网址
[https://arxiv.org/abs/2410.07087](https://arxiv.org/abs/2410.07087)

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/新功能`)
3. 提交更改 (`git commit -am '添加新功能'`)
4. 推送分支 (`git push origin feature/新功能`)
5. 发起 Pull Request

## 许可证

MIT © [yuchenwu73](https://www.google.com/search?q=https://github.com/yuchenwu73/ArXiv-Hjfy-Switcher)