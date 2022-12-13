import "./RegisterPage.css";

import { useState } from "react";
import { registerUserService } from "../../services";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    if (pass1 !== pass2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await registerUserService({ username, email, password: pass1 });
      navigate("/users/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="RegisterPage">
      <form onSubmit={handleForm}>
        <fieldset>
          <h2>Regístrate</h2>
          <>
            <label htmlFor="text">Nombre de usuario</label>
            <input
              type="name"
              name="name"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </>
          <>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
          <>
            <label htmlFor="pass1">Contraseña</label>
            <input
              type="password"
              id="pass1"
              name="pass1"
              value={pass1}
              required
              onChange={(e) => setPass1(e.target.value)}
            />
          </>
          <>
            <label htmlFor="pass2">Repite tu contraseña</label>
            <input
              type="password"
              id="pass2"
              name="pass2"
              value={pass2}
              required
              onChange={(e) => setPass2(e.target.value)}
            />
          </>
          <button>Regístrate</button>

          {error ? <p>{error}</p> : null}
        </fieldset>
      </form>
    </section>
  );
};
