import React from 'react';


import './styles.css';

function Header() {
  const usuario = localStorage.getItem("nomeUsuario")

  return (
    <div className="header">
        <div className="logo">
          <a href="./">
            <h1>Personal</h1>
            <h1>Shape</h1>
          </a>
        </div>
        { usuario !== null &&

          <div className="usuario">
            <button >
              <h2 className="nome">Olá, {usuario}</h2>
              <img src="https://image.flaticon.com/icons/png/512/271/271210.png" alt="seta"/>
            </button>
          </div>
        }
    </div>
  );
}

export default Header;