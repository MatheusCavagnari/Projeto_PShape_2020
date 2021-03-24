import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.primary,
  },
}));

export default function CenteredTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(parseInt(props.page));



  const handleChange = (event, newValue) => {
      console.log(newValue)
    setValue(newValue);

  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        // backgroundColor="primary"
        centered
      >
        <Tab href='/aluno' label="Alunos" />
        <Tab href='/avaliacao' label="Avaliação" />
        <Tab href='/treino' label="Treino" />
        <Tab href='/exercicio' label="Exercícios" />
        <Tab href='/agenda' label="Agenda" />
      </Tabs>
    </Paper>
  );
}
