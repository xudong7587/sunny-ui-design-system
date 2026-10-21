# Changelog

## 2.0.0 — 2026-10-21

此版本按用户要求完全替换旧设计基准，不是对 1.x 的增量美化。

- 唯一视觉来源改为 MediaIndex-UI-Preview/index.html，完整提取原始 CSS 与预设。
- 弃用旧设计规范、历史视觉示意和旧 appearance 表面变量；重新编写规范与演示。
- 16 材质、10 单色、16 多色、2 明暗、3 圆角；保留原稿单色辅助色及霓虹材质自身的暗底效果。
- 原始材质 ID 使用 clear；旧 default 偏好读入后映射 clear，blocks 映射 satin。未知材质回退原稿默认 soft。
- React 接入保留 configureAppearance / useAppearanceTheme / AppearancePicker，新增原始 single / multi / corners 目录；样式及配色数据结构有破坏性变化，迁移见接入说明。
- 原稿外观浮层适配为原生 popover，支持 Esc 与外部点击收起；不改变原稿表面视觉。
- README 使用原稿浏览器截图，海报、主视觉、缩略图高斯模糊。

通过 GitHub Release 分发安装包和设计 Skill；未发布到 npm。
