import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Container from './components/container/Container';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Provider store={store}>
        <Container />
      </Provider>
    </div>
  );
}

export default App;
