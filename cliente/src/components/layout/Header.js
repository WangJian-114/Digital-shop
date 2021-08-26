import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import Cart from "../cart/Cart";
import AuthContext from '../../context/auth/authContext';



const Header = () => {
    const authContext = useContext(AuthContext);
    const { autenticado, usuario, signOut  } = authContext; 

    return ( 
        <Fragment>
            <header id="header" className="header">
                <div className="container">
                    <div className="navegacion">
                        {/* <img src={logo} id="logo"/> */}
                        <div className="logo efecto" id="logo">
                                Digital shop
                            <span id="span1"></span>
                            <span id="span2"></span>
                            <span id="span3"></span>
                            <span id="span4"></span>
                        </div>
                             
                        <nav className="nav__icons">

                            { usuario ?  <div className="usuario"><Link to='/usuario/compras' id="nombre">HOLA: {usuario.name}</Link></div> : null}

                            { autenticado 
                                ? (
                                    <div className="icono">
                                        <Link to={'#!'}
                                            className='icon'
                                            onClick={()=> signOut()}
                                        >
                                            <i className="fas fa-sign-out-alt"></i>
                                        </Link>
                                    </div>
                                )
                                :(
                                    <div className="icono">
                                        <Link to={'/login'}
                                            className='icon'
                                        >
                                            <i className="fas fa-user"></i>
                                        </Link>
                                    </div>
                                )
                            }
                            {
                                usuario?.rol === "ADMIN_ROLE" ? (
                                <Link to="/administracion"
                                    className='icon admin'
                                >
                                    <i className="fas fa-user-shield"></i>
                                </Link>
                                ):  null
                            }
    
                            <Cart />  
                        </nav>    
                    </div> 
                </div>
            </header>        
        </Fragment>

    );
}
 
export default Header;