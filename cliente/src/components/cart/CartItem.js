import React,{Fragment, useContext} from 'react';
import CartContext from "../../context/cart/cartContext";

const CarritoItem = ({producto}) => {
    
    const cartContext = useContext(CartContext);
    const { removeProductCart, getTotal, getCart } = cartContext;

    const productoAccion = async (productoId) => {
        await removeProductCart(productoId);
        await getCart();
        getTotal();
    }
    

    return ( 
        <Fragment>
                <tbody>
                    <tr>
                        <td><img src={`${process.env.REACT_APP_BACKEND_URL_IMG}/${producto.img}`} alt=""/></td>
                        <td>{producto.name}</td>
                        <td>{producto.price}</td>
                        <td>{producto.cant}</td>
                        <td>
                            <button
                                className="btn-eliminar"
                                onClick={ ()=> productoAccion(producto.productId) }
                            ><i className="far fa-trash-alt"></i>
                            </button>    
                        </td>  
                    </tr>
                </tbody>   
        </Fragment>
    );
}
 
export default CarritoItem;