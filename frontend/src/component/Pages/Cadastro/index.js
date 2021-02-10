import { TextField } from '@material-ui/core'
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

import './styles.css'

import Header from '../../Header'
import Footer from '../../Footer/Footer'
import api from '../../../services/api'

export default function Login() {
  const [ email, setEmail ] = useState('')
  const [ senha, setSenha ] = useState('')
  const [ nome, setNome ] = useState('')
  const [ confirmarSenha, setconfirmarSenha ] = useState('')

  const history = useHistory()

  async function btnCriarPersonal(e) {
    e.preventDefault()

    try{
      const response = await api.post('/personal', {
        nome, 
        email,
        senha,
        confirmarSenha
      })

      alert(`Usuário ${response.data.nome} cadastrado com sucesso!`)
      // console.log(response.data)
      history.push('/login')
    } catch (err) {
      alert('Aconteceu algum erro')
    }
  }

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
          <form onSubmit={btnCriarPersonal}>
            <TextField id="standard-basic nome" 
              label="Nome" 
              name="nome" 
              required 
              value={nome}
              onChange={e => setNome(e.target.value)} />
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
            <TextField id="standard-basic confirmarSenha" 
              label="Confirmar senha" 
              type="password" 
              name="confitmarSenha" 
              required 
              value={confirmarSenha}
              onChange={e => setconfirmarSenha(e.target.value)} />
            <button type="submit" >Cadastrar</button>
          </form>
        </div>
        <div className="botoes">
          <a href="./login">Já tem cadastro? Entre aqui</a>
        </div>
      </div>
    </div>
    
    <Footer className="footer"/>
    </div>
  )
}