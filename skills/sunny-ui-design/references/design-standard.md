# Sunny UI 2.0 设计规范

2.1 用户授权例外：SunnyTV 玻璃扩展独立于原稿，glass/frosted/aurora 的指定导航/弹层及显式 LiquidGlass 组件使用真实背景滤镜。内外圆角保持同心，前景清晰，弹窗外侧不压暗。其余材质继续按下文原稿规则，禁止改动生成文件冒充原稿更新。

## 唯一依据

本规范只总结用户指定的 MediaIndex-UI-Preview/index.html。原始样式位于 ../assets/appearance/preview.css，预设位于 presets.ts。**旧 Sunny UI 规范全部弃用**。文字总结与 CSS 不一致时，以原稿实际 CSS 层叠结果为准，不能补入旧版偏好。

## 四维模型

`html` 使用 `data-theme="light|dark"`、`data-material`、`data-color`、`data-corner="tight|default|round"`。默认 light / soft / blue / default。每个选择单独保存，切换时不重置其他维度；材质可按原稿定义自己的阅读底色，例如 neon 自带暗底，但不修改 theme 选择值。

圆角系数 0.42 / 1 / 1.9。面板用 `calc(var(--mat-radius,22px) * var(--corner-scale,1))`，其余组件使用自己的原稿公式。不能把所有组件统一成同一圆角，也不能机械要求所有胶囊都不缩放：原稿 pill、status-chip 等包含缩放，圆形色盘保持 50%。支持时使用 `corner-shape:superellipse(1.35)`；不支持时自然退回 border-radius。

## 16 种材质

| ID | 名称 | 原稿说明 |
| --- | --- | --- |
| `soft` | 柔软浮雕 | 连续基底上的连续凸起，控件按下会凹 |
| `clear` | 清晰默认 | 中性实色、轻边线，内容优先 |
| `paper` | 纸页档案 | 暖纸、纤维、内嵌压痕 |
| `linen` | 亚麻织纹 | 斜向织纹，哑光无釉 |
| `glass` | iOS 玻璃 | 清透中心、亮边、悬浮投影 |
| `frosted` | 雾面玻璃 | 更雾更厚，整块贴在墙上 |
| `aurora` | 极光玻璃 | 三色柔光在玻璃后流动 |
| `duotone` | 双色渐层 | 实色方向渐变，与玻璃拉开 |
| `satin` | 缎光瓷面 | 斜向釉光，细腻高光 |
| `outline` | 精致描边 | 只有线和一点底部厚度 |
| `metal` | 拉丝金属 | 横向拉丝、硬高光、冷银 |
| `clay` | 陶土哑光 | 暖色、颗粒、影子里没有高光 |
| `marble` | 大理石 | 石纹大理面配釉光 |
| `neon` | 霓虹暗夜 | 深色面板、边缘发光 |
| `cutout` | 纸片拼贴 | 硬投影和实边线，像贴上去 |
| `mesh` | 雾面色场 | 页面很彩色，卡片退成哑光面 |

材质令牌覆盖整个界面：

| 角色 | Token |
| --- | --- |
| 页面与外壳 | `--mat-page`、`--mat-sidebar`、`--mat-sidebar-shadow`、`--mat-chrome` |
| 面板 | `--mat-fill`、`--mat-edge`、`--mat-shadow`、`--mat-radius`、`--mat-blur` |
| 控件 | `--mat-control`、`--mat-control-edge`、`--mat-control-shadow` |
| 输入 | `--mat-input-shadow` |
| 选中 | `--mat-active-bg`、`--mat-active-shadow` |

各材质可以改变 --bg / --surface 等阅读基底。不要只换外层阴影，也不要给所有内层补同一种凹陷：原稿 entry-card 使用半透明 surface 与细边线；输入则消费 mat-input-shadow。按组件本身决定层次。

## 配色目录

`--accent` 为主色，`--accent-2`、`--accent-3` 为辅助与点缀。单色预设仍包含辅助装饰色，不能折叠成同一主色。成功、警告和错误分别使用 --success / --warning / --danger。浅深基础文字、背景与状态色直接采用原稿；不额外加入旧版自动按钮反色算法。

以下是原稿选择器目录。实际页面色值由 preview.css 中 data-color 和 data-theme 的规则决定；原稿少数色盘元数据与 CSS 有细微差异，保留原状，不自行“校正”。

| 类型 | ID | 名称 |
| --- | --- | --- |
| 单色 | `blue` | 晴蓝 |
| 单色 | `celadon` | 青瓷 |
| 单色 | `green` | 松绿 |
| 单色 | `violet` | 鸢紫 |
| 单色 | `rose` | 莓红 |
| 单色 | `brick` | 砖窑 |
| 单色 | `amber` | 琥珀 |
| 单色 | `mustard` | 芥末 |
| 单色 | `indigo` | 靛蓝 |
| 单色 | `slate` | 石墨 |
| 多色 | `catppuccin` | 奶霜花园 |
| 多色 | `nord` | 北境极光 |
| 多色 | `iris` | 鸢尾暮色 |
| 多色 | `deepsea` | 深海鎏金 |
| 多色 | `coast` | 海盐日落 |
| 多色 | `lava` | 暮色熔岩 |
| 多色 | `macaron` | 马卡龙 |
| 多色 | `cedar` | 薄荷雪松 |
| 多色 | `peach` | 蜜桃乌龙 |
| 多色 | `lavender` | 蓝调花雾 |
| 多色 | `mist` | 海雾晨光 |
| 多色 | `forest` | 雨后花园 |
| 多色 | `honey` | 蜂蜜麦田 |
| 多色 | `oasis` | 沙漠绿洲 |
| 多色 | `ruby` | 红茶玫瑰 |
| 多色 | `nightviolet` | 紫罗兰夜 |

单色色盘为圆点，多色色盘采用主色 → 辅色 → 点缀 → 主色的 conic-gradient。选中使用双层环线；材质缩略图使用原稿 sample，不用旧版手绘示意替代。

## 字体、尺寸与节奏

字体顺序为 PingFang SC、Microsoft YaHei、Noto Sans SC、平台系统字体。正文 14.5px / 1.6；页面 h1 为 clamp(26px,2.4vw,32px)、字重 760；模块 h2 通常 15–16px、字重 700；说明多为 11–13.5px。各组件数值以原稿为准，不叠加其他旧字体规范。

桌面侧栏 252px，顶栏 62px；内容最大宽 1560px，常规内边距 26px 30px 34px、区块间距 22px。面板常用内边距 18px，未加 panel-pad 的面板标题为 17px 18px 0。同排 split 拉伸等高，列间距 18px；指标与卡片网格间距 14px。

## 组件组合

- 外壳：app / sidebar / workspace / topbar / content；一级导航稳定，页面内部再放分区条。
- 信息块：panel、panel-head、panel-pad、stat-strip、stat-tile；先摘要与主操作，再详情。
- 内层：entry-card、step-card、task-card 等按内容选择，不为所有内层添加相同投影。
- 控件：input、btn primary/ghost、mini-btn、icon-btn、switch；输入、次要按钮、主按钮有不同表面处理。
- 状态：pill 的 ok / warn / err / info / idle；进度有轨道和数值，不能用装饰配色替代状态含义。
- 表格：tbl-wrap 内横向滚动，tbl 保持信息对齐。任务卡保留路径、状态、失败原因和操作，局部展开只针对对应项目。
- 外观：360px 浮层、16px 内边距，材质两列、单色与多色色盘换行。业务弹窗使用 task-dialog 或 detail 的独立结构，不借用外观弹层定位。

## 响应式与交互

1100px 以下 split 转单列、指标两列；860px 以下发现页进一步压缩；720px 以下侧栏成为 264px 抽屉，顶栏 56px，内容 16px 14px 24px / gap 18px，表单单列。外观浮层左右下边距 12px、最大高度 70vh。更具体的页面断点按原稿选择器保留。

通用缓动 `cubic-bezier(.22,.61,.36,1)`；普通控件约 140–180ms，面板背景 300ms，圆角 200ms，浮层 pop 180ms；主视觉淡入淡出 700ms。按压缩放使用对应组件的 .94 / .96 / .97。不要追加旧版统一动效规则。

原稿包含 prefers-reduced-motion、prefers-reduced-transparency、forced-colors；按原稿保留。接入后需验证键盘可达性、焦点、可滚动区域和真实内容阅读；原稿一致性不等于全部无障碍指标已认证。

## 截图与验收

README 截图必须来自新版样式。影视海报、主视觉画面、缩略图做高斯模糊，只保存处理后的图像。静态稿截图与真实业务验收应分开说明。

检查原稿与实现的 CSS 指纹和浏览器计算样式、16 材质、浅深、配色与圆角组合，检查 320/390/700/1440 宽度、四维独立、刷新恢复、跨标签同步和未知值回退。测试结果单独记录，不把规范写成测试通过证明。
