import React, { useState, useContext, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import pedidoContext from '../../context/order/orderContext';



const useStyles = makeStyles((theme) => ({
    paper: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
}));
  


export default function Pedidos({ client, state, order, total, _id, creado }) {
    // console.log(state);
    const PedidoContext = useContext(pedidoContext);
    const { deleteOrder, changeStateOrder } = PedidoContext;

    const [ estadoPedido, setEstadoPedido ] = useState(state);
    // console.log('Estado Pedido: ', state);
    const [ clase, setClase ] = useState('');

    // Función que modifica el color del pedido de acuerdo a su estado
    const clasePedido = () => {
        if(estadoPedido === 'PENDIENTE') {
            setClase('bg-yellow-400')
        } else if (estadoPedido === 'COMPLETADO') {
            setClase('bg-green-500')
        } else {
            setClase('bg-blue-400')
        }
    };

    const cambiarEstadoPedido = value => {
        changeStateOrder( value, _id );
        setEstadoPedido(value);
    }


    const classes = useStyles();

    useEffect(() => {
        if(estadoPedido) {
            setEstadoPedido(estadoPedido)
        }
        clasePedido();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [estadoPedido]);

  
    return (
        <React.Fragment>
            <Paper className={classes.paper}>
                <div className="flex pedidos">
                    <div className="izquierda">
                        <h4 className="negrita">Cliente: {client.name}</h4> 
                        <h5> <i className="far fa-envelope"></i>Correo:{client.email}</h5>
                        <h5><i className="fas fa-map-marker-alt"></i>Un direccion: {client.address}</h5>
                        <p className="text-sm text-gray-600 txt-left">{`${new Date(creado).toLocaleDateString()}`}</p>
                        <div>
                            <h4 className="negrita estado-pedido">Estado Pedido:</h4>
                            <select
                                className={`mt-2 appearance-none ${clase} border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:${clase} focus:border-blue-500 uppercase text-xs font-bold
                                `}
                                value={estadoPedido}
                                onChange={ e => cambiarEstadoPedido( e.target.value)  }
                            >
                                <option value="COMPLETADO">COMPLETADO</option>
                                <option value="PENDIENTE">PENDIENTE</option>
                                <option value="ENVIO">ENVIO</option>
                            </select>
                        </div>
                    </div>

                    <div className='derecha'>
                        <h4 className="negrita">Resumen del Pedido</h4>
                        { order.map( pedido => (
                            <div key={pedido._id} className="mt-1">
                                <p className="text-sm text-gray-600 txt-left">Producto: { pedido.name } </p>
                                <p className="text-sm text-gray-600 txt-left">Cantidad: {pedido.cant} </p>
                            </div>
                        ) ) }
                        
                        <p className="text-gray-800 mt-3 font-bold negrita">Total a pagar:
                            <span className="font-light"> $ {total}</span>
                        </p>

                        {estadoPedido !== 'COMPLETADO' 
                            ? (
                                <button
                                className="uppercase text-xs font-bold  flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight"
                                onClick={ () => deleteOrder(_id) }
                            >
                                Eliminar Pedido
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 ml-2"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button> 
                            )
                         
                         : (null)
                        }

            
                    </div>
                </div>
            </Paper>
        </React.Fragment>
    );
}