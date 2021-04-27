import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'

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

function DetalhesAluno() {
  const classes = useStyles();
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [sexo, setSexo] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const history = useHistory()
  const { id } = useParams();

  useEffect(() => {
    
    const bancoBusca = async () => {
      await api.get(`/alunos/${id}`, { headers: { personal: localStorage.getItem('personal') } })
        .then(response => {
          setNome(response.data[0]?.nome);
          setTelefone(response.data[0]?.telefone);
          setWhatsapp(response.data[0]?.whatsapp);
          setObjetivo(response.data[0]?.objetivo);
          setObservacoes(response.data[0]?.observacoes);
          setSexo(response.data[0]?.sexo);
          setDataNasc(response.data[0]?.data_nasc);
        })
        .catch(err => {
          console.log(err)
        })
    }
    bancoBusca();

  }, [id])

  function btnVoltar(e) {
    e.preventDefault()
    history.push('/aluno')
  }

  return (
    <div id="page">
      <Header classname="header" />
      <Menu page="0"/>
      <div className="main">
        <div className="boxAlt">
          <h2>Detalhes do aluno</h2>
          <form>
            <TextField disabled id="standard-basic nome" 
              label="Nome" 
              name="nome" 
               
              value={nome}
              onChange={e => setNome(e.target.value)}
              />
            <div className="horizontalBox">
              <TextField disabled id="standard-basic nome" 
                label="Telefone" 
                name="telefone" 
                value={telefone}
              onChange={e => setTelefone(e.target.value)}
                />
              <TextField disabled id="standard-basic nome" 
                label="Whatsapp" 
                name="whatsapp" 
                value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
                />
            </div>
            <div className="horizontalBox">
              <TextField disabled id="standard-basic nome" 
                label="Data nascimento" 
                type="date"
                name="dataNasc" 
                format='DD-MM-YYYY'
                
                InputLabelProps={{
                  shrink: true,
                }}
                value={dataNasc}
              onChange={e => setDataNasc(e.target.value)}
                />
                <FormControl className={classes.FormControl}>
                  <InputLabel disabled id="label-sexo">Sexo</InputLabel>
                  <Select
                    labelId="label-sexo"
                    disabled
                    required
                    value={sexo}
                    onChange={e => setSexo(e.target.value)}
                  >
                    <MenuItem value="F">Feminino</MenuItem>
                    <MenuItem value="M">Masculino</MenuItem>
                  </Select>
                </FormControl>
            </div>
            <TextField disabled id="standard-basic nome" 
              label="Objetivo" 
              name="objetivo" 
              // required 
              value={objetivo}
              onChange={e => setObjetivo(e.target.value)}
              />
            <TextField disabled id="standard-basic nome" 
              label="Observações" 
              name="observacoes" 
              // required 
              value={observacoes}
              onChange={e => setObservacoes(e.target.value)}
              />
            <div className="horizontalBox botoes">
            <button onClick={btnVoltar} className="salvar" >Voltar</button>
                
                
            </div>
          </form>
        </div>
      </div>
      <Footer classname="footer" />
    </div>
  )
}

export default DetalhesAluno