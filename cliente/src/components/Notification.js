import React from 'react';

const Notificacion = ({ cantidades }) => {
    return ( 
        
        <div className="notificacion" >
            {cantidades ? <p>{cantidades}</p> : null}
            
        </div>
    );
}
 
export default Notificacion;