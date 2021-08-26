import React,{ useEffect, useContext,Fragment, useState} from 'react';
import { useHistory } from 'react-router-dom';
import CartContext from "../../context/cart/cartContext";
import AuthContext from '../../context/auth/authContext';
import PedidoContext from '../../context/order/orderContext';
import CartItem from '../cart/CartItem';
import Notificacion from "../Notification";



const Cart = () => {

    const history = useHistory();

    const [ notificacion, actualizarNotificacion ] = useState(true);
    const cartContext = useContext(CartContext);
    const pedidoContext = useContext(PedidoContext);

    const { createOrder } = pedidoContext;
    const { carrito, Total, getTotal, emptyCart, getCart, inicializeCart } = cartContext;
 

    const authContext = useContext(AuthContext);
    const { autenticado } = authContext; 

    const borrarCarrito = () => {
        emptyCart();
    }
    
    
    const generarPedido = async () => {
        const info = {
            carrito,
            Total
        };
        inicializeCart(); 
        await createOrder(info);  
        history.push('/usuario/compras');
    }
            
    useEffect(() => {
        async function fetchData(){
            if(autenticado){
                await getCart();
    
                if(carrito !== 0){
                    actualizarNotificacion(true);
                   getTotal();   
                };
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autenticado]);

    

    return ( 
        <Fragment>
            <ul>
                <li className="submenu">
                    <i className="fas fa-shopping-cart"></i>
                    
                    { notificacion && autenticado
                    ? 
                        (
                            <Notificacion 
                                cantidades = {carrito?.length}
                            />
                        )
                    :
                        (
                        null
                        ) 
                    }
                    
                    { autenticado 
                    
                    ?
                        (
                            <div id="carrito">
                                <table id="lista-carrito" className="carrito"> 
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th>Action</th>
                                            <th></th>
                                        </tr>
                                    </thead> 
        
                                    { carrito?.map(producto => (
                                            <CartItem 
                                                key={producto.productId}
                                                producto={producto}    
                                            />  
                                    )) }
                                </table>

                                { carrito.length === 0 ? <p>El carrito esta vacio</p> 
                                :( 
                                   <> 
                                        <div className="total">
                                            <p>Total: <span>$ {Total}</span></p>
                                        </div>
                                        <button 
                                            className="btn-vaciar"
                                            onClick={()=>borrarCarrito()}
                                        >
                                        Vaciar Carrito</button>
                
                                        <button
                                            className="btn-pagar"
                                            onClick={generarPedido}
                                        >
                                        Ir a Pago</button>
                                    </>
                                )
                                }

                            </div>
                        )
                    :
                        (
                            <> 
                                <div id="carrito">
                                    <p>Aun no estas logueado</p>
                                </div>
                            
                            </>
                        )
                    }
                   
                </li>
            </ul>
        </Fragment>
    );
}
 
export default Cart;