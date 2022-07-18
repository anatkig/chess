import BoardContainer from "../board-container/BoardContainer";
import ControlsContainer from "../controls-container/ControlsContainer";
import MovesContainer from "../moves-container/MovesContainer";

const MainContainer = () => {
  return (
    <div className="main-container">
      <ControlsContainer />
      <BoardContainer />
      <MovesContainer />
    </div>
  );
};

export default MainContainer;
