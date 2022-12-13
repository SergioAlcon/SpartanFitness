import "./EditExercise.css";

import { useContext, useState } from "react";
import { editExerciseService } from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useExercise } from "../../hooks/useExercise";

export const EditExercise = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { idExercise } = useParams();
  const { exercise, loading, error } = useExercise(idExercise);
  const [editLoading, setLoading] = useState(false);
  const [editError, setError] = useState("");
  const [image, setImage] = useState(null);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData(e.target);
      await editExerciseService({ id: idExercise, data, token });

      e.target.reset();
      setImage(null);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error cargando ejercicio...</p>;

  return (
    <section className="EditExercise">
      <form onSubmit={handleForm}>
        <fieldset>
          <h2>Editar ejercicio</h2>
          {exercise && (
            <>
              <>
                <label htmlFor="text">Nombre</label>
                <input
                  defaultValue={exercise.name}
                  type="text"
                  id="name"
                  name="name"
                  placeholder=""
                  required
                ></input>
              </>
              <>
                <label htmlFor="type">Tipo</label>
                <select name="type" id="type" defaultValue={exercise.type}>
                  <option value="aerobico">Aeróbico</option>
                  <option value="flexibilidad">Flexibilidad</option>
                  <option value="fuerza">Fuerza</option>
                </select>
              </>
              <>
                <label htmlFor="muscle_group">Grupo muscular</label>
                <select
                  name="muscle_group"
                  id="muscle_group"
                  defaultValue={exercise.muscle_group}
                >
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
                  defaultValue={exercise.description}
                  type="text"
                  id="description"
                  name="description"
                  placeholder=""
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
                <ul className="ImageFormat">
                  <li>
                    {exercise.image ? (
                      <div>
                        <p className="TextImage">Actual</p>
                        <img
                          src={`${process.env.REACT_APP_BACKEND}/uploads/${exercise.image}`}
                          alt={exercise.name}
                          style={{ width: "165px" }}
                        />
                      </div>
                    ) : null}
                  </li>

                  <li>
                    {image ? (
                      <figure>
                        <p className="TextImage">Nueva</p>
                        <img
                          src={URL.createObjectURL(image)}
                          style={{ width: "165px" }}
                          alt="Preview"
                        />
                      </figure>
                    ) : null}
                  </li>
                </ul>
              </>
              <button>Enviar ejercicio</button>
            </>
          )}

          {editError ? <p>{error}</p> : null}
          {editLoading ? <p>Publicando ejercicio</p> : null}
        </fieldset>
      </form>
    </section>
  );
};
