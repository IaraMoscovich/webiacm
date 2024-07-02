import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="welcome-message">¡Bienvenida, María Fernanda!</div>
      <div className="menu-toggle" id="menu-toggle">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
};

export default Header;
