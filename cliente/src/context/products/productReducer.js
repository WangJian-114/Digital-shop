import { 
    OBTENER_PRODUCTOS,
    AGREGAR_PRODUCTOS,
    MODIFICAR_PRODUCTOS, 
    ELIMINAR_PRODUCTO,
    PRODUCTO_ACTUAL 
 } from '../../type';


 // eslint-disable-next-line import/no-anonymous-default-export
 export default (state, action) => {
    switch(action.type) {

        case OBTENER_PRODUCTOS:
            return {
                ...state,
                productos: action.payload
            }

        case AGREGAR_PRODUCTOS:
            return {
                ...state,
                productos: [...state.productos, action.payload]
            }

        case ELIMINAR_PRODUCTO: 
            return {
                ...state,
                productos: state.productos.filter(producto => producto._id !== action.payload),
            }

        case PRODUCTO_ACTUAL:
            return {
                ...state,
                productoSeleccionado: action.payload
            }
    
        case  MODIFICAR_PRODUCTOS : 
        return {
            ...state,       
            productos : state.productos.map(producto => producto._id === action.payload._id ? action.payload : producto)

        }

    

        
        // eslint-disable-next-line no-fallthrough
        default:
            return state;
    }
}