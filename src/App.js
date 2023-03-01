import React from 'react';
import './App.css';
import Home from './pages/Home';
import Provider from './context/starWarsProvider';

function App() {
  return (
    <div>
      <Provider>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
