import React from "react";
import NuevoProyecto from "../proyectos/NuevoProyecto";
import Listado from "../proyectos/Listado";

const SideBar = () => {
  return (
    <aside>
      <h1>
        MERN<span>Tasks</span>
      </h1>
      <NuevoProyecto />
      <div className="proyectos">
        <h2>Tus proyectos</h2>
        <Listado />
      </div>
    </aside>
  );
};

export default SideBar;
