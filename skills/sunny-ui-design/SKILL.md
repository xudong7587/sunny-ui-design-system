---
name: sunny-ui-design
description: 按 Sunny UI 2.0 的 MediaIndex 新预览样式设计 React 页面或接入四维外观系统，复用原稿配色、材质、布局与控件；适用于明确希望复用 Sunny UI 风格的任务。
---

# Sunny UI Design · 2.0

唯一视觉基准为用户指定的 MediaIndex-UI-Preview/index.html。其完整样式和预设已提取到 assets/appearance/preview.css 与 presets.ts。旧版 Sunny UI 设计规则全部弃用，不能混用或恢复。

1. 读 [设计规范](references/design-standard.md)，接入时读 [集成说明](references/integration.md)。有冲突以原始 CSS 的实际层叠结果为准。
2. 复用原始 class 与 --mat-* token。明暗、材质、配色、圆角独立存储；不要添加原稿没有的材质解释或覆盖规则。
3. 根据当前业务使用原稿的外壳、面板、卡片、表单、表格与局部展开。保留业务操作、状态和数据，不复制静态演示逻辑作为业务实现。
4. 改版后检查原稿与宿主的实际计算样式，验证浅深、各材质、圆角、手机和外观保存。只有实际完成的检查才能写成通过。
5. 用截图介绍设计时，对影视海报、主视觉及缩略图做高斯模糊，只交付处理后的图片。

源码目录完整复制，React 组件负责行为，CSS 负责视觉。原稿更新通过 docs/import-preview.cjs 重新提取。仓库中的 docs/design-source.json 记录来源指纹；独立使用本 Skill 时无需该脚本，只需本目录 assets 与 references。
