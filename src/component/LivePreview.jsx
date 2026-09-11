import { useState, useRef, useEffect } from "react";
import { ExternalLink } from "lucide-react";

function LivePreview({ url, title }) {
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [scale, setScale] = useState(0.42);
  const [isMobile, setIsMobile] = useState(false);
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

      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (mobile) {
        setScale(1);
        return;
      }

      const baseWidth = 1440;
      const baseHeight = 900;
      const scaleX = clientWidth / baseWidth;
      const scaleY = clientHeight / baseHeight;

      setScale(Math.min(scaleX, scaleY));
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
    <div ref={containerRef} className="relative w-full h-full bg-[#0d0d0f] overflow-hidden rounded-xl border border-white/10 flex flex-col">
      <div className="relative w-full h-full overflow-hidden bg-[#0d0d0f] flex-1">
        {!loaded && !blocked && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
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
              width: isMobile ? "100%" : "1440px",
              height: isMobile ? "100%" : "900px",
              transform: isMobile ? "none" : `scale(${scale})`,
              transformOrigin: "top left",
              border: "none",
              pointerEvents: "none",
              display: "block",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default LivePreview;
