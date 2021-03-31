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

function CadastroTreino() {
  const [nome, setNome] = useState('');
  const [alunos, setAlunos] = useState([]);
  const [aluno, setAluno] = useState('');
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([]);


  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
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
      setAluno(alunos[parseInt(index)].id)
    } else {
      setAluno([])
    }
  }

  let detalhes

  function CadastroTreino(e) {
    e.preventDefault()
    right.forEach((exercicio) => {
      const title = exercicio.nome
      
      if(exercicio.tipo === "R"){  
        console.log(title)
        Swal.mixin({
          input: 'number',
          confirmButtonText: 'Próximo &rarr;',
          showCancelButton: true,
          progressSteps: ['1', '2', "3", "4"]
        }).queue([
          {
            title,
            text: 'Selecione quantas sereis'
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
            console.log(result.value)
            const answers = JSON.stringify(result.value)
            Swal.fire({
              title: 'All done!',
              html: `
                Your answers:
                <pre><code>${answers}</code></pre>
              `,
              confirmButtonText: 'Lovely!'
            })
          }
        })
      } else {
        console.log(title)
        Swal.mixin({
          // input: 'text',
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
            const answers = JSON.stringify(result.value)
            Swal.fire({
              title: 'All done!',
              html: `
                Your answers:
                <pre><code>${answers}</code></pre>
              `,
              confirmButtonText: 'Lovely!'
            })
          }
        })
      }


    })
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

    listAluno()
    listExercicio()
  }, [])


  return (
    <div id="page">
      <Header classname="header" />
      <Menu page="2"/>
      <div className="main">
        <div className="boxAlt">
          <h2>Cadastro de Treino</h2>
          <form action="">

            <div className="autocomplete">
              <Autocomplete
                id="combo-box-demo"
                freeSolo
                options={alunos}
                getOptionLabel={(option) => option.nome}
                style={{ width: "100%" }}
                noOptionsText="Sem opções"
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
                    onClick={handleAllRight}
                    disabled={left.length === 0}
                    aria-label="move all right"
                  >
                    ≫
          </Button>
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
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    onClick={handleAllLeft}
                    disabled={right.length === 0}
                    aria-label="move all left"
                  >
                    ≪
          </Button>
                </Grid>
              </Grid>
              <Grid item>Exercícios Adicionados{customList(right)}</Grid>
            </Grid>
            <div className="horizontalBox buttons">
              <button onClick={CadastroTreino}>Cadastrar</button>
              <button className="cancel">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
      <Footer classname="footer" />
    </div>
  )
}

export default CadastroTreino