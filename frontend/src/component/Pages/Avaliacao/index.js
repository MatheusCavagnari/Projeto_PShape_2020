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





function Avaliacao() {
    const [db, setdb] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [aluno, setAluno] = useState('');
    const classes = useStyles();
    const history = useHistory();

    function btnGerarRelatorio(e) {
        e.preventDefault();
        history.push("/");
    }

    function selecionaAluno(e) {
        const abc = e.target.id;
        const index = abc.slice(22);
        if(index){
            setAluno(alunos[parseInt(index)].id)
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
        const listaDeAlunos = async () => {
                // console.log(query.get("aluno"))
                await api.get(`/avaliacao?aluno=${aluno}`, { headers: { personal: localStorage.getItem('personal') } })
                    .then(response => {
                        setdb(response.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
        }
        listaDeAlunos()
    }, [aluno])

    useEffect(() => {
        // const listaDeAlunos = async () => {
        //     if(alunoId){
        //         // console.log(query.get("aluno"))
        //         await api.get(`/avaliacao?aluno=${alunoId}`, { headers: { personal: localStorage.getItem('personal') } })
        //             .then(response => {
        //                 setdb(response.data)
        //             })
        //             .catch(err => {
        //                 console.log(err)
        //             })
        //     }
        // }
        const avalAluno = async () => {
            await api.get('/alunos', { headers: { personal: localStorage.getItem('personal') } })
                .then(response => {
                    setAlunos(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }

        avalAluno()
    }, [])

    // useEffect(() => {
    //     const dadosBanco = async () => {
    //         const bancoBusca = await api.get('/alunos', { headers: { personal: localStorage.getItem('personal') } })
    //         const filtrado = bancoBusca.data.filter((linha) => {
    //             return linha.nome.toLowerCase().includes(busca.toLowerCase())
    //         })
    //         setdb(filtrado)
    //     }
    //     dadosBanco()

    // }, [busca])

    

    return (
        <div id="page">
            <Header className="header" />
            <div className="main">
                <Titulo
                    titulo="Avaliação"
                    textoBotao="Gerar Relatório"
                    classBotao="btntitulo"
                    btnClick={btnGerarRelatorio}
                />
                <div className="content">
                    <div className="buscaInput">
                        <Autocomplete
                            id="combo-box-demo"
                            // inputValue={aluno}
                            options={alunos}
                            getOptionLabel={(option) => option.nome}
                            style={{ width: "90%" }}
                            renderInput={(params) => <TextField {...params} label="Aluno" variant="outlined" />}
                            onChange={selecionaAluno}
                        />
                        <button className="btntitulo">Adicionar</button>
                    </div>
                    <div className="tabela">
                        <TableContainer component={Paper} className={classes.container}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="left">Data Avaliação</StyledTableCell>
                                        <StyledTableCell align="center">Ações</StyledTableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {db.map((row) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell align="left">
                                                {row.data_avaliacao}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <button>Detail</button>
                                                <button>Edit</button>
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

export default Avaliacao;