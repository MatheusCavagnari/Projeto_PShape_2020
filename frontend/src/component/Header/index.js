import React from 'react';


import './styles.css';

function Header() {
  return (
    <div className="header">
        <div className="logo">
          <a href="./">
            <h1>Personal</h1>
            <h1>Shape</h1>
          </a>
        </div>
        <div className="usuario">
          <button >
            <h2 className="nome">Olá, Fulano</h2>
            <img src="https://image.flaticon.com/icons/png/512/271/271210.png" alt="seta"/>
          </button>
        </div>
    </div>
  );
}

export default Header;