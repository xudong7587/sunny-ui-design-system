# 液态玻璃接入

2.1 复用 SunnyTV 的圆角距离、法线与 circleMap 折射算法，将几何信息写进 SVG 位移纹理，再对元素背后的真实网页内容做柔化和折射。没有采集页面截图、读取业务内容或逐帧复制 DOM。浏览器滚动和背景变化不需要重新生成纹理。

React 项目使用完整 SunnyUI 样式：

```tsx
import { LiquidGlass } from "@xudong7587/sunny-ui-design-system";
import "@xudong7587/sunny-ui-design-system/styles.css";

<LiquidGlass className="sunny-glass-toolbar" radius={999} role="navigation" aria-label="主导航">
  <button aria-current="page">首页</button>
  <button>媒体库</button>
</LiquidGlass>
```

内部按钮保持普通 HTML。`variant` 支持 `glass`、`frosted`、`aurora`；`renderer` 默认 `auto`，也可显式设为 `blur`。`radius` 是 CSS 像素。工具栏内边距保持四边相等，内层实际半径为外框经过胶囊钳制后的半径减去内边距与边框。例如外框33px、间距7px，内层26px。

已有按钮、弹窗或原生 popover 可使用 `useLiquidGlass<HTMLDialogElement>()`；纯网页可只导入没有 React 依赖的入口：

```js
import { enhanceLiquidGlass } from "@xudong7587/sunny-ui-design-system/liquid-glass";
import "@xudong7587/sunny-ui-design-system/liquid-glass.css";
const dispose = enhanceLiquidGlass(document.querySelector(".my-glass"));
// 移除组件时调用 dispose()，释放观察器、SVG 和媒体查询监听。
```

单独导入玻璃 CSS 不会引入全站预览样式。宿主需提供 `--surface`、`--text`，极光还使用 `--accent`、`--accent-2`。可将构建的 `dist/liquid-glass.js` 和玻璃 CSS 作为静态文件使用；SunnyTV 官网即采用同一份构建。注意宿主类名冲突。

需要磨砂阅读区时，在玻璃外框内加入 `.sunny-glass-reading`。父框四边留相同间距，内层同心半径会由增强器计算；不要手写一个与外框无关的固定圆角。外框21%底色保留，阅读层65%底色帮助区分背景。

调用 `configureAppearance()` 后，`glass/frosted/aurora` 会自动增强 `.topbar`、`.sunny-picker`、`.task-dialog` 和 `dialog.detail`。其他材质不改变；原生 dialog 的焦点和 Esc 行为保留，玻璃弹窗外侧不压暗。没有调用此函数的宿主可自行调用 `installLiquidGlass()`，其返回值也是清理函数。

自动模式只在已验证的 Chromium 路径启用 SVG 背景折射。其他引擎使用原生背景模糊；没有背景滤镜、减少透明度或强制颜色时采用实色。实际浏览器视觉可能不同，不能把 Android 的 AGSL 性能或 Android 版本要求套在网页上。位移图片是本地生成的 `data:` URL；限制该图片来源的 CSP 宿主应使用 `renderer="blur"`，无需放宽脚本权限。

几何纹理最长边640像素，只在尺寸和圆角改变时更新；没有空闲帧循环。第三方来源、固定版本和修改范围见 `liquid-glass-NOTICE.txt`，Apache-2.0 许可全文随目录保留。
