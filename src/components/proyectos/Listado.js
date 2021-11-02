import React, { useContext, useEffect } from "react";
import UnidadListadoProyectos from "./UnidadDeListado";
import proyectoContext from "../../context/proyectos/proyectoContext";
import alertaContext from "../../context/alertas/alertaContext";

const Listado = () => {
  // Extraer proyectos del state (context) inicial

  const proyectosObjCompleto = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectosObjCompleto;

  const alertContext = useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertContext;

  useEffect(() => {
    if (mensaje) {
      console.log(mensaje);
      mostrarAlerta(mensaje.msg, mensaje.cat);
    }

    obtenerProyectos(proyectos);
    // eslint-disable-next-line
  }, [mensaje]);

  // Hay proyectos?

  if (proyectos.length === 0) return <p>Agrega un proyecto papu</p>;

  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${mensaje.cat}`}>{mensaje.msg}</div>
      ) : null}
      {proyectos.map((proyecto) => (
        <UnidadListadoProyectos key={proyecto._id} proyecto={proyecto} />
      ))}
    </ul>
  );
};

export default Listado;
