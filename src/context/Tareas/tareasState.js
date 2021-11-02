import React, { useReducer } from "react";
import TareasContext from "./tareasContext";
import tareasReducer from "./tareasReducer";
import clienteAxios from "../../config/axios";
import {
  OBTENER_TAREAS,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  UPDATE_TAREA,
  LIMPIAR_TAREA,
} from "../../types";

const TareaState = (props) => {
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionadaEdit: null,
  };

  // Crear dispatch y state => Hook: useReducer
  const [state, dispatch] = useReducer(tareasReducer, initialState);

  const obtenerTareas = async (proyecto) => {
    try {
      const resultado = await clienteAxios.get("/api/tareas", {
        params: { proyecto },
      });

      dispatch({
        type: OBTENER_TAREAS,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const agregarTarea = async (tarea) => {
    try {
      // eslint-disable-next-line
      const resultado = await clienteAxios.post("/api/tareas", tarea);

      dispatch({ type: AGREGAR_TAREA, payload: tarea });
    } catch (error) {
      console.log(error);
    }
  };

  // Valida y muestra error si es necesario

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, {
        params: { proyecto },
      });

      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Extrae tarea para edición

  const tareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  // Editar tarea

  const updateTarea = async (tarea) => {
    try {
      console.log(tarea._id);
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );

      dispatch({
        type: UPDATE_TAREA,
        payload: resultado.data.tarea,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  // Limpiar formulario luego de selec tarea

  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };

  return (
    <TareasContext.Provider
      value={{
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionadaEdit: state.tareaSeleccionadaEdit,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        tareaActual,
        updateTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </TareasContext.Provider>
  );
};

export default TareaState;
