import React, { useReducer } from 'react';
import alertaReducer from './alertReducer';
import alertaContext from './alertContext';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../type';

const AlertState = props => {

    const initialState = {
        alert: null
    }

    const [ state, dispatch ] =  useReducer (alertaReducer, initialState);

    // Funciones
    const showAlert = (msg, category) =>{
        dispatch({
            type: MOSTRAR_ALERTA,
            payload :{
                msg,
                category
            }
        });
        
        // Despues de 5 segundos limpiar la alerta
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
            
        }, 5000);
    }

    return(
        <alertaContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}
        >
            {props.children}
        </alertaContext.Provider>
    
    )
}


export default AlertState;