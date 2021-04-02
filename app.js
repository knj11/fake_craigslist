import { logInRequest } from "./auth.js";
import { loggedInRender, notLoggedInRender, renderCards } from "./render.js";
import { createPost, getPosts } from "./post.js";
import { getUserInfo } from "./user.js";

//const BASE_URL = `https://strangers-things.herokuapp.com`;
//const COHORT_PATH = `/api/2101-vpi-rm-web-pt`;

//creating State Object
let pageState = {
  isLoggedIn: localStorage.token ? true : false,
  token: localStorage.token,
  username: localStorage.username,
  updatePageState: function () {
    this.isLoggedIn = localStorage.token ? true : false;
    this.token = localStorage.token;
    this.username = localStorage.username;
  },
};

//DOM elements we'll be working with
const loginForm = $("#loginForm");
const createPostForm = $("#createPostForm");
const cardGroup = $("#cardGroup");

async function bootStrap() {
  if (pageState.isLoggedIn) {
    loggedInRender();
  } else {
    notLoggedInRender();
  }

  //Regardless of if the user is logged in we want to render all the cragslist post ads
  try {
    const postsArray = await getPosts();
    //we pass the array of post to the render function
    renderCards(postsArray);
  } catch (error) {
    console.error(error);
  }
}

loginForm.submit(async function (event) {
  event.preventDefault();
  const username = loginForm.find("#username").val();
  const password = loginForm.find("#password").val();
  const newUserBool = $("#loginTypeButton").data("newUserBool");

  try {
    await logInRequest({ username, password, newUserBool }).then((logInObj) => {
      if (logInObj) {
        const { data, success, error } = logInObj;
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        pageState.updatePageState();
        loggedInRender();
      }
    });
  } catch (error) {
    console.log(error);
  }
});

createPostForm.submit(async function (event) {
  event.preventDefault();
  const info = {
    title: $("#postTitle").val(),
    description: $("#postDescription").val(),
    price: $("#postPrice").val(),
    location: $("#postLocation").val(),
  };

  try {
    await createPost(pageState.token, info).then((bool) => {
      if (bool) {
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//This button on the user menu renders all posts made by the user
$("#myPosts").on("click", async (event) => {
  try {
    console.log("pageState Token", pageState.token);
    const myPosts = await getUserInfo(pageState.token);

    //empty the cardGroup space
    cardGroup.empty();

    renderCards(myPosts);

    console.log("myPosts", myPosts);
  } catch (error) {
    console.log(error);
  }
});

$("#exitLogin").on("click", (event) => {
  $("#username").val("");
  $("#password").val("");
  $("#formTitle").text("");
  $("#logInWarning").text("");
  $(".loginForm").removeClass("open");
});

$("#exitCreatePost").on("click", (event) => {
  $("#postTitle").val("");
  $("#postDescription").val("");
  $("#postPrice").val("");
  $(".createForm").removeClass("open");
});

bootStrap();
