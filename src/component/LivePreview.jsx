import { useState, useRef, useEffect } from "react";
import { ExternalLink } from "lucide-react";

function LivePreview({ url, title }) {
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [scale, setScale] = useState(0.42);
  const timeoutRef = useRef(null);
  const startedRef = useRef(false);
  const containerRef = useRef(null);

  const handleLoad = () => {
    setLoaded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    timeoutRef.current = setTimeout(() => {
      setBlocked((b) => (loaded ? b : true));
    }, 4000);
  };

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;

      // The iframe's internal base resolution
      const baseWidth = 1440;
      const baseHeight = 900;

      // Calculate scale to fill the container
      // We use a slightly larger scale for width if we want to avoid any gaps,
      // but for a clean fit, Math.max or a specific priority is needed.
      const scaleX = clientWidth / baseWidth;
      const scaleY = clientHeight / baseHeight;

      // Use the larger scale to ensure no black gaps on the right/bottom,
      // or Math.max to cover the entire area.
      setScale(Math.max(scaleX, scaleY));
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    const resizeObserver = new ResizeObserver(() => updateScale());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateScale);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[#0d0d0f] overflow-hidden rounded-xl border border-white/10">
      <div className="relative w-full h-full overflow-hidden bg-[#0d0d0f]">
        {!loaded && !blocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-7 h-7 border-2 border-white/15 border-t-red-500 rounded-full animate-spin" />
          </div>
        )}

        {blocked ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/50 hover:text-white/80 transition-colors"
          >
            <ExternalLink size={22} />
            <span className="text-xs">Preview blocked by site — open live</span>
          </a>
        ) : (
          <iframe
            title={title}
            src={url}
            onLoad={handleLoad}
            ref={() => start()}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            style={{
              width: "1440px",
              height: "900px",
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              border: "none",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default LivePreview;
