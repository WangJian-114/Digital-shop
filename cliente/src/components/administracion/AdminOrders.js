import React, { useEffect, useContext} from 'react';
import Orders from './Orders';
import Grid from '@material-ui/core/Grid';
import Layout from './Layout';
import authContext from '../../context/auth/authContext';
import pedidoContext from '../../context/order/orderContext';
import Spinner from '../../util/Spinner';


export default function AdminOrders() {
  
  const AuthContext = useContext(authContext);
  const { authenticatedUser } = AuthContext;

  const PedidoContext = useContext(pedidoContext);
  const { pedidos, getOrders, loading } = PedidoContext;
  // console.log(pedidos);

  useEffect (() => {
      authenticatedUser();
      getOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(loading) return <Spinner />;



  return (
    <Layout titulo="Pedidos">
        <Grid item xs={12}>
          { pedidos?.length !== 0 ? pedidos.map( pedido => (
            <Orders 
              key={pedido._id}
              {...pedido}
            />
          ) ) : 'No hay pedidos'}
        </Grid>
    </Layout>
  );
}