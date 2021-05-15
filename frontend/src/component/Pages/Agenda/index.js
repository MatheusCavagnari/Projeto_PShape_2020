import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete';
import swal from 'sweetalert2'

import Menu from '../../Menu'
import Header from '../../Header'
import Footer from '../../Footer'
import Titulo from '../../Titulo'
import api from '../../../services/api'

import './styles.css'



const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function Agenda() {

  const [openModal, setOpenModal] = React.useState(false);

  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const [agendamentos, setAgendamentos] = useState([]);
  const [horaAgendamento, sethoraAgendamento] = useState([]);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [data, setData] = useState({})
  const [alunos, setAlunos] = useState([]);
  const [aluno, setAluno] = useState({})
  const [tipo, setTipo] = useState("")
  const [observacoes, setObservacoes] = useState("")
  const [horario, setHoaraio] = useState("")
  const [observacoesEdit, setObservacoesEdit] = useState("")
  const [horarioEdit, setHoaraioEdit] = useState("")
  const [alunoId, setAlunoId] = useState("")


  const tipos = [{
    title: "Avaliação",
    value: "A"
  }, {
    title: "Treino",
    value: "T"
  }]

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleCloseEdit = () => {
    setOpenModalEdit(false);
  };

  function selecionaAluno(e) {
    const abc = e.target.id;
    const index = abc.slice(22);
    if (index) {
      setAluno(alunos[parseInt(index)])
    } else {
      setAluno([])
    }
  }

  function selecionaTipo(e) {
    const abc = e.target.id;
    const index = abc.slice(23);
    if (index) {
      setTipo(tipos[parseInt(index)].value)
    } else {
      setAluno([])
    }
  }

  let body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="modalBox">
        <div className="tituloBox">
          <h2>Cadastro de Agendamento</h2>
          <h2 id="simple-modal-title">{data.dataFormat}</h2>
        </div>
        <Autocomplete
          id="combo-box-demo"
          options={alunos}
          getOptionLabel={(option) => option.nome}
          getOptionSelected={(option, value) => option.id === value.id}
          style={{ width: "100%" }}
          noOptionsText="Sem opções"
          renderInput={(params) => <TextField {...params} label="Aluno" />}
          onChange={selecionaAluno}
        />
        <Autocomplete
          id="combo-box-demo-"
          options={tipos}
          getOptionLabel={(option) => option.title}
          getOptionSelected={(option, value) => option.value === value.value}
          style={{ width: "100%" }}
          renderInput={(params) => <TextField {...params} label="Tipo agendamento" />}
          onChange={selecionaTipo}
        />
        <div className="horzBox">
          <label htmlFor="horarioAgned">Horário</label>
          <TextField id="horarioAgned" type="time" onChange={e => setHoaraio(e.target.value)}></TextField>
        </div>
        <TextField
          multiline
          variant="outlined"
          placeholder="Observações"
          className="txtArea"
          onChange={e => setObservacoes(e.target.value)}
        />
        <div className="horzBox">
          <button className="button" onClick={cadastroAgendamento}>Cadastrar</button>
          <button className="btnCancelar" onClick={handleClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );

  var tipoEdit;

  let edit = (
    <div style={modalStyle} className={classes.paper}>
      <div className="modalBox">
        <div className="tituloBox">
          <h2>Editar Agendamento</h2>
          <h2 id="simple-modal-title">{data}</h2>
        </div>
        <Autocomplete
          id="combo-box-demo"
          options={alunos}
          getOptionLabel={(option) => option.nome}
          getOptionSelected={(option, value) => option.id === value.id}
          style={{ width: "100%" }}
          noOptionsText="Sem opções"
          value={alunoId}
          renderInput={(params) => <TextField {...params} label="Aluno" />}
          onChange={selecionaAluno}
        />
        <Autocomplete
          id="combo-box-demo-"
          options={tipos}
          getOptionLabel={(option) => option.title}
          getOptionSelected={(option, value) => option.value === value.value}
          style={{ width: "100%" }}
          defaultValue={tipos[tipo]}
          renderInput={(params) => <TextField {...params} label="Tipo agendamento" />}
          onChange={selecionaTipo}
        />
        <div className="horzBox">
          <label htmlFor="horarioAgned">Horário</label>
          <TextField id="horarioAgned" value={horario} type="time" onChange={e => setHoaraio(e.target.value)}></TextField>
        </div>
        <TextField
          multiline
          variant="outlined"
          placeholder="Observações"
          className="txtArea"
          value={observacoes}
          onChange={e => setObservacoes(e.target.value)}
        />
        <div className="horzBox">
          <button className="button" onClick={editarAgendamento}>Salvar</button>
          <button className="btnCancelar" onClick={handleCloseEdit}>Cancelar</button>
        </div>
      </div>
    </div>
  );


  async function editarAgendamento(e) {
    e.preventDefault()

    var dataDesfornatada = data.split("/");
    var dataFinal = dataDesfornatada[2] + '-' + dataDesfornatada[1] + '-' + dataDesfornatada[0];

    const dataHora = dataFinal + ' ' + horario
    const final = {
      tipo,
      observacoes,
      aluno_id: aluno.id,
      data_hora_execucao: null,
      data_hora_agendamento: dataHora
    }

    try {
      await api.put(`/agendamento/${id}`, final, { headers: { personal: localStorage.getItem('personal') } })

      listAluno()
      agendamentosBanco()

      handleCloseEdit()
    } catch (err) {
      alert(`Aconteceu algum erro ${err.response.data}`)
      console.log(err)
    }
  }



  async function cadastroAgendamento(e) {
    e.preventDefault()
    const dataHora = data.data + ' ' + horario

    const final = {
      tipo,
      observacoes,
      aluno_id: aluno.id,
      data_hora_execucao: null,
      data_hora_agendamento: dataHora
    }

    try {
      await api.post('/agendamento', final, { headers: { personal: localStorage.getItem('personal') } })
      alert(`Agendamento cadastrado com sucesso!`)
      listAluno()
      agendamentosBanco()
      handleClose()
    } catch (err) {
      alert(`Aconteceu algum erro ${err.response.data}`)
      console.log(err)
    }
  }

  const agendamentosBanco = async () => {
    await api.get('/agendamento', { headers: { personal: localStorage.getItem('personal') } })
      .then(response => {
        setAgendamentos(response.data)

      })
      .catch(err => {
        console.log(err)
      })
  }
  const listAluno = async () => {
    await api.get('/alunos', { headers: { personal: localStorage.getItem('personal') } })
      .then(response => {
        setAlunos(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {

    listAluno()
    agendamentosBanco()
  }, [])

  function clicarData(arg) {
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    let dataClick = new Date(arg.dateStr);
    let dataFormatada = (((dataClick.getDate() + 1) + " " + meses[(dataClick.getMonth())] + " " + dataClick.getFullYear()));
    const dataObj = {
      data: arg.dateStr,
      dataFormat: dataFormatada
    }
    setData(dataObj)
    setOpenModal(true)
  }

  const history = useHistory();
  const [id, setId] = useState({})

  //useEffect(() =>  {

  //}, [id])

  function dataFormatada(data) {
    var dataFormatada = data.split("-");
    return (dataFormatada[2] + "/" + dataFormatada[1] + "/" + dataFormatada[0])
  }

  async function ListaAgendamentosDia(arg) {
    arg.jsEvent.preventDefault()
    //console.log(arg)
    //alert(arg.event.url)

    swal.fire({
      title: 'Você deseja?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Editar`,
      denyButtonText: `Excluir`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {


        const bancoBusca = async () => {
          await api.get(`/agendamento/${arg.event.id}`, { headers: { personal: localStorage.getItem('personal') } })
            .then(response => {
              console.log(response.data[0])
              var dataHora = response.data[0].data_hora_agendamento;
              var hora = dataHora.split(" ");


              if (response.data[0]?.tipo == 'T') {
                tipoEdit = 1;
              } else {
                tipoEdit = 0;
              }

              setTipo(tipoEdit)
              setHoaraio(hora[1])
              setData(dataFormatada(hora[0]))
              setObservacoes(response.data[0]?.observacoes)
              setId(response.data[0]?.id)
              setOpenModalEdit(true)

              const alunoQuery = async () => {
                await api.get(`/alunos/${response.data[0].aluno_id}`, { headers: { personal: localStorage.getItem('personal') } })
                  .then(response => {
                    setAlunoId(response.data[0])
                  })
                  .catch(err => {
                    console.log(err)
                  })
              }
              alunoQuery()

            })
            .catch(err => {
              console.log(err)
            })
        }
        bancoBusca()

        console.log(arg.event.id)
        //setId(arg.event.id)




      } else if (result.isDenied) {
        swal.fire({
          title: 'Você tem certeza?',
          text: "Você não poderá reverter isso!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, Exclua!',
          cancelButtonText: 'Cancelar'
        }).then(async (result) => {
          if (result.isConfirmed) {
            const resposta =
              await api.delete(`/agendamento/${arg.event.id}`)
            listAluno()
            agendamentosBanco()

            if (resposta.status == 204) {
              swal.fire(
                'Excluido!',
                'Seu agendamento foi excluido.',
                'success'
              )
            }

          }
        })
      }
    })

  }

  return (
    <div id="page">
      <Header className="header" />
      <Menu page="4" />
      <div className="main">
        <Titulo
          titulo="Agenda"
          textoBotao="Adicionar"
          classBotao="hidden"
        // btnClick={btnAdicionarClick}
        />
        <div className="calendario">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridWeek"
            dateClick={clicarData}
            contentHeight="auto"
            locale="PT-BR"
            buttonText={{ today: "Hoje" }}
            events={agendamentos}
            eventClick={ListaAgendamentosDia}
            dayMaxEventRows={2}

          />
        </div>
      </div>
      <Footer className="footer" />
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

      <Modal
        open={openModalEdit}
        onClose={handleCloseEdit}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {edit}
      </Modal>
    </div>
  )
}