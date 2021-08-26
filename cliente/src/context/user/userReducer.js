import { 
    OBTENER_USUARIOS,
    ELIMINAR_USUARIO,
    ASIGNAR_ROL
   } from '../../type';

// eslint-disable-next-line import/no-anonymous-default-export
export default ( state, action) => {
   switch(action.type) {
            
        case OBTENER_USUARIOS: 
            return {
                ...state,
                usuarios: action.payload
            }

        case ELIMINAR_USUARIO :
            return {
                ...state,
                usuarios: state.usuarios.filter(usuario => usuario.uid !== action.payload),
            }

        case ASIGNAR_ROL :
            return {
                ...state,
                usuarios : state.usuarios.map( usuario => {
                    if( usuario.uid === action.payload.uid){
                        usuario.rol = action.payload.rol
                        return usuario; 
                    } else{
                        return usuario;
                    }
 
                })
            }
        

       default:
           return state;
   }
}