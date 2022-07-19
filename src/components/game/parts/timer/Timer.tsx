import { useState } from "react";
import King from "../../../pieces/King";

const Timer = () => {
  const [whiteClock, setWhiteClock] = useState(60);
  const [blackClock, setBlackClock] = useState(60);

  return (
    <div className="timer flex justify-between relative top-[50%] translate-y-[-50%] mx-auto">
      <div className="white">
        <div className="img">
          <King color="white" />
        </div>
        <div className="clock w-[100px]">{whiteClock}</div>
      </div>
      <div className="black">
        <div className="img">
          <King color="black" />
        </div>
        <div className="clock w-[100px]">{blackClock}</div>
      </div>
    </div>
  );
};

export default Timer;
