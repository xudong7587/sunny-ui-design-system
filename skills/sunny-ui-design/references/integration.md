# 接入说明

## 复制源码

安装宿主项目依赖 `react`、`@phosphor-icons/react`，复制 `assets/appearance/` 目录。将 CSS 导入放在宿主基础样式之后，并将项目特有适配放在外观样式之后。

```tsx
import { AppearancePicker, configureAppearance, useAppearanceTheme } from "./appearance/AppearancePicker";
import "./appearance/appearance.css";
configureAppearance({ storagePrefix: "my-project" }); // 在 React 挂载前调用一次
function Toolbar() {
  const [theme, setTheme] = useAppearanceTheme();
  return <AppearancePicker theme={theme} onThemeChange={() => setTheme(theme === "light" ? "dark" : "light")} />;
}
```

也可在构建仓库后，用 `pnpm pack` 创建包，安装到其他项目。导入 `@xudong7587/sunny-ui-design-system` 的组件，并显式导入 `@xudong7587/sunny-ui-design-system/styles.css`。包尚未发布到 npm。代码使用 React hooks，SSR 框架中从客户端组件接入；服务端不读取浏览器偏好。

## 表面适配

```tsx
<section className="appearance-surface">
  <article className="appearance-surface-inner">小卡片</article>
  <input className="appearance-control" aria-label="名称" />
</section>
<aside className="appearance-sidebar">导航</aside>
```

已有项目不方便加类时，在单独适配文件中映射到相同变量。不要复制宿主业务 API 或把选项写入后端配置。

样式包含基础 `:root` 和 `body` 材质设置，会影响全站。适合全站外观选择；嵌入第三方页面时需把变量和选择器作用域改成容器，不能直接使用全局版本。

## 偏好与变量

默认存储键为 `sunny-ui-theme`、`sunny-ui-accent`、`sunny-ui-material`。使用 `configureAppearance` 在挂载前配置独立前缀。同源多个产品避免键冲突。迁移 MediaIndex 偏好时可使用前缀 `mi`。

色彩输出为 `--accent-light/dark`、`--secondary-light/dark`、`--tertiary-light/dark`；明暗通过 `data-theme`，配色通过 `data-accent` 与 `data-palette`，质感通过 `data-material`。未知配色回退蓝色，未知材质回退默认；旧 `blocks` 偏好映射为缎光瓷面。

浏览器存储不可用时仍可在当前会话选择，无法承诺刷新保留。跨标签 storage 事件同步选择；组件使用独立 dialog 标题 ID。多个实例同页的同步尚未作为公开合同验证，建议每个应用提供一个主要外观入口。

## 增加预设

配色在 `accents` 中增加一项；多色同时提供浅深主色、辅色与点缀。材质在 `materials` 中增加一项，并在 CSS 中定义外层、内层、控件权重和小预览。更新文案、示例和验收结果，再发布。不要仅为选项换名字而保留几乎一样的视觉。
