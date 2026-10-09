# Sunny UI Design System

一套从 MediaIndex 实际界面中整理出的配色与质感系统。用 6 个单色、10 套多色、8 种材质和浅深模式自由组合，大小卡片、控件与侧栏一起变化。

这是可运行的前端代码，也是一份给设计者和 AI 使用的参考。界面质量还需要结合实际内容与布局验收。

**1.0.2：柔软浮雕标准更新。** 外层凸起、内层凹陷、主辅色轻染与深色柔光已沉淀到共享令牌；输入、选中、按压、禁用、错误与焦点都有对应表现。演示页包含实际可操作的筛选、表单、表格和确认弹窗。切换「柔软浮雕」即可检查；不需要复制 MediaIndex 的业务布局。详情见 [设计规范](skills/sunny-ui-design/references/design-standard.md)。

## 设计示意

以奶霜花园的玫红、青绿与莓红作为主视觉。下面的主视觉是 AI 生成的设计示意，展示配色与立体玻璃的方向，不是运行页面截图。文字、色值和实际样式以源码为准。

![奶霜花园：立体玻璃设计主视觉](docs/images/cream-garden-hero.png)

### 十套多色配色

从源码读取色值生成的 SVG，总览主色、辅色、点缀与顺时针渐变色盘。放大仍然清晰。更新配色后运行 `python docs/render_showcase.py` 即可重新生成。

![十套配色及实际色值](docs/images/palette-reference.svg)

### 八种质感

使用同样的奶霜花园配色和内容比较材质。iOS 玻璃最清透，极光玻璃半透，纸页与瓷面各有不同。此图是材质层次示意，不是浏览器截图。

![八种质感层次示意](docs/images/material-reference.svg)

### 可运行的玻璃效果

实际组件已增加方向性高光、亮边、内侧反光和悬浮阴影；背景透入大面板、小卡片与控件。运行本仓库演示，选择「奶霜花园 + iOS 玻璃」即可查看。实际布局和背景由宿主项目决定，主视觉中的三维物体不是组件的一部分。

### 柔软浮雕实测

以下为 1.0.2 演示页的实际浏览器截图，使用奶霜花园配色。外层浮起、内层压入，浅深模式使用不同的光影重量；详细验收范围见 [1.0.2 验证记录](docs/1.0.2-validation.md)。

![柔软浮雕浅色实际演示](docs/images/soft-desktop-light.jpg)

![柔软浮雕深色实际演示](docs/images/soft-desktop-dark.jpg)

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

下面两段可以直接复制给能读取 GitHub 仓库或本地文件的 AI。只给仓库链接也能表达方向，但同时指定阅读顺序、接入范围和验收要求，更容易复现效果。如果 AI 无法访问 GitHub，先下载仓库，再把本地目录提供给它。

### 直接给项目增加主题系统

```text
根据 https://github.com/xudong7587/sunny-ui-design-system 项目，给当前前端增加可复用的主题系统。

先读取该仓库的 README.md、AGENTS.md、skills/sunny-ui-design/SKILL.md、
references/design-standard.md、references/integration.md 和 docs/sunny-preferences.md
（references 位于 skills/sunny-ui-design 下），再了解当前项目的技术栈和页面结构。

优先复用 assets/appearance 中的组件、配色和 CSS，将色彩 × 质感 × 明暗独立组合，
提供外观选择入口、即时预览、浏览器偏好保存，并为当前项目设置独立 storagePrefix。
将质感适配到背景、侧栏、大卡片、小卡片、输入框和按钮；iOS 玻璃最透，极光玻璃半透。
保留业务功能和状态色，遵循现有项目的布局与交互约定。
如果技术栈不是 React，保留配色、CSS 变量和设计规范，用当前框架实现等价组件。

完成后验证明暗切换、刷新保留、手机布局、文字对比度和大小卡片的质感层次，
提供实际页面截图、修改清单和运行方法；复用代码时保留 GPL-3.0-only 许可要求。
```

### 先给我风格选项

```text
参考 https://github.com/xudong7587/sunny-ui-design-system 的设计规范、示例图和可复用代码，
先了解我的项目，给我 4～6 个明显不同的前端风格选项，让我指定后再实施。

每个选项写清：配色名称和 ID、质感名称和 ID、明暗模式、适合的内容、
大卡片／小卡片／控件的表现，并给一小块实际预览或注明对应的仓库示例图。
至少包括明亮玻璃、半透流光、暖色纸页和一个清晰克制的方案，主色不要都选紫色。
可参考：马卡龙 macaron + iOS 玻璃 glass；北境极光 nord + 极光玻璃 aurora；
蜂蜜麦田 honey + 纸页档案 paper；晴蓝 blue + 精致描边 outline。

我选定方案后，读取仓库 skill 和集成说明，复用主题模块接入现有项目，
保留业务行为，完成桌面、手机及明暗模式验收。
```

也可把 `skills/sunny-ui-design` 整个目录复制到你的技能目录。代码与详细参考都在该目录内，复制后仍能使用。

## 许可

GPL-3.0-only。代码源自 [MediaIndex](https://github.com/xudong7587/media-index)，保留其许可。第三方参考只用于设计思路，不附带其源码或完整 Skill；使用时遵循对应项目许可。
