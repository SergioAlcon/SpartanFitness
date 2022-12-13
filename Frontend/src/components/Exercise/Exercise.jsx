import "./Exercise.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import {
  deleteExerciseService,
  favExerciseService,
  likeExerciseService,
} from "../../services";

export const Exercise = ({
  exercises,
  removeExercise,
  likeExercise,
  favExercise,
}) => {
  const { id } = useParams();

  const { token, role } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const selected = exercises.find((exercise) => exercise.id === Number(id));

  const deleteExercise = async (id) => {
    try {
      await deleteExerciseService({ id, token });

      if (removeExercise) {
        removeExercise(id);
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLike = async () => {
    try {
      const { likes, likedByMe } = await likeExerciseService({
        id: selected.id,
        token: token,
      });

      likeExercise(selected.id, likes, likedByMe);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFav = async () => {
    try {
      const { favedByMe } = await favExerciseService({
        id: selected.id,
        token: token,
      });

      favExercise(selected.id, favedByMe);
    } catch (error) {
      setError(error.message);
    }
  };

  return selected ? (
    <output>
      <h2>{selected.name}</h2>
      <h3>Tipo: {selected.type}</h3>
      <h3>Grupo muscular: {selected.muscle_group}</h3>
      <p>{selected.description} </p>
      {selected.image ? (
        <img
          src={`${process.env.REACT_APP_BACKEND}/uploads/${selected.image}`}
          alt={selected.description}
        ></img>
      ) : null}
      <p>Creado el {new Date(selected.createdAt).toLocaleString()}</p>

      <p>Gusta a {selected.likes} personas.</p>
      <section>
        {role === "normal" && likeExercise && (
          <button onClick={handleLike} className="buttonlike">
            {selected.likedByMe ? "No me gusta" : "Me gusta"}
          </button>
        )}

        {role === "normal" && favExercise && (
          <button onClick={handleFav} className="buttonfav">
            {selected.favedByMe ? "Quitar de favoritos" : "Añadir a favoritos"}
          </button>
        )}

        {role === "admin" ? (
          <Link to={`/exercises/${selected.id}/edit`}>
            <button className="buttonExer">Modificar</button>
          </Link>
        ) : null}

        {role === "admin" ? (
          <button
            onClick={() => {
              if (window.confirm("¿Estás seguro?")) deleteExercise(selected.id);
            }}
            className="buttonExer"
          >
            Borrar
          </button>
        ) : null}

        {error ? <p>{error}</p> : null}
      </section>
    </output>
  ) : (
    <p>Por favor elige un ejercicio</p>
  );
};
