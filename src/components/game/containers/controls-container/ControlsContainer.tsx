import Timer from "../../parts/timer/Timer";

const ControlsContainer = () => {
  return (
    <div className="controls-container">
      <Timer />
      <div className="controls">
        <button className="play-pause-restart">{}</button>
        <button className="restart">{}</button>
        <button className="give-up">{}</button>
      </div>
    </div>
  );
};

export default ControlsContainer;
