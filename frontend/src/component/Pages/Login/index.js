import { TextField } from '@material-ui/core'
import React, {useState} from 'react'
import api from '../../../services/api'
import {useHistory} from 'react-router-dom'

import './styles.css'

import Header from '../../Header'
import Footer from '../../Footer/Footer'

export default function Login() {
  const [ email, setEmail ] = useState('')
  const [ senha, setSenha ] = useState('')

  const history = useHistory()

  async function btnLoginClick(e) {
    e.preventDefault()
    try{
      const response = await api.post('/personal/login', {
        email,
        senha
      })

      localStorage.setItem('personal', response.data.id)
      localStorage.setItem('nomeUsuario', response.data.nome)

      history.push('/')

      alert(`usuario ${response.data.nome} entrou`)
    }catch (err) {
      alert(`${err.response.data}`)
    }
  }

  return (
    <div id="page">
    <Header className="header"/> 
    <div className="container">
      <div className="login">
        <div className="titulo">
          <h1>Entrar</h1>
          <div className="linha"></div>
        </div>
        <div className="dados">
          <form onSubmit={btnLoginClick} >
            <TextField id="standard-basic email" 
              label="E-mail" 
              name="email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)} />
            <TextField id="standard-basic senha"
              label="Senha"
              type="password" 
              name="senha" 
              required 
              value={senha}
              onChange={e => setSenha(e.target.value)} />

            <button type="submit">Entrar</button>
          </form>

        </div>
        <div className="botoes">
          
          <a href="./cadastro">Não tem cadastro? Entre aqui</a>
          <a href="./">Esqueci minha senha</a>
        </div>
      </div>
    </div>
    <Footer className="footer"/>
    </div>
  )
}