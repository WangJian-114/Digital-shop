import { 
    OBTENER_PEDIDOS,
    OBTENER_PEDIDOS_USUARIO,
    ELIMINAR_PEDIDOS,
    MODIFICAR_PEDIDOS,
    GENERAR_PEDIDOS,
    MEJORES_CLIENTES,
    PRODUCTOS_MAS_VENDIDO,
    PEDIDOS_RECIENTES,
    PEDIDOS_PENDIENTES
   } from '../../type';

// eslint-disable-next-line import/no-anonymous-default-export
export default ( state, action) => {
   switch(action.type) {
            
        case OBTENER_PEDIDOS: 
            return {
                ...state,
                pedidos: action.payload,
                loading:false,
            }
            
        case OBTENER_PEDIDOS_USUARIO: 
            return {
                ...state,
                pedidoUsuario: action.payload,
            }

        case GENERAR_PEDIDOS:
            return {
                ...state,
                pedidos:[ action.payload, ...state.pedidos],
            }

        case ELIMINAR_PEDIDOS :
            return {
                ...state,
                pedidos: state.pedidos.filter(pedido => pedido._id !== action.payload)
            }

        case MODIFICAR_PEDIDOS :
            // console.log('desde dereducer', action.payload);
            return {
                ...state,
                pedidos : state.pedidos.map(pedido => pedido._id === action.payload._id ? action.payload  : pedido)
            }

        case MEJORES_CLIENTES :
            return {
                ...state,
                mejoresClientes: action.payload
            }

        case PRODUCTOS_MAS_VENDIDO :
            const top7 = action.payload.slice(0, 7);
            // console.log(top7);

            return {
                ...state,
                productosMasVendido: top7
            }

        case PEDIDOS_RECIENTES :
            return {
                ...state,
                pedidosReciente: action.payload
            }

        case PEDIDOS_PENDIENTES :
            return {
                ...state,
                pedidosPendientes: action.payload
            }
        

       default:
           return state;
   }
}