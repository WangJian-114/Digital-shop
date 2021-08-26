import React, {useContext, useState} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CartContext from '../../context/cart/cartContext';
import AuthContext from '../../context/auth/authContext';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
  },
}));

export default function TransitionsModal({ producto }) {

    let history = useHistory();
  
    const cartContext = useContext(CartContext);
    const { carrito, addCart, getTotal, getCart } = cartContext;
    const authContext = useContext(AuthContext);
    const { autenticado } = authContext; 
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        if( !autenticado ) {
            return history.push('/login');
        }
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [productoListo, guardarProducto] = useState({
        idProducto: producto._id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.price,
        img: producto.imagen,
        cantidad: 0
    });


    const [total, guardarTotal] = useState(0);

    // actualizar la cantidad de productos
    const restarProductos = () => {
        // copiar el arreglo original de productos
        const productoFinal = productoListo;

        // validar si esta en 0 no puede ir mas alla
        if(productoFinal.cantidad === 0) return;

        // decremento
        productoFinal.cantidad--;

        // almacenarlo en el state
        guardarProducto({
            ...productoListo,
            cantidad: productoFinal.cantidad
        });

        actualizarTotal();

    }

    const aumentarProductos = () => {
        // copiar el arreglo para no mutar el original
        let productoFinal = productoListo;

        // incremento
        productoFinal.cantidad++;
 
        
        // almacenarlo en el state
        guardarProducto({
            ...productoListo,
            cantidad: productoFinal.cantidad
        });

        actualizarTotal();
    }

    // Actualizar el total a pagar
    const actualizarTotal = () => {
        // console.log(productoListo.price);
        let nuevoTotal = (productoListo.cantidad * productoListo.precio); 
        // console.log(nuevoTotal);
        // almacenar el Total
        guardarTotal(nuevoTotal);
    }

    const addCarrito = async (producto) => {
        handleClose();
        if(producto.cantidad === 0) return 
        await addCart(productoListo);
        getCart(); 
        getTotal(carrito);
    }

    return (
        <div>
            <button 
                className="boton agregar-carrito" 
                onClick={handleOpen}
                >Agregar Al Carrito
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={`${classes.modal} mobile-modal`}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title" className="titulo-modal">{producto.name}</h2>
                        <div className="flex-modal">
                            
                            <div>
                                <img src={`${process.env.REACT_APP_BACKEND_URL_IMG}/${producto.img}`}  className="imagen-modal" alt="imagen"/>
                            </div>

                            <div className="detalles-producto">
                                <p id="transition-modal-description" className="ancho-fijo">{producto.description}</p>
                                <div className="contenedor-cantidad">
                                    <p>CANTIDAD</p>
                                    <i 
                                        className="fas fa-minus"
                                        onClick={() => restarProductos() }
                                    ></i>
                                    <p>{productoListo.cantidad}</p>
                                    <i 
                                        className="fas fa-plus"
                                        onClick={() => aumentarProductos() }
                                    ></i>
                                </div>
                                <p>STOCK: {producto.stock}</p>
                                <p className="precio-modal">${producto.price} /unididad</p>
                                <p className="total-modal">Total: {total}   </p>
                               
                            </div>    

                        </div>

                        <button 
                            className="btn-modal"
                            onClick={() => addCarrito(productoListo) }
                            >CONFIRMAR</button>
                    </div>
                    
                </Fade>
            </Modal>
        </div>
    );
}
