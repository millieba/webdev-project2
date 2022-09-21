import React from 'react';
import Connect from './api/api';
import './App.css';
import SendLink from './components/SendLink';

function App() {
  return (
    <div className="App">
    <SendLink />
    <Connect />
    </div>
  );
}

export default App;
