/* eslint-disable import/no-anonymous-default-export */
import { 
    REGISTRO_EXITOSO,
    OBTENER_USUARIO,
    LOGIN_EXITOSO, 
    CERRAR_SESION 
   } from '../../type';

export default ( state, action) => {
   switch(action.type) {

       case REGISTRO_EXITOSO:
       case LOGIN_EXITOSO:
           localStorage.setItem('token', action.payload);

           return {
               ...state,
               autenticado: true,
               mensaje: null,
               cargando: false
           }
       
       
       case OBTENER_USUARIO: 
           return {
               ...state,
               autenticado: true,
               usuario: action.payload,
               cargando: false
           }

       case CERRAR_SESION:
           localStorage.removeItem('token');
           return {
               ...state,
               token:null,
               autenticado: null,
               usuario:null,
               mensaje: action.payload,
               cargando: false
           }

       default:
           return state;
   }
}