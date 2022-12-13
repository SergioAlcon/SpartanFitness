import "./HomePage.css";

import { Exercise } from "../../components/Exercise/Exercise";
import { ListExercises } from "../../components/ListExercises/ListExercises";
import { Search } from "../../components/Search/Search";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Loading } from "../../components/Loading/Loading";
import { useExercises } from "../../hooks/useExercises";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Route, Routes } from "react-router-dom";

export const HomePage = () => {
  const {
    loading,
    error,
    exercises,

    selectExercise,
    removeExercise,

    likeExercise,
    favExercise,
    type,
    group,
    setType,
    setGroup,
  } = useExercises();

  const { role } = useContext(AuthContext);
  const usuarioConectado = role === "normal" || role === "admin";

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return usuarioConectado ? (
    <section className="HomePage">
      <Search type={type} group={group} setType={setType} setGroup={setGroup} />

      <ListExercises
        exercises={exercises}
        selectExercise={selectExercise}
      ></ListExercises>

      <Routes>
        <Route
          path="/exercise/:id"
          element={
            <Exercise
              exercises={exercises}
              removeExercise={removeExercise}
              likeExercise={likeExercise}
              favExercise={favExercise}
            />
          }
        />
      </Routes>
    </section>
  ) : (
    <section className="HomeErrorLogin">
      <h2>Inicia sesión o regístrate para ver el listado de ejercicios</h2>
    </section>
  );
};
