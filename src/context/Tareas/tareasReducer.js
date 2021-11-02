import {
    OBTENER_TAREAS,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    UPDATE_TAREA,
    LIMPIAR_TAREA
} from "../../types";

// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case OBTENER_TAREAS:
            console.log(action.payload);
            return {
                ...state,
                tareasProyecto: action.payload
            };

        case AGREGAR_TAREA:
            return {
                ...state,
                tareasProyecto: [action.payload, ...state.tareasProyecto],
                errorTarea: false,
            };

        case VALIDAR_TAREA:
            return {
                ...state,
                errorTarea: true,
            }

        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.filter(tarea => (tarea._id !== action.payload))
            }

        case UPDATE_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea)
            }

        case TAREA_ACTUAL:
            return {
                ...state,
                tareaSeleccionadaEdit: action.payload
            }

        case LIMPIAR_TAREA:
            return {
                ...state,
                tareaSeleccionadaEdit: null,
            }

        default:
            return state
    }
};