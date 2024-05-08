import React, {useState} from 'react';
import Nav from './Component/Nav.jsx';
import Header from './Component/Header.jsx';
import Card from './Component/card.jsx';
import Footer from './Component/Footer.jsx';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App bg-white min-h-screen text-white">
      <Nav isOpen={isOpen} setIsOpen={setIsOpen}/>
      <Header isOpen={isOpen}/>
      <Card />
      <Footer />
    </div>
  );
}

export default App;
