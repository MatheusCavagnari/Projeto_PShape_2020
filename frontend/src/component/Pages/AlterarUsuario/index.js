import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import './styles.css'

import Header from '../../Header'
import Footer from '../../Footer'

import { TextField } from '@material-ui/core'
import api from '../../../services/api'

function AlterarUsuario() {
  const [ senha, setSenha ] = useState('')
  const [ novaSenha, setNovaSenha ] = useState('')
  const [ nome, setNome ] = useState(localStorage.getItem('nomeUsuario'))
  const [ confirmarNovaSenha, setconfirmarNovaSenha ] = useState('')

  const history = useHistory()

  function cancelar(e) {
    e.preventDefault()
    history.push('/')
  }

  async function btnAlterarUsuario(e) {
    e.preventDefault()

    try{
      await api.put(`/personal/${localStorage.getItem('personal')}`, {
        nome, 
        senhaAntiga: senha,
        novaSenha,
        confirmarNovaSenha
      })

      localStorage.setItem('nomeUsuario', nome)

      alert(`Usuário ${nome} alterado com sucesso!`)
  //     // console.log(response.data)
        history.push('/')
    } catch (err) {
      alert(`Aconteceu algum erro ${err.response.data}`)
      console.log(err)
    }
  }

  return (
    <div id="pageAlt">
      <Header className="header"/>  
      <div className="container">
        <div className="boxAlt">
        <div className="titulo">
          <h1>Alterar meus dados</h1>
          <div className="linha"></div>
        </div>
        <div className="dados">
          <form onSubmit={btnAlterarUsuario}>
            <TextField id="standard-basic nome" 
              label="Nome" 
              name="nome" 
              required 
              value={nome}
              onChange={e => setNome(e.target.value)} />
            <TextField id="standard-basic senha"
              label="Senha Antiga" 
              name="senha"
              type="password" 
              // required 
              value={senha}
              onChange={e => setSenha(e.target.value)} />
            <TextField id="standard-basic novaSenha" 
              label="Nova senha" 
              type="password"
              name="novaSenha" 
              // required 
              value={novaSenha}
              onChange={e => setNovaSenha(e.target.value)} />
            <TextField id="standard-basic confirmarNovaSenha" 
              label="Confirmar nova senha" 
              type="password" 
              name="confitmarNovaSenha" 
              // required 
              value={confirmarNovaSenha}
              onChange={e => setconfirmarNovaSenha(e.target.value)} />
              <div className="botaos">
                <button type="submit" className="salvar" >Salvar</button>
                <button onClick={cancelar} className="cancel" >Cancelar</button>
              </div>
          </form>
        </div>
        </div>
      </div>
      <Footer className="footer"/>
    </div>
  )
}

export default AlterarUsuario