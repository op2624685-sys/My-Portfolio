import { useState, useRef } from "react";
import { ExternalLink } from "lucide-react";

function LivePreview({ url, title }) {
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const timeoutRef = useRef(null);
  const startedRef = useRef(false);

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

  return (
    <div className="relative w-full h-full bg-[#0d0d0f] overflow-hidden rounded-xl border border-white/10">
      {/* fake browser chrome, echoes a real browser window */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#141416] border-b border-white/10 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <div className="ml-2 flex-1 truncate text-[11px] text-white/40 bg-black/30 rounded px-2 py-0.5">
          {url.replace(/^https?:\/\//, "")}
        </div>
      </div>

      <div className="relative w-full h-[calc(100%-32px)] overflow-hidden bg-[#0d0d0f]">
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
              transform: "scale(0.42)",
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
