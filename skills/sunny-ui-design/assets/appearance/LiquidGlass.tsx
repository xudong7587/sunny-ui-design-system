import { useEffect, useRef, type HTMLAttributes } from "react";
import { enhanceLiquidGlass, type GlassOptions } from "./liquid-glass";
export { enhanceLiquidGlass, installLiquidGlass, glassRenderer, type GlassOptions, type GlassVariant, type GlassRenderer } from "./liquid-glass";

export function useLiquidGlass<T extends HTMLElement = HTMLDivElement>({ variant = "glass", renderer = "auto", radius }: GlassOptions = {}) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (ref.current) return enhanceLiquidGlass(ref.current, { variant, renderer, radius });
  }, [variant, renderer, radius]);
  return ref;
}

export interface LiquidGlassProps extends HTMLAttributes<HTMLDivElement>, GlassOptions {}
/** Background optics only. Children remain ordinary, accessible HTML with undistorted text/icons. */
export function LiquidGlass({ children, className = "", variant = "glass", renderer = "auto", radius, style, ...props }: LiquidGlassProps) {
  const ref = useLiquidGlass<HTMLDivElement>({ variant, renderer, radius });
  return <div {...props} ref={ref} className={`sunny-glass ${className}`} style={{ ...(radius === undefined ? {} : { borderRadius: radius }), ...style }}>{children}</div>;
}
