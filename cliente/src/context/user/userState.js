import React, { useReducer } from 'react';
import UserContext from './userContext';
import UserReducer from './userReducer';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';


import { 
    OBTENER_USUARIOS,
    ELIMINAR_USUARIO,
    ASIGNAR_ROL
   } from '../../type';


const UserState = props => {

    const inicialState = {
        usuarios: [],
    }

    const [ state, dispatch ] =  useReducer(UserReducer, inicialState);

    // Retorna el usuario autenticado
    const getAllUsers = async () => {
   
        try {
            const respuesta = await axiosClient.get('/user');
            console.log(respuesta.data.users);
            dispatch({
                type: OBTENER_USUARIOS,
                payload: respuesta.data.users
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

    const deleteUser = ( userId ) => {
        
        Swal.fire({
            title: 'Estas Seguro?',
            text: "Una vez eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminalo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const respuesta = axiosClient.delete(`/user/${userId}`);
                    console.log(respuesta);  

                    dispatch({
                        type: ELIMINAR_USUARIO,
                        payload: userId
                    })

                    Swal.fire(
                        'Eliminado!',
                        'El usuario fue eliminado.',
                        'success'
                    )
                }
            }).catch( err => console.log(err));
    }

    const assignRole = async ( uid ,rol) => {
        const ROL = {
            rol
        }
        try {        
            await axiosClient.put(`/user/rol/${uid}`, ROL);
        
            dispatch({
                type:  ASIGNAR_ROL,
                payload:{
                    uid,
                    rol:ROL.rol
                } 
            });

            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: 'Se ejecuto correctamente',
              })

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error'
            })
        }
    }



    return(
        <UserContext.Provider
            value={{
                usuarios: state.usuarios,
                getAllUsers,
                deleteUser,
                assignRole 
            }}
        >
            {props.children}
        </UserContext.Provider>
    )


}

export default UserState;