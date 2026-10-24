import { useState, useEffect } from "react";
import "./App.css";
import TitleBar from "./TitleBar";
import Sidebar from "./Sidebar";
import MainPanel from "./MainPanel";
import PlayerBar from "./PlayerBar";

function loadNumber(key, fallback) {
  try {
    const value = Number(localStorage.getItem(key));
    return value > 0 ? value : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(() => loadNumber("sidebarWidth", 250));
  const [playerHeight, setPlayerHeight] = useState(() => loadNumber("playerHeight", 80));
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingPlayer, setIsResizingPlayer] = useState(false);
  const [startOffset, setStartOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    try {
      localStorage.setItem("sidebarWidth", String(sidebarWidth));
      localStorage.setItem("playerHeight", String(playerHeight));
    } catch {
      return;
    }
  }, [sidebarWidth, playerHeight]);

  useEffect(() => {
    if (!isResizingSidebar && !isResizingPlayer) return;

    let frame = 0;
    document.body.classList.add("resizing-active");

    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (isResizingSidebar) {
          const width = e.clientX - startOffset.x;
          if (width > 150 && width < 600) setSidebarWidth(width);
        }
        if (isResizingPlayer) {
          const height = window.innerHeight - e.clientY - startOffset.y;
          if (height > 60 && height < 400) setPlayerHeight(height);
        }
      });
    };

    const onStop = () => {
      setIsResizingSidebar(false);
      setIsResizingPlayer(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onStop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onStop);
      document.body.classList.remove("resizing-active");
    };
  }, [isResizingSidebar, isResizingPlayer, startOffset]);

  const containerStyle = {
    "--sidebar-width": `${sidebarWidth}px`,
    "--player-height": `${playerHeight}px`,
  };

  return (
    <div className="app-wrapper" style={containerStyle}>
      <TitleBar />

      <div className="app-container">
        <Sidebar />
        <MainPanel />
        <PlayerBar />

        <div
          className="resizer-v"
          onMouseDown={(e) => {
            setStartOffset({ x: e.clientX - sidebarWidth, y: 0 });
            setIsResizingSidebar(true);
          }}
        />
        <div
          className="resizer-h"
          onMouseDown={(e) => {
            setStartOffset({
              x: 0,
              y: window.innerHeight - e.clientY - playerHeight,
            });
            setIsResizingPlayer(true);
          }}
        />
        <div
          className="resizer-corner"
          onMouseDown={(e) => {
            setStartOffset({
              x: e.clientX - sidebarWidth,
              y: window.innerHeight - e.clientY - playerHeight,
            });
            setIsResizingSidebar(true);
            setIsResizingPlayer(true);
          }}
        />
      </div>
    </div>
  );
}

export default App;