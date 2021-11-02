import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import alertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/auth/authContext";

const NuevaCuenta = (props) => {
  // Extraer valores del contextAlerta

  const alertaDeContext = useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertaDeContext;

  // Valores del authContext
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  // En caso de que el usuario se hay autenticado o registrado o reg duplicado

  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.cat);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  const [user, setUser] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const { nombre, email, password, confirmar } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Que no hayan campos vacíos

    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    // Password minimo de 6 caracteres

    if (password.length < 6) {
      mostrarAlerta(
        "El password debe ser mínimo de 6 caracteres",
        "alerta-error"
      );
      return;
    }

    // Passwords iguales

    if (password !== confirmar) {
      mostrarAlerta("Las contraseñas no coinciden", "alerta-error");
      return;
    }

    // Pasarlo al action
    registrarUsuario({
      nombre,
      email,
      password,
    });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.cat}`}>{alerta.mensaje}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Crea tu cuenta</h1>

        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              placeholder="Juan Perez"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="email@email.com"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password123"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Repite tu password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="password123"
              value={confirmar}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarse"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta btn btn-primario btn-block">
          Volver a iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
