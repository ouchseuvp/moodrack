import { FaMinus, FaXmark } from "react-icons/fa6";

function TitleBar() {
  return (
    <div className="titlebar">
      <div className="titlebar__buttons">
        <button
          className="titlebar__btn"
          onClick={() => window.windowControls?.minimize()}
          aria-label="Свернуть"
        >
          <FaMinus />
        </button>
        <button
          className="titlebar__btn titlebar__btn--close"
          onClick={() => window.windowControls?.close()}
          aria-label="Закрыть"
        >
          <FaXmark />
        </button>
      </div>
    </div>
  );
}

export default TitleBar;