import "./NewExercise.css";

import { useContext, useState } from "react";
import { sendExerciseService } from "../../services";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const NewExercise = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData(e.target);
      await sendExerciseService({ data, token });

      e.target.reset();
      setImage(null);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="NewExercise">
      <form onSubmit={handleForm}>
        <fieldset>
          <h2>Nuevo ejercicio</h2>
          <>
            <label htmlFor="text">Nombre</label>
            <input type="text" id="name" name="name" required></input>
          </>
          <>
            <label htmlFor="type">Tipo</label>
            <select name="type" id="type">
              <option value="aerobico">Aeróbico</option>
              <option value="flexibilidad">Flexibilidad</option>
              <option value="fuerza">Fuerza</option>
            </select>
          </>
          <>
            <label htmlFor="muscle_group">Grupo muscular</label>
            <select name="muscle_group" id="muscle_group">
              <option value="piernas">Piernas</option>
              <option value="hombros">Hombros</option>
              <option value="brazos">Brazos</option>
              <option value="pecho">Pecho</option>
              <option value="espalda">Espalda</option>
              <option value="abdomen">Abdomen</option>
            </select>
          </>
          <>
            <label htmlFor="description">Descripción</label>
            <input
              type="text"
              id="description"
              name="description"
              required
            ></input>
          </>
          <>
            <label htmlFor="image">Imagen (opcional)</label>
            <input
              type="file"
              name="image"
              id="image"
              accept={"image/*"}
              onChange={(e) => setImage(e.target.files[0])}
            />
            {image ? (
              <figure>
                <img
                  src={URL.createObjectURL(image)}
                  style={{ width: "350px" }}
                  alt="Preview"
                />
              </figure>
            ) : null}
          </>
          <button>Enviar ejercicio</button>

          {error ? <p>{error}</p> : null}
          {loading ? <p>Publicando ejercicio</p> : null}
        </fieldset>
      </form>
    </section>
  );
};
