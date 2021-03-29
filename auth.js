const BASE_URL = `https://strangers-things.herokuapp.com`;
const COHORT_PATH = `/api/2101-vpi-rm-web-pt`;

export async function logInRequest({ username, password, newUserBool }) {
  const logInType = newUserBool ? "register" : "login";
  try {
    const response = await fetch(
      `${BASE_URL + COHORT_PATH}/users/${logInType}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username,
            password,
          },
        }),
      }
    );
    const jsonObj = await response.json();
    const { data, success, error } = jsonObj;

    if (success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      return jsonObj;
    } else {
      console.log(error.name);
      console.log(error.message);
      return jsonObj;
    }
  } catch (error) {
    console.log(error);
  }
}
