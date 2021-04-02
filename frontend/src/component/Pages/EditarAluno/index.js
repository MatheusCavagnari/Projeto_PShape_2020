import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom'; 
import swal from 'sweetalert2'

import Header from '../../Header'
import Footer from '../../Footer'
import Menu from '../../Menu'

import './styles.css'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import api from '../../../services/api'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function EditarAluno() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [sexo, setSexo] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const classes = useStyles()
  const history = useHistory();
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

  async function btnEditarAluno(e) {
    e.preventDefault()

    try {
      api.put(`/alunos/${id}`, {
        nome,
        telefone,
        whatsapp,
        data_nasc: dataNasc,
        sexo,
        objetivo,
        observacoes
      }, { headers: { personal: localStorage.getItem('personal') } })



      swal.fire(
        'Alterado!',
        'Aluno alterado com sucesso.',
        'success'
      ).then(async (result) => {
        if (result.isConfirmed) {
          history.push('/aluno')
        }
      })


    } catch (err) {
      alert(`Aconteceu algum erro ${err.response.data}`)
      console.log(err)
    }

  }


  function btnCancelar(e) {
    e.preventDefault()
    history.push('/aluno')
  }


  return (
    <div id="page">
      <Header classname="header" />
      <Menu page="0" />
      <div className="main">
        <div className="boxAlt">
          <h2>Editar Aluno</h2>
          <form onSubmit={btnEditarAluno}>
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
              <button type="submit" className="salvar" >Salvar</button>
              <button onClick={btnCancelar} className="cancel" >Cancelar</button>
            </div>
          </form>

        </div>
      </div>
      <Footer classname="footer" />
    </div>
  )
}

export default EditarAluno