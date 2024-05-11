import React, { useState, Suspense } from "react";
const Nav = React.lazy(() => import("./Component/Nav.jsx"));
const Header = React.lazy(() => import("./Component/Header.jsx"));
const Card = React.lazy(() => import("./Component/card.jsx"));
const Footer = React.lazy(() => import("./Component/Footer.jsx"));

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App bg-white min-h-screen text-white">
      <Suspense fallback={<div>Loading...</div>}>
        <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
        <Header isOpen={isOpen} />
        <Card />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
