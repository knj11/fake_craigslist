const BASE_URL = `https://strangers-things.herokuapp.com`;
const COHORT_PATH = `/api/2101-vpi-rm-web-pt`;

export async function getUserInfo(token) {
  try {
    const response = await fetch(`${BASE_URL + COHORT_PATH}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonObj = await response.json();
    console.log("userInfoObj", jsonObj);
    const {
      data: { posts },
    } = jsonObj;
    return posts;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUserPost(token, id) {
  try {
    const response = await fetch(`${BASE_URL + COHORT_PATH}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonObj = await response.json();
    console.log("userInfoObj", jsonObj);
    return;
  } catch (error) {
    console.log(error);
    return;
  }
}
