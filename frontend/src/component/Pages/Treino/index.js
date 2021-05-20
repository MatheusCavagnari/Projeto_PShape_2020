import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert2'

import Menu from "../../Menu";
import Header from "../../Header";
import Footer from "../../Footer";
import Titulo from "../../Titulo";
import api from '../../../services/api'

import "./styles.css";


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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}



function Treino() {
  const [db, setdb] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [alunoId, setAlunoId] = useState({});
  const [nomesTreinos, setNomesTreinos] = useState([])
  const [treino, setTreino] = useState('');
  const classes = useStyles();
  const history = useHistory();

  const aluno = useQuery().get('aluno');

  function btnAdicionarTreino(e) {
    e.preventDefault();
    history.push("/cadastroTreino");
  }

  function selecionaAluno(e) {
    const abc = e.target.id;
    const index = abc.slice(22);
    if (index) {
      setAlunoId(alunos[parseInt(index)])
    } else {
      setAlunoId([])
    }
  }


  function dataFormatada(data) {
    var dataFormatada = data.split("-");
    return (dataFormatada[2] + "/" + dataFormatada[1] + "/" + dataFormatada[0])
  }

  function selecionaTreino(e) {
    const abc = e.target.id;
    const index = abc.slice(17);
    if (index) {
      // console.log(nomesTreinos[parseInt(index)].nome)
      setTreino(nomesTreinos[parseInt(index)].nome)
    } else {
      setTreino([])
    }
  }

  // function useQuery() {
  //     return new URLSearchParams(useLocation().search); 
  // }
  // let query = useQuery();
  // let alunoId = query.get("aluno")

  useEffect(() => {
    const listaAlunosETreino = async () => {
      if (alunoId) {
        const treinosFiltrados = await api.get(`/treino?aluno=${alunoId.id}&nome=${treino}`, { headers: { personal: localStorage.getItem('personal') } })

        try {
          setdb(treinosFiltrados.data)
        } catch (e) {
          setdb([])
        }
      } else {
        const treinosFiltrados = await api.get(`/treino?aluno&nome`, { headers: { personal: localStorage.getItem('personal') } })

        try {
          setdb(treinosFiltrados.data)
        } catch (e) {
          setdb([])
        }
      }
    }
    listaAlunosETreino()
  }, [alunoId, treino])

  useEffect(() => {
    if (aluno) {
      const alunoQuery = async () => {
        await api.get(`/alunos/${aluno}`, { headers: { personal: localStorage.getItem('personal') } })
          .then(response => {
            setAlunoId(response.data[0])
            console.log(response.data[0])
          })
          .catch(err => {
            console.log(err)
          })
      }
      alunoQuery()
    }

    const ListAlunos = async () => {
      await api.get('/alunos', { headers: { personal: localStorage.getItem('personal') } })
        .then(response => {
          setAlunos(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
    const ListTreinos = async () => {
      await api.get('/treino', { headers: { personal: localStorage.getItem('personal') } })
        .then(response => {
          setNomesTreinos(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    }

    ListAlunos()
    ListTreinos()
  }, [])

  function editarTreino(id) {
    history.push(`/editarTreino/${id}`)
  }
  function detalheTreino(id) {
    history.push(`/detalhesTreino/${id}`)
  }

  async function deletarTreino(id, alunoId) {
    swal.fire({
      title: 'Você tem certeza?',
      text: "Você não pode reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (alunoId) {
          await api.delete(`/treino/${id}?aluno=${alunoId}`)
          swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else {
          await api.delete(`/treino/${id}`)
          swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
        await api.get('/treino', { headers: { personal: localStorage.getItem('personal') } })
          .then(response => {
            setdb(response.data)
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
  }


  return (
    <div id="page">
      <Header className="header" />
      <Menu page="3" />
      <div className="main">
        <Titulo
          titulo="Treino"
          textoBotao="Adicionar"
          classBotao="btntitulo"
          btnClick={btnAdicionarTreino}
        />
        <div className="content">
          <div className="buscaInput">
            <Autocomplete
              id="combo-box-demo"
              options={alunos}
              getOptionLabel={(option) => option.nome}
              style={{ width: "90%" }}
              renderInput={(params) => <TextField {...params} label="Aluno" variant="outlined" />}
              onChange={selecionaAluno}
              value={alunoId}
            />
            <Autocomplete
              id="combo-box"
              options={nomesTreinos}
              getOptionLabel={(option) => option.nome}
              style={{ width: "90%" }}
              renderInput={(params) => <TextField {...params} label="Nome" variant="outlined" />}
              onChange={selecionaTreino}
            />
          </div>
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
                  {db.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell align="left">
                        {row.nome}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {dataFormatada(row.data)}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <button className="btnAzul" onClick={() => detalheTreino(row.id)}>
                          <FontAwesomeIcon icon={faInfoCircle} className="icone" />
                        </button>
                        <button className="btnEdit" onClick={() => editarTreino(row.id)}>
                          <FontAwesomeIcon icon={faEdit} className="icone" />
                        </button>
                        <button className="btnDelete" onClick={() => deletarTreino(row.id, row.aluno_id)}>
                          <FontAwesomeIcon icon={faTrashAlt} className="icone" />
                        </button>
                      </StyledTableCell>

                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default Treino;

