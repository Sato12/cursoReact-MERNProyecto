import React, { useReducer } from "react";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import clienteAxios from "../../config/axios";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORM_PROYECTO,
  PROYECTO_ACTUAL,
  BORRAR_PROYECTO,
  PROYECTO_ERROR,
} from "../../types";

const ProyectoState = (props) => {
  const initialState = {
    formulario: false,
    proyectos: [],
    errorForm: false,
    proyectoSeleccionado: null,
    mensaje: null,
  };

  // const proyectos = [
  //   { id: 1, nombre: "Tienda virutal" },
  //   { id: 2, nombre: "intranet" },
  //   { id: 3, nombre: "Diseño de sitio web papu" },
  //   { id: 4, nombre: "Abrir mi propio PodCast" },
  // ];

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  // Serie de funciones para el CRUD

  const mostrarForm = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/proyectos");

      dispatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        msg: "Hubo un error",
        cat: "alerta-error",
      };

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  const agregaProyecto = async (proyecto) => {
    try {
      const resultado = await clienteAxios.post("/api/proyectos", proyecto);
      console.log(resultado);

      // Insertar proyecto en el state

      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        msg: "Hubo un error",
        cat: "alerta-error",
      };

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  const mostrarErrorForm = () => {
    dispatch({
      type: VALIDAR_FORM_PROYECTO,
    });
  };

  const seleccionarProyectoActual = (proyectoID) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoID,
    });
  };

  const borrarProyectoSeleccionado = async (proyectoID) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoID}`);

      dispatch({
        type: BORRAR_PROYECTO,
        payload: proyectoID,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        msg: "Hubo un error",
        cat: "alerta-error",
      };

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };
  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorForm: state.errorForm,
        proyectoSeleccionado: state.proyectoSeleccionado,
        mensaje: state.mensaje,
        mostrarForm,
        obtenerProyectos,
        agregaProyecto,
        mostrarErrorForm,
        seleccionarProyectoActual,
        borrarProyectoSeleccionado,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
