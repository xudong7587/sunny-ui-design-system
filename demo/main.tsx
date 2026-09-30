import { createRoot } from "react-dom/client";
import { AppearancePicker, useAppearanceTheme, configureAppearance } from "../src";
import "./demo.css";
configureAppearance({ storagePrefix: "sunny-ui-demo" });
function Demo() {
  const [theme, setTheme] = useAppearanceTheme();
  return <div className="demo-shell">
    <aside className="appearance-sidebar"><a className="demo-brand" href="#overview"><span>S</span>Sunny UI</a><p>为你的产品选一种气质</p><nav aria-label="示例导航"><a href="#overview">工作台</a><a href="#materials">层次与材质</a><a href="https://github.com/xudong7587/sunny-ui-design-system">代码与规范 ↗</a></nav><small>色彩 × 质感 × 明暗</small></aside>
    <main><header className="demo-toolbar"><span>DESIGN PLAYGROUND</span><div><span>外观设置</span><AppearancePicker theme={theme} onThemeChange={() => setTheme(theme === "light" ? "dark" : "light")} /></div></header>
    <section className="demo-heading" id="overview"><p>YOUR SPACE, YOUR STYLE</p><h1>让界面有自己的气质。</h1><p>打开右上角外观设置。选颜色，再选材质，看看大小卡片、按钮和侧栏怎样一起变化。</p></section>
    <section className="demo-stats" aria-label="模块组成">{[["08","界面质感"],["10","多色搭配"],["02","明暗模式"]].map(([value,label]) => <article key={label} className="appearance-surface"><strong>{value}</strong><span>{label}</span></article>)}</section>
    <section className="demo-content"><article id="materials" className="appearance-surface"><p className="demo-eyebrow">MATERIAL LAYERS</p><h2>细节也有同样的质感</h2><p>外层面板、内层卡片与控件共用一套材质，但保留各自的重量和清晰度。</p><div className="demo-nested">{["主色 · 操作与选中","辅色 · 环境与层次","点缀 · 细节与氛围"].map((label,index) => <div key={label} className="appearance-surface-inner"><i style={{background:["var(--accent)","var(--appearance-secondary)","var(--appearance-tertiary)"][index]}} /><span>{label}</span></div>)}</div><div className="demo-actions"><button className="demo-primary">主要操作</button><button className="appearance-control">次要操作</button></div></article>
    <article className="appearance-surface"><p className="demo-eyebrow">READING & FEEDBACK</p><h2>颜色表达气氛，文字讲清内容</h2><label className="demo-field">项目名称<input className="appearance-control" defaultValue="我的工作空间" /></label><p className="demo-status"><span />所有设置已保存在这个浏览器</p><blockquote>玻璃应该透光，纸页应该温暖。每种质感都需要覆盖到小卡片。</blockquote><p className="demo-note">这是纯前端展示，按钮不会提交数据。</p></article></section>
    <footer>Sunny UI Design System · React + CSS tokens · GPL-3.0</footer></main></div>;
}
createRoot(document.getElementById("root")!).render(<Demo />);
