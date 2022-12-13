import { useEffect, useState, useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllExercisesService } from "../services";

export const useExercises = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [exercises, setExercises] = useState([]);

  const [type, setType] = useState("");
  const [group, setGroup] = useState("");

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        setLoading(true);

        const data = await getAllExercisesService(type, group, token);

        setExercises(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, [type, group, token]);

  // Event handler del filtro de tipo
  const handleType = useCallback((type) => {
    setType(type);
  }, []);

  // Event handler del filtro de grupo muscular
  const handleGroup = useCallback((group) => {
    setGroup(group);
  }, []);

  const removeExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  const likeExercise = (id, totalLikes, likedByMe) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === id) {
          exercise.likes = totalLikes;
          exercise.likedByMe = likedByMe;
        }

        return exercise;
      })
    );
  };
  const favExercise = (id, favedByMe) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === id) exercise.favedByMe = favedByMe;
        return exercise;
      })
    );
  };

  return {
    loading,
    error,
    exercises,
    removeExercise,

    type,
    group,
    setType,
    setGroup,

    likeExercise,
    favExercise,
  };
};
