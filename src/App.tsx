import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/common/header/Header';
import Container from './components/game/container/Container';


function App() {
  return (
    <div className="App bg-red-600">
      <Header />
      <Provider store={store}>
        <Container />
      </Provider>
    </div>
  );
}

export default App;
