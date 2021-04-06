const BASE_URL = `https://strangers-things.herokuapp.com`;
const COHORT_PATH = `/api/2101-vpi-rm-web-pt`;

export async function getPosts(token) {
  try {
    const response = await fetch(`${BASE_URL + COHORT_PATH}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    const jsonObj = await response.json();
    const {
      data: { posts },
    } = jsonObj;
    return posts;
  } catch (error) {
    console.error(error);
  }
}

export async function createPost(
  token,
  { title, description, price, location }
) {
  try {
    const response = await fetch(`${BASE_URL + COHORT_PATH}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
        },
      }),
    });
    const jsonObj = await response.json();
    const { data, success } = jsonObj;
    console.log("createdPostObj", jsonObj);
    //For now im just returning bool but could also return more in future to render pop Up message
    return success ? true : false;
  } catch (error) {
    console.error(error);
  }
}
