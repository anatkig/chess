import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/common/header/Header";
import MainContainer from "./components/game/main-container/MainContainer";

function App() {
  return (
    <div className="App ">
      <Header />
      <Provider store={store}>
        <MainContainer />
      </Provider>
    </div>
  );
}

export default App;
