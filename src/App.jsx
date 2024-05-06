import React from 'react';
import Nav from './Component/Nav.jsx';
import Header from './Component/Header.jsx';
import Card from './Component/card.jsx';

function App() {
  return (
    <div className="App bg-black min-h-screen text-white">
      <Nav />
      <Header />
      <Card />
    </div>
  );
}

export default App;
