/* eslint-disable import/no-anonymous-default-export */
import { 
    OBTENER_TOTAL,
    AGREGAR_CARRITO,
    ELIMINAR_CARRITO,
    VACIAR_CARRITO,
    CARRITO_ERROR,
    OBTENER_CARRITO
 } from '../../type';


 export default (state, action) => {
    switch(action.type) {

        case OBTENER_CARRITO:

            return {
                ...state,
                carrito: action.payload
            }
    
        case AGREGAR_CARRITO:
            // tomo una copia del carrito
            let carritoOld = [...state.carrito];

            // Creo el objeto de producto en carrito
            const itemCarrito = {
                productId: action.payload.idProducto,
                name: action.payload.nombre,
                description: action.payload.descripcion,
                img: action.payload.img,
                price: action.payload.precio,
                cant: action.payload.cantidad
            };
    
            // verifica si existe el producto que selecciono el usuario
            const existe = carritoOld.some(producto => producto.id === action.payload.id);
            
            if(existe){
                const carritoNew = carritoOld.map( producto => {
                    if(producto.id === action.payload.id){
                        return {
                            ...producto,
                            cantidad: action.payload.cantidad
                        };

                    } else {
                        return producto;// retorna objeto que no son duplicados
                    }    
                });
                
                return {
                    ...state,
                    carrito:[...carritoNew]
                }
                
            } else{ 
                return {
                    ...state,
                    carrito:[...state.carrito, itemCarrito]
                }
        
        }

        case OBTENER_TOTAL:
            let total = 0; 
            state.carrito.forEach( articulo => {
                total += articulo.price *articulo.cant; 
            });

            return {
                ...state,
                Total:total
            }

        case ELIMINAR_CARRITO :
            return {
                ...state,
                carrito: state.carrito.filter(producto => producto.productId !== action.payload),
            }

        case VACIAR_CARRITO :
        
            state.carrito = [];
            return {
                ...state,
                Total: 0
            }

        
        case CARRITO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        
        default:
            return state;
    }
}