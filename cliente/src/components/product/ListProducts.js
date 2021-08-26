import React, {useContext, useEffect} from 'react';
import Producto from "./Product";
import ProductoContext from "../../context/products/productContext";

const ListProducts = () => {

    const productosContext = useContext(ProductoContext);
    
    const { productos, getProducts } = productosContext;


    useEffect(() => {
        getProducts();
        // eslint-disable-next-line
    }, [])
    
    return (  
        <div id="lista-cursos" className="container">
            <h1 id="encabezado" className="encabezado">Productos</h1>
            <div className="contenedor-grid">
                {  productos.map( producto => (
                    <Producto 
                        key={producto._id}
                        producto = {producto}
                    />

                ))}       
            </div>
        </div>  
    )
}  
 
export default  ListProducts;