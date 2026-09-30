# Sunny UI Design System

一套从 MediaIndex 实际界面中整理出的配色与质感系统。用 6 个单色、10 套多色、8 种材质和浅深模式自由组合，大小卡片、控件与侧栏一起变化。

这是可运行的前端代码，也是一份给设计者和 AI 使用的参考。界面质量还需要结合实际内容与布局验收。

## 运行示例

```sh
pnpm install --frozen-lockfile
pnpm dev
```

打开终端显示的本地地址，点击右上角外观按钮。`pnpm build` 会构建可复用库和独立演示网站；`pnpm preview` 预览演示构建。

## 带到其他项目

最快的方式是复制 [`skills/sunny-ui-design/assets/appearance`](skills/sunny-ui-design/assets/appearance)，导入组件和 CSS。接入步骤见 [集成说明](skills/sunny-ui-design/references/integration.md)。本仓库也提供 ESM 库构建和 TypeScript 类型，可以通过 Git 依赖或打包文件使用，尚未发布到 npm。

- [设计规范](skills/sunny-ui-design/references/design-standard.md)：字体、布局、色彩、材质、交互和响应式规则。
- [Sunny 的常用标准](docs/sunny-preferences.md)：用于其他项目时要保留的设计偏好和适用范围。
- [AI 设计 Skill](skills/sunny-ui-design/SKILL.md)：读取后按规范完成界面或接入外观系统。
- [来源与许可](docs/sources.md)：代码出处、参考项目与第三方技能。

## 让 AI 参考

可直接提供仓库地址，并要求：“读取 `AGENTS.md` 和 `skills/sunny-ui-design/SKILL.md`，按里面的规范设计前端。先了解现有页面结构，再复用配色与质感模块，最后验证手机与桌面效果。”

也可把 `skills/sunny-ui-design` 整个目录复制到你的技能目录。代码与详细参考都在该目录内，复制后仍能使用。

## 许可

GPL-3.0-only。代码源自 [MediaIndex](https://github.com/xudong7587/media-index)，保留其许可。第三方参考只用于设计思路，不附带其源码或完整 Skill；使用时遵循对应项目许可。
