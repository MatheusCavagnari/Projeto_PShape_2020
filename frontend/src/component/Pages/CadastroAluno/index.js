import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

import Header from '../../Header'
import Footer from '../../Footer'
import Menu from '../../Menu'
import api from '../../../services/api'

import './styles.css'
import  TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function CadastroAluno() {
  const classes = useStyles();
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [sexo, setSexo] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const history = useHistory()

  function btnCancelar(e) {
    e.preventDefault()
    history.push('/aluno')
  }

  async function cadastrarAluno(e) {
    e.preventDefault()
    
    try {
      await api.post('/alunos', {
        nome,
        telefone,
        whatsapp,
        data_nasc: dataNasc,
        sexo,
        objetivo,
        observacoes
      }, {headers: { personal: localStorage.getItem('personal') }})
      alert(`Aluno ${nome} cadastrado com sucesso!`)
      history.push('/aluno')
    } catch (err) {
      alert(`Aconteceu algum erro ${err.response.data}`)
      console.log(err)
    }
  }

  return (
    <div id="page">
      <Header classname="header" />
      <Menu page="0"/>
      <div className="main">
        <div className="boxAlt">
          <h2>Cadastro de aluno</h2>
          <form onSubmit={cadastrarAluno}>
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
                type="date"
                name="dataNasc" 

                required 
                InputLabelProps={{
                  shrink: true,
                }}
                value={dataNasc}
              onChange={e => setDataNasc(e.target.value)}
                />
                <FormControl className={classes.FormControl}>
                  <InputLabel id="label-sexo">Sexo *</InputLabel>
                  <Select
                    labelId="label-sexo"
                    required
                    value={sexo}
                    onChange={e => setSexo(e.target.value)}
                  >
                    <MenuItem value="M">Masculino</MenuItem>
                    <MenuItem value="F">Feminino</MenuItem>
                  </Select>
                </FormControl>
              {/* <TextField id="standard-basic nome" 
                label="Sexo" 
                name="sexo" 
                required 
                value={sexo}
              onChange={e => setSexo(e.target.value)}
                /> */}
            </div>
            <TextField id="standard-basic nome" 
              label="Objetivo" 
              name="objetivo" 
              // required 
              value={objetivo}
              onChange={e => setObjetivo(e.target.value)}
              />
            <TextField id="standard-basic nome" 
              label="Observações" 
              name="observacoes" 
              // required 
              value={observacoes}
              onChange={e => setObservacoes(e.target.value)}
              />
            <div className="horizontalBox botoes">
            <button type="submit" className="salvar" >Cadastrar</button>
                <button onClick={btnCancelar} className="cancel" >Cancelar</button>
            </div>
          </form>
        </div>
      </div>
      <Footer classname="footer" />
    </div>
  )
}

export default CadastroAluno