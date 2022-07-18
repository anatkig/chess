import { useState } from "react";

const Timer = () => {
  const [whiteClock, setWhiteClock] = useState(60);
  const [blackClock, setBlackClock] = useState(60);

  return (
    <div className="timer flex justify-between relative top-[50%] translate-y-[-50%]">
      <div className="white">
        <div className="img"></div>
        <div className="clock w=[100px]">{whiteClock}</div>
      </div>
      <div className="black">
        <div className="img"></div>
        <div className="clock w-[100px]">{blackClock}</div>
      </div>
    </div>
  );
};

export default Timer;
