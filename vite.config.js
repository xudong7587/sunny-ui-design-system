import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig(({mode}) => ({plugins:[react()],build:mode === "library" ? {lib:{entry:"src/index.ts",formats:["es"],fileName:"sunny-ui",cssFileName:"appearance"},rollupOptions:{external:["react","react/jsx-runtime","react-dom","@phosphor-icons/react"]}} : {outDir:"dist-demo"}}));
