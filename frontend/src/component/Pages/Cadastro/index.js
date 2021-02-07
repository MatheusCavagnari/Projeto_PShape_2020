import { TextField } from '@material-ui/core'
import React from 'react'

import './styles.css'

import Header from '../../Header'
import Footer from '../../Footer/Footer'

export default function Login() {
  return (
    <div id="page">
    <Header className="header"/> 
    <div className="container">
      <div className="login">
        <div className="titulo">
          <h1>Cadastre-se</h1>
          <div className="linha"></div>
        </div>
        <div className="dados">
          <form action="submit">
            <TextField id="standard-basic" label="Nome" />
            <TextField id="standard-basic" label="E-mail" />
            <TextField id="standard-basic" label="Senha" type="password" />
            <TextField id="standard-basic" label="Confirmar senha" type="password" />
          </form>
        </div>
        <div className="botoes">
          <button>Cadastrar</button>
          <a href="./">Já tem cadastro? Entre aqui</a>
        </div>
      </div>
    </div>
    
    <Footer className="footer"/>
    </div>
  )
}