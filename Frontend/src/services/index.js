import axios from "axios";

export const getAllExercisesService = async (
  type = "",
  muscle_group = "",
  token
) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND}/exercises?type=${type}&muscle_group=${muscle_group}`,
      {
        headers: token ? { Authorization: token } : {},
      }
    );

    return data.data;
  } catch (err) {
    console.error(err);
  }
};

export const getSingleExerciseService = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND}/exercises/${id}`
    );
    console.log(data.data);
    return data.data;
  } catch (err) {
    console.error(err);
  }
};

export const registerUserService = async ({ username, email, password }) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

export const getMyDataService = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const getUserDataService = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/users/${id}`);

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const logInUserService = async ({ email, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/users/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const sendExerciseService = async ({ data, token }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/exercises`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const editExerciseService = async ({ id, data, token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/exercises/${id}/edit`,
    {
      method: "PUT",
      body: data,
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const deleteExerciseService = async ({ id, token }) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND}/exercises/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response;
  } catch (err) {
    console.error(err);
  }
};

export const favExerciseService = async ({ id, token }) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/exercises/${id}/favs`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

export const likeExerciseService = async ({ id, token }) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/exercises/${id}/likes`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};
