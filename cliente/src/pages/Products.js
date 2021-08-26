import React, { Fragment, useContext, useEffect } from 'react';

import Header from "../components/layout/Header";
import ListaProducto from "../components/product/ListProducts";
import Footer from "../components/layout/Footer";
import Carousel from "../components/Carousel";
import Coleccion from "../components/product/Collection";

import AuthContext from "../context/auth/authContext";


const Productos = () => {

    //  Extraer la informacion de autenticacion
    const  authContext = useContext(AuthContext);
    const {authenticatedUser } =  authContext;

    useEffect (()=>{
       authenticatedUser();
        // eslint-disable-next-line
    }, [])
    
    
    return ( 
        <Fragment>
            <Header />
                <Carousel />
                <Coleccion />
                <ListaProducto />
            <Footer />      
        </Fragment>

    );
}
 
export default Productos;