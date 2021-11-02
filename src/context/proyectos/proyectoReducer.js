import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORM_PROYECTO,
    PROYECTO_ACTUAL,
    BORRAR_PROYECTO,
    PROYECTO_ERROR
} from "../../types";

// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {...state, formulario: true };

        case OBTENER_PROYECTOS:
            console.log(action.payload);
            return {
                ...state,
                proyectos: action.payload,
            };
        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false,
                errorForm: false,
            };

        case VALIDAR_FORM_PROYECTO:
            return {...state, errorForm: true };

        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyectoSeleccionado: state.proyectos.filter(
                    (proyecto) => proyecto._id === action.payload
                ),
            };

        case BORRAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(
                    (proyecto) => proyecto._id !== action.payload
                ),
                proyectoSeleccionado: null,
            };

        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            };

        default:
            return state;
    }
};