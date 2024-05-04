import React from 'react';
import Nav from './Component/Nav.jsx';
import Header from './Component/Header.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="bg-black text-white h-screen">
        <Nav />
        <Header />
      </div>
    </div>
  );
}

export default App;
