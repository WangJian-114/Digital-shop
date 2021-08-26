import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../type';

// eslint-disable-next-line import/no-anonymous-default-export
export default ( state, action) => {
    switch(action.type) {

        case MOSTRAR_ALERTA: 
            return {
                alert: action.payload
            }

        case OCULTAR_ALERTA: 
            return {
                alert: null
            }

        default:
            return state;
    }
}