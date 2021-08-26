import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const RutaPrivada = ({ component: Component, ...props  }) => {

    const authContext = useContext(AuthContext);
    const { usuario, autenticado } = authContext;

    return ( 
        <Route { ...props } render={ props => (!(usuario && usuario.rol === "ADMIN_ROLE") || !autenticado) ?  (
            // Si no es admin , lo redireccionamos
            <Redirect to="/" />
        )  : (
            // Si es admin lo enviamos al componente
            <Component {...props} />
        ) } />

     );
}
 
export default RutaPrivada;