const BASE_URL = `https://strangers-things.herokuapp.com`;
const COHORT_PATH = `/api/2101-vpi-rm-web-pt`;

export async function getPosts() {
  try {
    const response = await fetch(`${BASE_URL + COHORT_PATH}/posts`);
    const jsonObj = await response.json();
    const {data: {posts}} = jsonObj
    return posts;
  } catch (error) {
    console.error(error);
  }
}
