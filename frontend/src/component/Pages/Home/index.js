import React from 'react';
import Menu from '../../Menu'
import './styles.css';

import Header from '../../Header';
import Footer from '../../Footer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


function Home() {
    return (
        <div id="page">
            <Header />
            <Menu page="0" />
            <Container maxWidth="md">
                <Grid container spacing={3}>
                    <Grid item xs>
                        <div></div>
                    </Grid>
                    <Grid item xs>
                        <div></div>
                    </Grid>
                    <Grid item xs>
                        <Button variant="contained" color="primary">Agendar aluno</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <div>Alunos Ativo</div>
                    </Grid>
                    <Grid item xs>
                        <div>Aulas Agendadas</div>
                    </Grid>
                    <Grid item xs>
                        <div>Número total de Alunos (Grafico)</div>
                    </Grid>
                </Grid>
            </Container>

            <Footer className="footer" />
        </div>
    );
}

export default Home;