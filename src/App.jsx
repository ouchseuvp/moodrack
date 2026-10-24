import { useState, useRef } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import "./App.css";
import TitleBar from "./TitleBar";

function App() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  function toggle() {
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  }

  return (
    <div className="player">
      <TitleBar />
    </div>
  );
}

export default App;