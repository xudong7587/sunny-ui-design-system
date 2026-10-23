# Sunny UI 2.1.0

2.1 把 SunnyTV 的液态玻璃带到网页：导航与弹窗折射真实页面背景，文字和图标保持清晰。聚焦面与外框使用同心圆角；弹窗内层磨砂，外侧保持原亮度。

- React 提供 `LiquidGlass`、`useLiquidGlass`，普通网页可使用独立的 `./liquid-glass` 和 `./liquid-glass.css` 入口。
- 保留 2.0 的 16 种材质及明暗、配色、圆角预设，生成的基础 CSS 和预设文件保持原稿。
- Chromium 使用背景折射，其他引擎默认背景模糊；减少透明度、强制颜色或不支持滤镜时采用实色。网页不受 Android 版本限制。
- 设计 Skill 包含组件源码、设计规范、接入说明和第三方许可，可解压后交给设计或开发工具使用。

附件 `xudong7587-sunny-ui-design-system-2.1.0.tgz` 是可供包管理器本地安装的库，尚未发布到 npm。`sunny-ui-design-skill-2.1.0.zip` 是完整设计 Skill。`sunny-ui-glass-source-2.1.0.zip` 是与 SunnyTV 官网同时交付的组件源码快照；完整本版源码以 Git 标签为准。附件均保留此前已交付的字节，仓库 README 仅更新下载说明。

类型检查与构建通过。Microsoft Edge 实测背景折射、前景清晰度、同心圆角、弹窗外侧亮度、键盘与窄屏；2496 组原有外观组合的指定计算样式与基础 CSS 一致。Safari、Firefox 尚未进行实体浏览器逐项验收，详见 [验证记录](2.1.0-validation.md)。

SHA256：

```text
b54519e36ec868d204f4cf1ded51fe50bac935c4508a6562f4e91abca20c4bad  xudong7587-sunny-ui-design-system-2.1.0.tgz
5933f6e20c1ea5159afba9ce5a4f7fe58d083f593cd371228553478403490bc6  sunny-ui-design-skill-2.1.0.zip
39f44e04625688f2e5f42bab9e7a80197d7bd1a4d15d76e1d205393ce575b1ac  sunny-ui-glass-source-2.1.0.zip
```

Sunny UI 使用 GPL-3.0-only；玻璃几何移植所含的 Apache-2.0 许可和署名随源码、安装包及 Skill 提供。
