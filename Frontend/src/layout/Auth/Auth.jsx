import "./Auth.css";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Auth = () => {
  const { user, logout, role } = useContext(AuthContext);

  return user ? (
    <section className="loginSection">
      {role === "admin" ? (
        <Link to={"/exercises"}>
          <button className="newExercise">Nuevo</button>
        </Link>
      ) : null}
      Conectado como
      <div> {user.username} </div>
      <button onClick={() => logout()} className="authButtons">
        Cerrar sesión
      </button>
    </section>
  ) : (
    <nav className="logRegNav">
      <li>
        <Link to={"/users/register"}>
          <button className="authButtons">Regístrate</button>
        </Link>
      </li>
      <li>
        <Link to={"/users/login"}>
          <button className="authButtons">Iniciar Sesión</button>
        </Link>
      </li>
    </nav>
  );
};
