import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';


import Menu from '../../Menu';
import Footer from '../../Footer';
import Header from '../../Header';
import Titulo from '../../Titulo';
import api from '../../../services/api'

import "./styles.css";
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 1000,

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 700,

  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    container: {
      minHeight: 440,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function DetalhesTreino() {
  const { id } = useParams();
  const [nomeTreino, setNomeTreino] = useState('')
  const [nomeAluno, setNomeAluno] = useState('')
  const [idAluno, setIdAluno] = useState('')
  const [exercicios, setExercicios] = useState([])
  const [detalhes, setDetalhes] = useState('')

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const buscaDadosTreino = async () => {
      await api.get(`/treino/${id}`).then((response) =>{
        if(response.data.nome) {
          setNomeTreino(response.data.nome)

        }
        setIdAluno(response.data.aluno_id)
        console.log(response.data.aluno_id)
        setExercicios(response.data.exercicios)
        
      })
    }
    buscaDadosTreino()
    
  }, [])

  useEffect(() => {
    const buscaAluno = async () => {
      if(idAluno) {
        await api.get(`/alunos/${idAluno}`, { headers: { personal: localStorage.getItem('personal') } }).then((response) =>{
          setNomeAluno(response.data[0].nome)
        })
      }
    }
    buscaAluno()
  }, [idAluno])

  function btnVoltar() {
    history.push('/treino')
  }
  

  const titulo = `Detalhes Treino ${nomeTreino} - ${nomeAluno}`
  return (
    <div id="page">
      <Header className="header" />
      <Menu page="2"/>
      <div className="main">
        <Titulo
          titulo={titulo}
          textoBotao="Voltar"
          classBotao="btntitulo"
          btnClick={btnVoltar}
        />
        <div className="tabela">
            <TableContainer component={Paper} className={classes.container}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Nome</StyledTableCell>
                    <StyledTableCell align="left">Data início</StyledTableCell>
                    <StyledTableCell align="center">Ações</StyledTableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {exercicios.map((row) => ( */}
                    <StyledTableRow >
                      <StyledTableCell align="left">
                        {/* {row.nome} */}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {/* {row.data} */}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {/* <button className="btnAzul" onClick={() => detalheTreino(row.id)}>
                          <FontAwesomeIcon icon={faInfoCircle}  className="icone" />
                        </button>
                        <button className="btnEdit" onClick={() => editarTreino(row.id)}>
                          <FontAwesomeIcon icon={faEdit} className="icone" />
                        </button>
                        <button className="btnDelete" onClick={() => deletarTreino(row.id, row.aluno_id)}>
                          <FontAwesomeIcon icon={faTrashAlt} className="icone"/>
                        </button> */}
                      </StyledTableCell>

                    </StyledTableRow>
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
      </div>
      <Footer/>
    </div>
  )
}

export default DetalhesTreino;