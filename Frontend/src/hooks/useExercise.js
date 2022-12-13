import { useEffect, useState } from "react";
import { getSingleExerciseService } from "../services";

export const useExercise = (id) => {
  const [exercise, setExercise] = useState([]); // estaba null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadExercise = async () => {
      try {
        setLoading(true);
        const data = await getSingleExerciseService(id);

        setExercise(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadExercise();
  }, [id]);

  return { exercise, loading, error };
};
