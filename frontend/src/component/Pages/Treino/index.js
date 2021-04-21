import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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





function Treino() {
  const [db, setdb] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [aluno, setAluno] = useState('');
  const [nomesTreinos, setNomesTreinos] = useState([])
  const [treino, setTreino] = useState('');
  const classes = useStyles();
  const history = useHistory();

  function btnAdicionarTreino(e) {
    e.preventDefault();
    history.push("/cadastroTreino");
  }

  function selecionaAluno(e) {
    const abc = e.target.id;
    const index = abc.slice(22);
    if (index) {
      setAluno(alunos[parseInt(index)].id)
    } else {
      setAluno([])
    }
  }

  function selecionaTreino(e) {
    const abc = e.target.id;
    const index = abc.slice(17);
    if (index) {
      // console.log(nomesTreinos[parseInt(index)].nome)
      setTreino(nomesTreinos[parseInt(index)].nome)
    } else {
      setAluno([])
    }
  }

  // function useQuery() {
  //     return new URLSearchParams(useLocation().search); 
  // }
  // let query = useQuery();
  // let alunoId = query.get("aluno")

  useEffect(() => {
    const listaAlunosETreino = async () => {

      const treinosFiltrados = await api.get(`/treino?aluno=${aluno}&nome=${treino}`, { headers: { personal: localStorage.getItem('personal') } })

      try {
        setdb(treinosFiltrados.data)
      } catch (e) {
        setdb([])
      }
    }
    listaAlunosETreino()
  }, [aluno, treino])

  useEffect(() => {
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


  return (
    <div id="page">
      <Header className="header" />
      <Menu page="2"/>
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
                        {row.data}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <button className="btnAzul">
                          <FontAwesomeIcon icon={faInfoCircle} className="icone" />
                        </button>
                        <button className="btnEdit" onClick={() => editarTreino(row.id)}>
                          <FontAwesomeIcon icon={faEdit} className="icone" />
                        </button>
                        <button className="btnDelete">
                          <FontAwesomeIcon icon={faTrashAlt} className="icone"/>
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

