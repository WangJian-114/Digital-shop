import React,{ useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import pedidoContext from '../../context/order/orderContext';


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));



export default function OrderTable() {
  const classes = useStyles();
  const PedidoContext = useContext(pedidoContext);
  const { pedidosReciente, getRecentOrder } = PedidoContext;

  useEffect (() => {
    getRecentOrder()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <React.Fragment>
      <Title>Ordenes Recientes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Envia a</TableCell>
            <TableCell align="right">Monto en Ventas</TableCell>
          </TableRow>
        </TableHead>
       
        <TableBody>
          { pedidosReciente.map((pedido) => (
            <TableRow key={pedido._id}>
              <TableCell>{ new Date(pedido.creado).toLocaleDateString()}</TableCell>
              <TableCell>{pedido.client.name}</TableCell>
              <TableCell>{pedido.client.address}</TableCell>
              <TableCell align="right">$ {pedido.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link to="/administracion/ordenes">
          Ver más pedidos
        </Link>
      </div>
    </React.Fragment>
  );
}