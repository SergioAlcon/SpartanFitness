import { Routes, Route } from "react-router-dom";

import { HomePage } from "../pages/HomePage/HomePage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { NewExercise } from "../components/NewExercise/NewExercise";
import { EditExercise } from "../components/EditExercise/EditExercise";

export const SpartanRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<HomePage />} />
      <Route path="/users/register" element={<RegisterPage />} />
      <Route path="/users/login" element={<LoginPage />} />
      <Route path="/exercises" element={<NewExercise />} />
      <Route path="/exercises/:idExercise/edit" element={<EditExercise />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
