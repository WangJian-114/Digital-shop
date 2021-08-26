import React,{useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import { 
    REGISTRO_EXITOSO ,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    CERRAR_SESION 
   } from '../../type';



const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Las funciones

    const registerUser = async datos => {

        datos.rol = "USER_ROLE";

        try {
            const respuesta = await clientAxios.post('user', datos);
            // console.log(respuesta.data.token)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.token
            });

            // Una vez creado la cuenta obtenemos el usuario
            authenticatedUser();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Bienvenido a Digital Shop',
                showConfirmButton: false,
                timer: 2500
              })
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.msg
            })
        }
    }

    // Retorna el usuario autenticado
    const authenticatedUser = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
            try {
                const respuesta = await clientAxios.get('auth/user');
                // console.log(respuesta)
                dispatch({
                    type: OBTENER_USUARIO,
                    payload: respuesta.data.usuario
                });
    
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.msg
                })
            }
        } else {
            return
        }
    }

    // Cuando el usuario inicia sesión
    const logIn = async ( data ) => {

        try {
            const response = await clientAxios.post('auth/login', data);

            dispatch({
                type: LOGIN_EXITOSO,
                payload: response.data.token
            });

            authenticatedUser();
    
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Bienvenido a Pet Shop',
                showConfirmButton: false,
                timer: 1000
            });
            
        } catch (error) {
            console.log(error.response.data.msg);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.msg
            })
        }

    }

    // Cierra la sesion del usuario
    const signOut = () => {
        dispatch({
            type:CERRAR_SESION
        })
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Nos vemos! esperamos volver a verte en pronto!',
            showConfirmButton: false,
            timer: 2500
        })
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registerUser,
                logIn,
                authenticatedUser,
                signOut 
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState;