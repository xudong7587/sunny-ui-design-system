# Sunny UI 项目指引

读取 `skills/sunny-ui-design/SKILL.md`，再按任务需要读取其引用。代码的唯一维护位置是 `skills/sunny-ui-design/assets/appearance/`；`src/index.ts` 只负责库导出，`demo/` 只负责演示，避免维护两份外观代码。

保持色彩、材质和明暗相互独立。更新材质时检查外层面板、内层卡片、按钮、输入框、侧栏和弹窗；更新配色时检查主按钮文字对比度及各方案主色的差异。状态色继续表达成功、警告、错误。

改动后运行 `pnpm typecheck` 和 `pnpm build`，在浏览器检查实际变化、刷新记忆和窄屏。不要为示例添加真实外部业务操作。发布或安装到其他项目需要相应用户授权。
