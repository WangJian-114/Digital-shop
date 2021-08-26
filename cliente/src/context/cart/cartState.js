import React, {useReducer} from 'react';
import CartContext  from './cartContext';
import CarritoReducer  from './cartReducer';
import Swal from 'sweetalert2';

import { 
    OBTENER_CARRITO,
    AGREGAR_CARRITO,
    OBTENER_TOTAL,
    ELIMINAR_CARRITO,
    VACIAR_CARRITO,
 } from '../../type';
 import clienteAxios from '../../config/axios';




const CartState = props => {
    

    const inicialState = {
        carrito : [],
        Total: 0,
    }

    const [ state, dispatch ] =  useReducer(CarritoReducer, inicialState);

    const inicializeCart = () => {
        dispatch({
            type:VACIAR_CARRITO
        })
    }

    // Obtener carrito de usuario autenticado
    const getCart = async () => {
        try {
            // console.log('obteniendo carrito desde la base de datos')
            const resultado = await clienteAxios.get('cart');
            // console.log(resultado);
            dispatch({
                type:OBTENER_CARRITO,
                payload: resultado.data.cartUser.carrito
            });
            getTotal();

        } catch (error) {
            console.log(error);
        }

    }

    // Obtener total del carrito
    const getTotal = () => {
        dispatch({
            type:OBTENER_TOTAL,
        })
    }


    // Agregar un producto en el carrito
    const addCart = async (producto) => {
        const cantidad = {
            cant:producto.cantidad
        };
        try {
            await clienteAxios.post(`cart/${producto.idProducto}`, cantidad);
            // console.log(resultado);
            dispatch({
                type: AGREGAR_CARRITO,
                payload: producto,      
            });
    
            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            );  

        } catch (error) {
            console.log(error);
            // Alerta
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
 

    const removeProductCart = async (id) => {   
        try {
            await clienteAxios.delete(`cart/${id}`);
            // console.log(respuesta);
            dispatch({
                type:ELIMINAR_CARRITO,
                payload: id
            })

            getTotal();

            Swal.fire(
                'Correcto',
                'El producto se elimino correctamente',
                'success'
            );
        } catch (error) {
            console.log(error.response);
            // Alerta
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }


    const emptyCart = () => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Una vez confirmado la operacion no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!'
          }).then((result) => {
            if (result.isConfirmed) {
              clienteAxios.delete('cart/vaciar');
              dispatch({
                type:VACIAR_CARRITO
              })
              Swal.fire(
                'Eliminado!',
                'Todos los productos fueron eliminado',
                'success'
              )
            }
          })
    }
    

    return(
        <CartContext.Provider
            value={{
                carrito : state.carrito,
                Total: state.Total,
                getCart,
                removeProductCart,
                emptyCart,
                addCart,
                getTotal,
                inicializeCart
            }}
        >
            {props.children}
        </CartContext.Provider>
    )


}

export default CartState;