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
import { faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

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





function Avaliacao() {
    const [db, setdb] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [aluno, setAluno] = useState('');
    const classes = useStyles();
    const history = useHistory();

    function btnEditarClick(id) {

        history.push(`/editarAvaliacao/${id}`);
    }

    function btnDetalhesClick(id) {
        history.push(`/detalhesAvaliacao/${id}`);
    }

    function btnGerarRelatorio(e) {
        e.preventDefault();
        history.push(`/relatorio/${aluno}`);
    }

    function btnAdicionarClick(e) {
        e.preventDefault();
        history.push("/cadastroAvaliacao");
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
        // console.log(searchPaams, )
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
            <Menu page="1" />
            <div className="main">
                <Titulo
                    titulo="Avaliação"
                    textoBotao="Adicionar"
                    classBotao="btntitulo"
                    btnClick={btnAdicionarClick}
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
                        <button disabled={aluno && db.length !== 0 ? false : true} className='btntitulo' onClick={btnGerarRelatorio}>Gerar Relatório</button>
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
                                                <button className="btnAzul">
                                                    <FontAwesomeIcon onClick={() => btnDetalhesClick(row.id)} icon={faInfoCircle} className="icone" />
                                                </button>
                                                <button className="btnEdit">
                                                    <FontAwesomeIcon onClick={() => btnEditarClick(row.id)} icon={faEdit} className="icone" />
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

export default Avaliacao;