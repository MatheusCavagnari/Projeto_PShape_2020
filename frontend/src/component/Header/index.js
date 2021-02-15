import React, {  useState } from 'react';
import {useHistory} from 'react-router-dom'


import './styles.css';

function Header() {
  // const [usuario, setUsuario] = useState(localStorage.getItem('nomeUsuario'))
  const [toggleOptions, setToggleOptions] = useState(false)
  const history = useHistory()

  // useEffect(() => {
  //   if(localStorage.getItem('nomeUsuario') === null ){
  //     setUsuario(true)
  //   } else {
  //     setUsuario(false)
  //   } 
  // }, [usuario])

  function logOut(e) {
    e.preventDefault()
    localStorage.setItem('personal', '')
    localStorage.setItem('nomeUsuario', '')
    // setUsuario(false)
    history.push('/login')
  }

  function options(e) {
    e.preventDefault()
    setToggleOptions(!toggleOptions)
  }

  return (
    <div className="header">
        <div className="logo">
          <a href="./">
            <h1>Personal</h1>
            <h1>Shape</h1>
          </a>
        </div>
        { localStorage.getItem('nomeUsuario') !== '' &&
          
            <div className="usuario">   
            <button onClick={options} >
              <h2 className="nome">Olá, {localStorage.getItem('nomeUsuario')}</h2>
              <img src="https://image.flaticon.com/icons/png/512/271/271210.png" alt="seta"/>
            </button>
          </div>
           
       }
        { toggleOptions !== false &&
          <div className="opcoes">
            <div className="opcao">
              <a href="/">Alterar Usuário</a>
            </div>
            <div className="opcao" onClick={logOut}>
              <a href="/login" >Sair</a>
            </div>
          </div>
        }
    </div>
  );
}

export default Header;