# Sunny UI 2.0 接入说明

## 文件与职责

完整复制 assets/appearance/：preview.css 是原稿全部样式，presets.ts 是生成的预设，appearance.css 仅适配原生 popover 位置，AppearancePicker.tsx 负责 React 行为。安装 react、react-dom 和 @phosphor-icons/react。

```tsx
import { AppearancePicker, configureAppearance, useAppearanceTheme } from "./appearance/AppearancePicker";
import "./appearance/appearance.css";
configureAppearance({ storagePrefix: "my-app" });
function Toolbar() {
  const [theme, setTheme] = useAppearanceTheme();
  return <AppearancePicker theme={theme} onThemeChange={() => setTheme(theme === "light" ? "dark" : "light")} />;
}
```

configureAppearance 在 React 挂载前调用。SSR 框架中组件放客户端入口。构建包导入 @xudong7587/sunny-ui-design-system，并显式导入同包 /styles.css。

## 样式范围

原始 CSS 包含 body、button、h1、table.tbl 及 app / panel 等全局类，适合全站接入。不要在现有宿主中盲目追加：先检查类名冲突、字体和层叠，再按原稿组件结构映射。不允许为了维持旧 Sunny UI 视觉而补回旧样式。业务内容和布局扩展放宿主文件，色彩、材质、阴影和圆角以原稿为准。

```tsx
<section className="panel panel-pad">
  <header className="panel-head"><div><h2>标题</h2><small>说明</small></div></header>
  <article className="entry-card">内层内容</article>
  <label className="field">名称<input className="input" /></label>
  <button className="btn primary">保存</button>
</section>
```

## 四维与持久化

DOM：data-theme / data-material / data-color / data-corner。存储键：<prefix>-theme/material/color/corner；默认前缀 sunny-ui。默认 light / soft / blue / default。旧 accent 存储键仅作为 color 缺失时的回退；旧材质 default → clear、blocks → satin。未知项分别回退 light / soft / blue / default。

选择即时写 DOM 并通过事件同步同页实例，storage 事件同步同源标签页。存储被禁止时只保证当前标签会话选择，无法刷新恢复。theme hook 的 setter 接收 Theme 值；外观 UI 由 onThemeChange 回调同步。

## 1.x 迁移：视觉不保留

| 原入口 | 2.0 对应 |
| --- | --- |
| .appearance-surface | .panel；根据内容加 .panel-pad |
| .appearance-surface-inner | 根据内容选 .entry-card / .step-card 等，不再有统一内层材质 |
| .appearance-control | 输入用 .input，按钮用 .mini-btn / .btn，图标用 .icon-btn |
| .appearance-sidebar | .sidebar（含原稿布局） |
| .appearance-dialog | 业务弹窗用 .task-dialog / dialog.detail；外观由组件负责 |
| --material-fill / edge / blur | --mat-fill / edge / blur |
| --shadow-card | --mat-shadow |
| --material-control / control-shadow | --mat-control / control-shadow |
| data-accent | data-color |

导出 materials / single / multi / corners 来自原稿；accents 是 single 与 multi 的联合，多色 light/dark 是三元组，单色是色值字符串。Material 正式 ID 为 clear，旧 default 只在读存储时兼容。新增 Corner / Color / Material 类型。默认主题材质改为 soft，圆润比例 1.9。

原生 popover 需要支持该 API 的现代浏览器。面板支持原生外部点击和 Esc 关闭；移动端遵循原稿底部浮层。它不使用模态焦点陷阱，Tab 按页面顺序操作。业务确认弹窗使用原生 dialog，按宿主行为处理。

## 更新设计来源

仓库中运行 node docs/import-preview.cjs <已确认的HTML路径> 重新生成 preview.css、presets.ts 与来源指纹。导入只执行预设数组字面量，不执行 HTML 的业务脚本。运行类型检查、构建和浏览器一致性检查后再交付。不要根据旧规范修改生成文件。
