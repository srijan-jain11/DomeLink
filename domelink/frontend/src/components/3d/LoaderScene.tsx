import { Suspense, lazy, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const LoaderScene3D = lazy(() => import("@/components/3d/LoaderScene3D"));

const SpinnerFallback = () => (
  <div className="flex flex-col items-center gap-3 text-foreground/80">
    <div className="h-10 w-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
    <span className="text-sm tracking-wide">Loading DomeLink...</span>
  </div>
);

const LoaderScene = () => {
  const isMobile = useIsMobile();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    const handler = () => setReduceMotion(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const shouldUseFallback = isMobile || reduceMotion;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {shouldUseFallback ? (
        <SpinnerFallback />
      ) : (
        <div className="flex flex-col items-center gap-3">
          <Suspense fallback={<SpinnerFallback />}>
            <LoaderScene3D />
          </Suspense>
          <span className="text-sm tracking-wide text-foreground/80 animate-pulse">Loading DomeLink...</span>
        </div>
      )}
    </div>
  );
};

export default LoaderScene;
