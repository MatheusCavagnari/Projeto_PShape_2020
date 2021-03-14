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

import Header from "../../Header";
import Footer from "../../Footer";
import Titulo from "../../Titulo";
import Lupa from "../../../img/lupa.svg";
import api from '../../../services/api'

import "./styles.css";


// const rows = [
//   createData('Frozen yoghurt', '15/09/2020', 6.0),
//   createData('Ice cream sandwich', '15/09/2020', 9.0),
//   createData('Eclair', '15/09/2020', 16.0),

// ];

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }


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

function Aluno() {
  const [db, setdb] = useState([]);
  const [busca, setBusca] = useState('');
  const classes = useStyles();
  const history = useHistory();

  function btnAdicionarClick(e) {
    e.preventDefault();
    history.push("/cadastroAluno");
  }

  useEffect(() => {
    const listaDeAlunos = async () => {
      await api.get('/alunos', { headers: { personal: localStorage.getItem('personal') } })
        .then(response => {
          setdb(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
    listaDeAlunos()
  }, [])

  useEffect(() => {
    const dadosBanco = async () => {
      const bancoBusca = await api.get('/alunos', { headers: { personal: localStorage.getItem('personal') } })
      const filtrado = bancoBusca.data.filter((linha) => { return linha.nome.toLowerCase().includes(busca.toLowerCase())
      })
      setdb(filtrado)
    }
    dadosBanco()

  }, [busca])


  return (
    <div id="page">
      <Header className="header" />
      <div className="main">
        <Titulo
          titulo="Alunos"
          textoBotao="Adicionar"
          classBotao="btntitulo"
          btnClick={btnAdicionarClick}
        />
        <div className="content">
          <div className="buscaInput">
            <input 
              placeholder="Procurar aluno" 
              id="busca" 
              value={busca} 
              onChange={e => setBusca(e.target.value)} />
            <img src={Lupa} alt="Lupa"></img>
          </div>
          <div className="tabela">
          <TableContainer component={Paper} className={classes.container}>
                      <Table className={classes.table} aria-label="customized table">
                          <TableHead>
                              <TableRow>
                                  <StyledTableCell align="left">Nome</StyledTableCell>
                                  <StyledTableCell align="left">Telefone</StyledTableCell>
                                  <StyledTableCell align="center">Ações</StyledTableCell>

                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {db.map((row) => (
                                  <StyledTableRow key={row.nome}>
                                      <StyledTableCell align="left">
                                          {row.nome}
                                      </StyledTableCell>
                                      <StyledTableCell align="left">{row.telefone}</StyledTableCell>
                                      <StyledTableCell align="center">
                                        <button>trei</button>
                                        <button>aval</button>
                                        <button>relat</button>
                                        <button>edit</button>
                                        <button>del</button>
                                      </StyledTableCell>
                                      
                                  </StyledTableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
          </div>
        </div>
      </div>
      <Footer className="footer"/>
    </div>
  );
}

export default Aluno;
