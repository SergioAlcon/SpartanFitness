import { useState } from "react";
import { Link } from "react-router-dom";
import "./ListExercises.css";

export const ListExercises = ({ exercises }) => {
  const [filter, setFilter] = useState("");

  const filteredExercises = filter
    ? exercises.filter((item) => item.name.includes(filter))
    : exercises;

  if (!exercises || exercises.length === 0) return <p>No hay resultados</p>;
  return (
    <section className="listexercises">
      <input
        type="search"
        placeholder="Busca un ejercicio..."
        onChange={(e) => setFilter(e.target.value)}
      />
      <menu>
        {filteredExercises.map((exercises) => {
          return (
            <li key={exercises.id} onClick={() => {}}>
              <Link className="link" to={`/exercise/${exercises.id}`}>
                <h3>{exercises.name}</h3>
                <ul>
                  <li>
                    <p>
                      {exercises.type} {exercises.muscle_group}
                    </p>
                  </li>
                  <li>
                    <p>
                      {exercises.likes}{" "}
                      {exercises.favedByMe === 1 ? <b> ❤</b> : <>❤</>}
                      {exercises.favedByMe === 1 && <span>⭐</span>}
                    </p>
                  </li>
                </ul>
              </Link>
            </li>
          );
        })}
      </menu>
    </section>
  );
};
