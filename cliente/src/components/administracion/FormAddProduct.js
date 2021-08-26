import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddProduct from './Form/AddProduct';
import Layout from './Layout';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function FormAddProduct() {
  const classes = useStyles();
  return (
    <Layout titulo="Formulario Para Agregar Un Producto">
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <AddProduct />
        </Paper>
      </Grid>
    </Layout>

  );
}