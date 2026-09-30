"""Build crisp, code-derived SVG reference boards (no browser screenshots)."""
from pathlib import Path
import math
import re

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "docs/images"
SOURCE = (ROOT / "skills/sunny-ui-design/assets/appearance/AppearancePicker.tsx").read_text(encoding="utf-8")
FONT = 'font-family="Inter,Segoe UI,Microsoft YaHei,sans-serif"'

def text(x, y, label, size=20, fill="#25303f", weight=400):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" font-weight="{weight}" {FONT}>{label}</text>'

def rect(x,y,w,h,fill,rx=20,stroke="none",extra=""):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" {extra}/>'

def start(h, title, subtitle):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="{h}" viewBox="0 0 1280 {h}" role="img" aria-label="{title}">
    <defs><filter id="shadow" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#75364e" flood-opacity=".08"/></filter>
    <linearGradient id="ambient" x2="1" y2="1"><stop stop-color="#f7dce7"/><stop offset=".5" stop-color="#f9f4f0"/><stop offset="1" stop-color="#cfedeb"/></linearGradient>
    <linearGradient id="aurora"><stop stop-color="#f4d5e5" stop-opacity=".66"/><stop offset="1" stop-color="#b9e2df" stop-opacity=".66"/></linearGradient>
    <linearGradient id="duotone" x2="1" y2="1"><stop stop-color="#f3d5e5"/><stop offset="1" stop-color="#c4e8e7"/></linearGradient>
    <linearGradient id="satin" x2=".6" y2="1"><stop stop-color="#fff"/><stop offset=".48" stop-color="#fff0f5"/><stop offset="1" stop-color="#eed9e4"/></linearGradient>
    </defs>{rect(0,0,1280,h,'#faf8f6',0)}
    {text(52,64,'SUNNY UI / DESIGN REFERENCE',14,'#ad5276',600)}
    {text(52,119,title,38,weight=700)}{text(52,157,subtitle,18,'#697481')}
    '''

def wheel(cx,cy,r,colors):
    rgb=[tuple(int(c[i:i+2],16) for i in (1,3,5)) for c in colors]
    pieces=[]
    for i in range(180):
        p=i/180*3; j=int(p); t=p-j
        a=rgb[j]; b=rgb[(j+1)%3]
        c='#'+''.join(f'{round(a[k]*(1-t)+b[k]*t):02x}' for k in range(3))
        ang=-math.pi/2+i/180*2*math.pi; ang2=ang+2*math.pi/180+.015
        x1=cx+r*math.cos(ang);y1=cy+r*math.sin(ang)
        x2=cx+r*math.cos(ang2);y2=cy+r*math.sin(ang2)
        pieces.append(f'<path d="M{cx},{cy} L{x1:.3f},{y1:.3f} A{r},{r} 0 0 1 {x2:.3f},{y2:.3f} Z" fill="{c}"/>')
    return ''.join(pieces)

palettes=[]
for line in SOURCE.splitlines():
    if 'secondary:' not in line: continue
    fields=dict(re.findall(r'(id|name|light|secondary|tertiary): "([^"]+)"',line))
    palettes.append(fields)
s=start(1030,'十套配色，各有主角','主色 × 辅色 × 点缀 · 色盘按钟表方向渐变 · 色值来自实际代码')
for i,p in enumerate(palettes):
    x=52+(i%2)*600;y=196+(i//2)*151
    s+=rect(x,y,576,130,'#ffffff',24,'#ece6e9')
    colors=[p['light'],p['secondary'],p['tertiary']]
    s+=wheel(x+65,y+65,38,colors)
    s+=text(x+124,y+43,p['name'],23,weight=650)+text(x+124,y+68,p['id'],13,'#87909a')
    for j,c in enumerate(colors):
        s+=rect(x+124+j*135,y+86,14,14,c,7)+text(x+145+j*135,y+98,c.upper(),13,'#687381',500)
s+=text(52,991,'色值以源码为准。浅深模式分别配置颜色；状态色独立保留业务语义。',15,'#7c828b')+'</svg>'
OUT.mkdir(parents=True,exist_ok=True)
(OUT/'palette-reference.svg').write_text(s,encoding='utf-8')

materials=[('glass','iOS 玻璃','最清透 · 多层亮边'),('aurora','极光玻璃','半透明 · 流光层次'),('paper','纸页档案','暖纸面 · 安静阅读'),('satin','缎光瓷面','柔亮釉光 · 微曲面'),('soft','柔软浮雕','浅浮雕 · 温润触感'),('outline','精致描边','细轮廓 · 利落层次'),('duotone','双色渐层','实色渐变 · 色彩交融'),('default','清晰默认','轻边线 · 内容优先')]
s=start(1040,'一种配色，八种质感','统一使用奶霜花园 · 保持同样的内容，比较表面、层次和控件')
for i,(key,name,desc) in enumerate(materials):
    x=52+(i%4)*300;y=198+(i//4)*390
    s+=text(x,y+24,name,23,weight=650)+text(x,y+51,desc,14,'#77808b')
    s+=rect(x,y+72,276,264,'url(#ambient)',26)
    # Distinct layers are diagrammatic, not a promise of pixel-identical rendering.
    fill={'glass':'#ffffff','aurora':'url(#aurora)','paper':'#f8f1df','satin':'url(#satin)','soft':'#f1eff1','outline':'#ffffff','duotone':'url(#duotone)','default':'#ffffff'}[key]
    op='fill-opacity=".28"' if key=='glass' else ''
    stroke='#ffffff' if key in ('glass','aurora') else '#dbc8cf' if key=='outline' else '#e5dfdc'
    s+=rect(x+13,y+85,250,238,fill,22,stroke,op+' filter="url(#shadow)"')
    s+=text(x+33,y+121,'外观设置',18,weight=650)
    s+=rect(x+33,y+140,210,63,'#ffffff',14,'#fff', 'fill-opacity=".18"' if key=='glass' else 'fill-opacity=".55"' if key=='aurora' else 'fill-opacity=".65"')
    s+=text(x+47,y+163,'主题配色',12,'#6d7582')+text(x+47,y+188,'奶霜花园',16,weight=600)
    for j,c in enumerate(('#c14f7c','#179299','#d20f39')):
        s+=f'<circle cx="{x+184+j*17}" cy="{y+184}" r="5" fill="{c}"/>'
    s+=rect(x+33,y+216,210,36,'#fff',10,'#e3d9dd','fill-opacity=".26"' if key=='glass' else 'fill-opacity=".62"')+text(x+47,y+239,'自定义界面',13,'#606b78')
    s+=rect(x+33,y+269,111,34,'#c14f7c',10)+text(x+53,y+291,'应用主题',13,'#fff',600)
    s+=text(x+160,y+291,'浅色模式',12,'#5f6c76')
s+=text(52,1001,'材质层次示意图。真实效果取决于背景、明暗模式与宿主布局；详细参数见设计规范。',15,'#7c828b')+'</svg>'
(OUT/'material-reference.svg').write_text(s,encoding='utf-8')
