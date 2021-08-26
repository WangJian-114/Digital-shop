import React from 'react';

const Alert = ({ mensaje }) => {
    return ( 
        <div className="alerta alerta-error"> {mensaje} </div>
    );
}
 
export default Alert;