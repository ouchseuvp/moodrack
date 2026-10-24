function TitleBar() {
  return (
    <div className="titlebar">
      <div className="window-controls">
        <button
          className="window-btn"
          onClick={() => window.windowControls?.minimize()}
          aria-label="Свернуть"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button
          className="window-btn close-btn"
          onClick={() => window.windowControls?.close()}
          aria-label="Закрыть"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TitleBar;