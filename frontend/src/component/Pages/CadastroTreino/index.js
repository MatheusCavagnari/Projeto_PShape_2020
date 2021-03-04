import React, {useState} from 'react'

import Header from '../../Header'
import Footer from '../../Footer'

import './styles.css'
import { TextField } from '@material-ui/core'

function CadastroTreino() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [sexo, setSexo] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [observacoes, setObservacoes] = useState('');

  return (
    <div id="page">
      <Header classname="header" />
      <div className="main">
        <div className="box">
          <h2>Cadastro de Treino</h2>
          <form action="">
            <TextField id="standard-basic nome" 
              label="Nome" 
              name="nome" 
              required 
              value={nome}
              onChange={e => setNome(e.target.value)}
              />
            <div className="horizontalBox">
              <TextField id="standard-basic nome" 
                label="Telefone" 
                name="telefone" 
                value={telefone}
              onChange={e => setTelefone(e.target.value)}
                />
              <TextField id="standard-basic nome" 
                label="Whatsapp" 
                name="whatsapp" 
                value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
                />
            </div>
            <div className="horizontalBox">
              <TextField id="standard-basic nome" 
                label="Data nascimento" 
                name="dataNasc" 
                required 
                value={dataNasc}
              onChange={e => setDataNasc(e.target.value)}
                />
              <TextField id="standard-basic nome" 
                label="Sexo" 
                name="sexo" 
                required 
                value={sexo}
              onChange={e => setSexo(e.target.value)}
                />
            </div>
            <TextField id="standard-basic nome" 
              label="Objetivo" 
              name="objetivo" 
              required 
              value={objetivo}
              onChange={e => setObjetivo(e.target.value)}
              />
            <TextField id="standard-basic nome" 
              label="Observações" 
              name="observacoes" 
              required 
              value={observacoes}
              onChange={e => setObservacoes(e.target.value)}
              />
            <div className="horizontalBox buttons">
              <button>Cadastrar</button>
              <button className="cancel">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
      <Footer classname="footer" />
    </div>
  )
}

export default CadastroTreino