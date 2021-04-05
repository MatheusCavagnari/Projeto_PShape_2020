import React, { useState, useEffect } from 'react'

import Menu from '../../Menu'
import Header from '../../Header'
import Footer from '../../Footer'
import api from '../../../services/api'

import './styles.css'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Swal from 'sweetalert2'
import { useHistory, useParams } from 'react-router'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function EditarTreino() {
  const [nome, setNome] = useState('');
  const [alunos, setAlunos] = useState([]);
  const [aluno, setAluno] = useState({});
  const [exercicios, setExercicos] = useState([]);
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const history = useHistory();
  const { id } = useParams();
  
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {

    const title = leftChecked[0].nome     
      if(leftChecked[0].tipo === "R"){  
        // console.log(title)
        Swal.mixin({
          input: 'number',
          confirmButtonText: 'Próximo &rarr;',
          showCancelButton: true,
          progressSteps: ['1', '2', "3", "4"]
        }).queue([
          {
            title,
            text: 'Selecione quantas series'
          },
          {
            title,
            text: 'Selecione quantas repetições'
          },
          {
            title,
            text: 'Selecione a carga'
          },
          {
            title,
            text: 'Observações',
            input: 'textarea'
          }
        ]).then((result) => {
          if (result.value) {
            // console.log(result.value)
            // const answers = JSON.stringify(result.value)
            // Swal.fire({
            //   title: 'All done!',
            //   html: `
            //     Your answers:
            //     <pre><code>${answers}</code></pre>
            //   `,
            //   confirmButtonText: 'Lovely!'
            // })
            const exercicioRepet = {
              exercicio_id: leftChecked[0].id,
              detalhes: {
                series: result.value[0],
                repeticao: result.value[1],
                carga: result.value[2],
                observacoes: result.value[3],
              }
            }
            let concat = [...exercicios, exercicioRepet]
            setExercicos(concat)
            // console.log(concat)
          }
        })
      } else {
        Swal.mixin({
          confirmButtonText: 'Próximo &rarr;',
          showCancelButton: true,
          progressSteps: ['1', '2']
        }).queue([
          {
            title,
            text: 'Selecione quanto tempo',
            input: "number",
            
          },
          {
            title,
            text: 'Observações',
            input: 'textarea'
          },
        ]).then((result) => {
          if (result.value) { 
            // console.log(result.value)
            // const answers = JSON.stringify(result.value)
            // Swal.fire({
            //   title: 'All done!',
            //   html: `
            //     Your answers:
            //     <pre><code>${answers}</code></pre>
            //   `,
            //   confirmButtonText: 'Lovely!'
            // })
            const exercicioTempo = {
              exercicio_id: leftChecked[0].id,
              detalhes: {
                tempo: result.value[0],
                observacoes: result.value[1],
              }
            }
            let concat = [...exercicios, exercicioTempo]
            setExercicos(concat)
            // console.log(concat)
          }
        })
      }

    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));

    const x = exercicios.map(ex => ex.exercicio_id)
    exercicios.splice(x.indexOf(rightChecked[0].id), 1)

    setExercicos(exercicios)
   };

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;
          return (
            <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.nome}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );


  function selecionaAluno(e) {
    const abc = e.target.id;
    const index = abc.slice(22);
    if (index) {
      setAluno(alunos[parseInt(index)])
      // console.log(alunos[parseInt(index)].id)
    } else {
      setAluno([])
    }
  }

  
  useEffect(() => {
    const listAluno = async () => {
      await api.get('/alunos', { headers: { personal: localStorage.getItem('personal') } })
        .then(response => {
          setAlunos(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    }

    const listExercicio = async () => {
      await api.get('/exercicio', { headers: { personal: localStorage.getItem('personal') } })
        .then(response => {
          // console.log(response.data)
          setLeft(response.data)
        }).catch(err => {
          console.log(err)
        })
    }
    let acum = []
    async function exerciciosBanco(exercicio) {
      const bco = await api.get(`/exercicio/${exercicio.exercicio_id}`, { headers: { personal: localStorage.getItem('personal') } })
        // setRight(right.push(bco.data[0]))
        acum.push(bco.data[0])
        
    }
    
    const bancoBusca = async () => {
      const response = await api.get(`/treino/${id}`)
      console.log(response.data.aluno_id)
      if(response.data.aluno_id) {
        const alunoTreino = (await api.get(`/alunos/${response.aluno_id}`)).data
        console.log(response.data.aluno_id)
      }

      // response.exercicios.forEach(exerciciosBanco)
      setNome(response.data.nome)
      // console.log(acum)

    }
    bancoBusca();
    listAluno()
    listExercicio()

  }, [id])

  async function btnEditarAluno(e) {
    e.preventDefault()

    // try {
    //   api.put(`/alunos/${id}`, {
    //     nome,
    //     telefone,
    //     whatsapp,
    //     data_nasc: dataNasc,
    //     sexo,
    //     objetivo,
    //     observacoes
    //   }, { headers: { personal: localStorage.getItem('personal') } })



    //   Swal.fire(
    //     'Alterado!',
    //     'Aluno alterado com sucesso.',
    //     'success'
    //   ).then(async (result) => {
    //     if (result.isConfirmed) {
    //       history.push('/aluno')
    //     }
    //   })


    // } catch (err) {
    //   alert(`Aconteceu algum erro ${err.response.data}`)
    //   console.log(err)
    // }

  }

  function AlterarTreino(e){
    e.preventDefault()
  }


  function btnCancelar(e) {
    e.preventDefault()
    history.push('/treino')
  }


  return (
    <div id="page">
      <Header classname="header" />
      <Menu page="2" />
      <div className="main">
        <div className="boxAlt">
          <h2>Editar Treino</h2>
          <form>

            <div className="autocomplete">
              <Autocomplete
                id="combo-box-demo"
                freeSolo
                options={alunos}
                getOptionLabel={(option) => option.nome}
                style={{ width: "100%" }}
                // defaultValue={alunos.find(v => v.id == aluno)}
                // value={aluno}
                renderInput={(params) => <TextField {...params} label="Aluno" />}
                onChange={selecionaAluno}
              />
            </div>
            <TextField id="standard-basic nome"
              label="Nome"
              name="nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
            <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
              <Grid  item>Exercícios{customList(left)}</Grid>
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                  >
                    &gt;
          </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                  >
                    &lt;
          </Button>
                </Grid>
              </Grid>
              <Grid item>Exercícios Adicionados{customList(right)}</Grid>
            </Grid>
            <div className="horizontalBox buttons">
              <button onClick={AlterarTreino}>Salvar</button>
              <button className="cancel" onClick={btnCancelar}>Cancelar</button>
            </div>
          </form>

        </div>
      </div>
      <Footer classname="footer" />
    </div>
  )
}

export default EditarTreino