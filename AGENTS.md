# Sunny UI 2.0 项目指引

2026-10-23 用户授权例外：移入SunnyTV的液态玻璃到SunnyUI，再更新SunnyTV官网。2.1新增独立liquid-glass.css/ts与React组件，允许覆盖glass/frosted/aurora的指定导航、弹层和显式玻璃组件；其它材质及生成的preview.css/presets.ts保持原稿。玻璃检查以2.1验证记录为准，不把新玻璃伪称与2.0原稿逐像素相同。

先读 skills/sunny-ui-design/SKILL.md。唯一视觉基准为用户指定的 MediaIndex-UI-Preview/index.html，提取结果位于 skills/sunny-ui-design/assets/appearance/preview.css 与 presets.ts。禁止恢复旧版规范或用旧设计覆盖原稿。

preview.css 与 presets.ts 通过 docs/import-preview.cjs 生成，不手改。appearance.css 只允许 React 容器/原生弹层的机制适配，不另加颜色、材质、字体、圆角。demo/demo.css 只放示例内容布局。

变更后运行 pnpm typecheck、pnpm build；浏览器核对原稿与库的 computed style、四维选择、刷新、跨标签、键盘与窄屏。检查结果写入版本验证记录。README 的影视海报、主视觉和缩略图必须高斯模糊。不得将宿主演示数据或静态界面说成实际业务验收。
