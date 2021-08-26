import React from 'react';
import Layout from './Layout';
import { makeStyles } from '@material-ui/core/styles';
import Users from './Users';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


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

export default function AdminUsers() {
  const classes = useStyles();


  return (
    <Layout>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Users />
        </Paper>
      </Grid>
    </Layout>
  )
  
}