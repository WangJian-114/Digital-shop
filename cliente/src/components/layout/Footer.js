import React from 'react';

const Footer = () => {
    return ( 
            <footer className="footer">
                <div className="container">
                    <div className="footer-box">
                        <ul className="menu">
                            <h3>EXTRAS</h3>
                            <li><a href="#">Para tu Negocio</a></li>
                            <li><a href="#">Aplicaciones Móviles</a></li>
                            <li><a href="#">Soporte</a></li>
                            <li><a href="#">Temas</a></li>
                        </ul>
                                            
                        <ul className="menu">
                            <h3>INFORMACION</h3>
                            <li><a href="#">¿Quienes Somos?</a></li>
                            <li><a href="#">Empleo</a></li>
                            <li><a href="#">Blog</a></li>
                        </ul>
                    
                        <ul className="menu">
                            <h3>MI CUENTA</h3>
                            <li><a href="#">Mi Cuenta</a></li>
                            <li><a href="#">Historial de Pedidos</a></li>
                            <li><a href="#">Lista de Deseos</a></li>
                            <li><a href="#">Newsletter</a></li>
                            <li><a href="#">Sugerencia</a></li>
                        </ul>
                    
                        <ul className="menu">
                            <h3>CONTACTOS</h3>
                            <li><a href="#"><i className="fas fa-map-marker-alt"></i>7 Dream House, Dreammy street, 7131 Dreamville, ARG</a></li>
                            <li><a href="#"><i className="far fa-envelope"></i>digitalshop@gmail.com</a></li>
                            <li><a href="#"><i className="fas fa-phone-alt"></i>123-123-123</a></li>
                            <li><a href="#"><i className="far fa-paper-plane"></i>Dream City, ARG</a></li>
                        </ul>
                        
                    </div>
                </div>
            </footer>

    );
}
 
export default Footer;