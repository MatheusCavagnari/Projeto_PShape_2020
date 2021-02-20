import { ClickAwayListener } from '@material-ui/core';
import React, {  useState } from 'react';
import {useHistory} from 'react-router-dom'


import './styles.css';

function Header() {
  const [toggleOptions, setToggleOptions] = useState(false)
  const history = useHistory()
  const anchorRef = React.useRef(null);
  

  function logOut(e) {
    e.preventDefault()
    localStorage.setItem('personal', '')
    localStorage.setItem('nomeUsuario', '')
    // setUsuario(false)
    history.push('/login')
  }

  function alterar(e) {
    e.preventDefault()
    history.push('/alterar_usuario')
  }

  function options(e) {
    e.preventDefault()
    setToggleOptions((toggleOptions) => !toggleOptions)
  }
  
  
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setToggleOptions(false);
  };

  return (
    <div className="header">
        <div className="logo">
          <a href="./">
            <h1>Personal</h1>
            <h1>Shape</h1>
          </a>
        </div>
        { localStorage.getItem('nomeUsuario') !== '' &&
          <ClickAwayListener onClickAway={handleClose}>
            <div className="usuario">   
            <button onClick={options} >
              <h2 className="nome">Olá, {localStorage.getItem('nomeUsuario')}</h2>
              <img src="https://image.flaticon.com/icons/png/512/271/271210.png" alt="seta"/>
            </button>
          { toggleOptions ? (
            <div className="opcoes">
              <div className="opcao" onClick={alterar} >
                <h4>Alterar Usuário</h4>
              </div>
              <div className="opcao" onClick={logOut}>
                <h4>Sair</h4>
              </div>
            </div>) : null
          }
          </div>
          </ClickAwayListener>
       }
    </div>
  );
}

export default Header;