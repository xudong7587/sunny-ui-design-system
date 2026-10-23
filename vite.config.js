import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig(({mode}) => ({plugins:[react()],build:mode === "library" ? {lib:{entry:{"sunny-ui":"src/index.ts","liquid-glass":"skills/sunny-ui-design/assets/appearance/liquid-glass.ts"},formats:["es"],fileName:(_format,name)=>`${name}.js`,cssFileName:"appearance"},rollupOptions:{external:["react","react/jsx-runtime","react-dom","@phosphor-icons/react"]}} : {outDir:"dist-demo"}}));
