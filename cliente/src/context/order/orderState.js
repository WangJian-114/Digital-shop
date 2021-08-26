import React, { useReducer } from 'react';
import OrderContext from './orderContext';
import OrderReducer from './orderReducer';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';


import { 
    OBTENER_PEDIDOS,
    OBTENER_PEDIDOS_USUARIO,
    GENERAR_PEDIDOS,
    ELIMINAR_PEDIDOS,
    MODIFICAR_PEDIDOS,
    MEJORES_CLIENTES,
    PRODUCTOS_MAS_VENDIDO,
    PEDIDOS_RECIENTES,
    PEDIDOS_PENDIENTES
   } from '../../type';


const OrderState = props => {
    
    const inicialState = {
        mejoresClientes: [],
        productosMasVendido:[],
        pedidos: [],
        pedidoUsuario:[],
        pedidosReciente:[],
        pedidosPendientes: null,
        loading: true
    }

    const [ state, dispatch ] =  useReducer(OrderReducer, inicialState);

    // Generar un pedido
    const createOrder = async (cart) => {
        // console.log(cart);
        try {
            // Petecion a API
            const res = await axiosClient.post('/order', cart);
            // console.log(res.data);
            dispatch({
                type: GENERAR_PEDIDOS
            });
            Swal.fire({
                customClass: {
                    container: 'z-index'
                },
                icon: 'success',
                title: 'Correcto',
                text: res.data.msg,
            })
        } catch (error) {
            // console.log(error.response.data.msg);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.msg
            })
        }
    }

    // Obtener los pedidos realizado por un usuario con su ID
    const getOrder = async (userId) => {
        try {
            const respuesta = await axiosClient.get(`/order/${userId}`);
            // console.log(respuesta);
            dispatch({
                type: OBTENER_PEDIDOS_USUARIO,
                payload: respuesta.data
            });

        } catch (error) {
            // console.log(error.response.data.msg);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.msg
            })
        }
    }

    // Obtener todos los pedidos
    const getOrders = async () => {
        try {
            const respuesta = await axiosClient.get('/order');
            // console.log(respuesta.data.orders);
            dispatch({
                type: OBTENER_PEDIDOS,
                payload: respuesta.data.orders
            });

        } catch (error) {
            // console.log(error.response.data.msg);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.msg
            })
        }
    }

    // Obtener los 5 pedidos recientes
    const getRecentOrder = async () => {
        try {
            const res = await axiosClient.get('/order/ordenesreciente/orden');
            // console.log(res);
            dispatch({
                type: PEDIDOS_RECIENTES,
                payload: res.data.recentOrders
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.msg
            })
        }
    }

    // Obtener los pedidos pendientes
    const getPendingOrder = async () => {
        try {
            const res = await axiosClient.get('/order/ordenespendientes/orden');
            // console.log(res);
            dispatch({
                type: PEDIDOS_PENDIENTES,
                payload: res.data.pendingOrders 
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.msg
            })
        }
    }

    // Eliminar un pedido con su ID
    const deleteOrder = ( orderId ) => {
        try {
            Swal.fire({
                title: 'Estas Seguro?',
                text: "Una vez eliminado no se puede recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminalo!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axiosClient.delete(`/order/${orderId}`);
                    dispatch({
                        type: ELIMINAR_PEDIDOS,
                        payload: orderId
                    })
                    Swal.fire(
                        'Eliminado!',
                        'El usuario fue eliminado.',
                        'success'
                    )
                }
              })
        } catch (e) {
            // console.log(e);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error'
            })
        }
    }

    // Actualizar el estado de un pedido
    const changeStateOrder = async ( state, idPedido ) => {
        // En req.body tiene que enviar como un objeto, por eso lo construimos
        const info = {
            state
        };
        try {        
            const res = await axiosClient.put(`/order/${idPedido}`, info);
            console.log(res.data.pedido);
            dispatch({
                type:  MODIFICAR_PEDIDOS,
                payload: res.data.pedido
            });

            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: 'Se ejecuto correctamente',
              })

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error'
            })
        }
    }

    // Obtener los mejores Clientes
    const bestClients = async () => {
        try {
            const res = await axiosClient.get('order/mejoresclientes/clientes');
            // console.log(res.data.mejoresClientes);
            dispatch({
                type: MEJORES_CLIENTES,
                payload: res.data.mejoresClientes
            })
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error'
            })
        }
    }

    // Obtener los productos mas vendido
    const getProductosMasVendido = async () => {
        try {
            const res = await axiosClient.get('order/productosMasVendido/productos');
            // console.log(res.data);
            dispatch({
                type: PRODUCTOS_MAS_VENDIDO,
                payload: res.data.productosMasVendidoOrdenado
            })
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error'
            })
        }
    }

    return(
        <OrderContext.Provider
            value={{
                mejoresClientes: state.mejoresClientes,
                productosMasVendido: state.productosMasVendido,
                pedidosReciente: state.pedidosReciente,
                pedidosPendientes : state.pedidosPendientes,
                pedidos: state.pedidos,
                pedidoUsuario: state.pedidoUsuario,
                loading: state.loading,
                getOrder,
                createOrder,
                getOrders,
                getRecentOrder,
                deleteOrder,
                changeStateOrder,
                bestClients,
                getProductosMasVendido,
                getPendingOrder

            }}
        >
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderState;