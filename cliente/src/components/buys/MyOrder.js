import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
}));
  


export default function Pedidos({ state, order, total, creado }) {

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

    const classes = useStyles();

    useEffect(() => {
        if(estadoPedido) {
            setEstadoPedido(estadoPedido)
        }
        clasePedido();
    // eslint-disable-next-line
    }, [estadoPedido]);

  
    return (
        <React.Fragment>
            <Paper className={classes.paper}>
                <div className="flex pedidos">
                    <div className="izquierda">
                        <div>
                            <p className="text-lg text-gray-600 txt-left">Fecha: {`${new Date(creado).toLocaleDateString()}`}</p>
                            <h4 className="negrita estado-pedido">Estado Compra:</h4>
                            <button
                                className={`uppercase text-xs font-bold  flex items-center mt-4 ${clase} px-5 py-2 inline-block text-white rounded leading-tight`}
                                >
                                {estadoPedido}
                            </button>
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
                    </div>
                </div>
            </Paper>
        </React.Fragment>
    );
}