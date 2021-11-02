import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //Obtener el state Bool de form
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorForm,
    mostrarForm,
    agregaProyecto,
    mostrarErrorForm,
  } = proyectosContext;

  //State para proyecto

  const [proyecto, setProyecto] = useState({
    nombre: "",
  });

  const { nombre } = proyecto;

  const onChangeProyecto = (e) => {
    setProyecto({ ...proyecto, [e.target.name]: e.target.value });
  };

  const onSubmitProyecto = (e) => {
    e.preventDefault();

    if (nombre.trim() === "") {
      mostrarErrorForm();
      return;
    }

    agregaProyecto(proyecto);
    setProyecto({ nombre: "" });
  };

  return (
    <Fragment>
      <button
        className="btn btn-block btn-primario"
        type="button"
        onClick={() => mostrarForm()}
      >
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            onChange={onChangeProyecto}
            value={nombre}
          />

          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar proyecto"
          />
        </form>
      ) : null}
      {errorForm ? (
        <p className="mensaje error">El nombre del proyecto es obligatorio!!</p>
      ) : null}
    </Fragment>
  );
};

export default NuevoProyecto;
