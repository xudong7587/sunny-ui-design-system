import { useState } from "react";
import { House, Stack, MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";
import { LiquidGlass } from "../src";
import scene from "./optical-scene.svg";

export function GlassShowcase() {
  const [selected,setSelected] = useState("首页");
  return <section className="panel panel-pad" id="liquid-glass">
    <header className="panel-head"><div><h2>一整片玻璃，让背景透进来。</h2><small>来自 SunnyTV 的柔和折射与亮边，图标和文字保持清晰。</small></div></header>
    <div className="sunny-optical-scene"><img src={scene} alt="用于观察折射的柔和彩色山峦插画" />
      <LiquidGlass className="sunny-glass-toolbar" role="navigation" aria-label="玻璃导航" radius={999}>
        {[ ["首页",House], ["媒体库",Stack], ["搜索",MagnifyingGlass], ["设置",SlidersHorizontal] ].map(([label,Icon]) => {
          const name=label as string;const Symbol=Icon as typeof House;
          return <button key={name} aria-label={name} aria-current={selected===name ? "page" : undefined} onClick={() => setSelected(name)}><Symbol size={24} weight={name===selected ? "fill" : "regular"}/><span>{name}</span></button>;
        })}
      </LiquidGlass>
    </div>
    <p className="sunny-demo-notice" role="status">当前：{selected}。这组导航用于体验材质与键盘操作，不连接媒体服务。</p>
    <p>玻璃跟随背后的真实页面内容。弹窗外侧保持原亮度，内部选项用柔和的聚焦面区分；不支持折射的浏览器自动使用背景柔化。</p>
  </section>;
}
