import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import alertaContext from "../../context/alertas/alertaContext";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  const alertContext = useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertContext;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  // En caso de que el pass o user no existan

  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.cat);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que no hayan campos vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Ingresa tu email y contraseña", "alerta-error");
    }

    // Pasarlo al action
    iniciarSesion({ email, password });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.cat}`}>{alerta.mensaje}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1> Iniciar Sesión</h1>

        <form onSubmit={handleSubmit}>
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
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>
        <Link
          to={"/nueva-cuenta"}
          className="enlace-cuenta btn btn-primario btn-block"
        >
          Obten una cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
