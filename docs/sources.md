# 来源与许可

代码基于 MediaIndex 在 2026-09-30 开发的外观模块，来源项目使用 GPL-3.0。本仓库保留 GPL-3.0-only 与来源说明；没有附带 MediaIndex 的后台、数据、账号或本地调试模拟器。

2026-10-09 的 soft 更新提炼自 MediaIndex Next `apps/web/src/style.css` 的柔软浮雕视觉：外层双向柔影、内层 inset、主辅色轻染及24px参考圆角。映射为本仓库的共享表面令牌并补齐控件状态；未复制宿主页面、导航、负间距布局或业务实现。更新代码仍只维护在 `skills/sunny-ui-design/assets/appearance/`。

设计与交互参考：

- [Emil Kowalski 的公开技能](https://github.com/emilkowalski/skills)：主要设计工程与交互来源。仓库的本地 `emil-design-eng`、`apple-design` 等技能只提供了本次工作的指导，没有复制全文到这里。
- [LiquidGlass UI](https://github.com/hwyuanzi/LiquidGlass-UI)：半透明、磨砂、亮边与材质层次的参考。
- [Soft UI Dashboard](https://github.com/creativetimofficial/Soft-UI-Dashboard)：柔和浮雕与浅阴影的参考。
- [shadcn/ui](https://github.com/shadcn-ui/ui) 与 [Radix Themes](https://github.com/radix-ui/themes)：克制的轮廓、组件结构与阅读层次的参考。
- [daisyUI](https://github.com/saadeghi/daisyui)：主题与设计 token 的参考。
- [Catppuccin](https://github.com/catppuccin/palette)、[Nord](https://github.com/nordtheme/nord)、[Radix Colors](https://github.com/radix-ui/colors)：色系参考，已针对浅深背景和本产品调整，并非这些项目的官方移植或完全相同的色表。

上述项目只是设计参考，不随仓库重新分发其组件或 Skill。依赖 React、Vite 和 Phosphor Icons 使用各自的许可；锁文件保存版本。复用者需遵守本仓库及实际引入依赖的许可。
