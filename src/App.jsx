import React, {useState} from 'react';
import Nav from './Component/Nav.jsx';
import Header from './Component/Header.jsx';
import Card from './Component/card.jsx';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App bg-black min-h-screen text-white">
      <Nav isOpen={isOpen} setIsOpen={setIsOpen}/>
      <Header isOpen={isOpen}/>
      <Card />
    </div>
  );
}

export default App;
