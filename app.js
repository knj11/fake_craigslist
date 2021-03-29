import { logInRequest } from "./auth.js";
import { loggedInRender } from "./render.js";

//const BASE_URL = `https://strangers-things.herokuapp.com`;
//const COHORT_PATH = `/api/2101-vpi-rm-web-pt`;

//class notes
const form = $("form");

form.submit(async function (event) {
  event.preventDefault();
  const username = form.find("#username").val();
  const password = form.find("#password").val();
  const newUserBool = $("form button").data("newUserBool");

  try {
    await logInRequest({ username, password, newUserBool }).then(() => loggedInRender());
  } catch (error) {
    console.log(error);
  }
});

$("#signUp").on("click", (event) => {
  $("#formTitle").text("Sign-up Form");
  $("form button").data("newUserBool", true);
  $(".loginForm").addClass("open");
});

$("#logIn").on("click", (event) => {
  $("#formTitle").text("Login Form");
  $("form button").data("newUserBool", false);
  $(".loginForm").addClass("open");
});

$("#exit").on("click", (event) => {
  $("#username").val("");
  $("#password").val("");
  $("#formTitle").text("");
  $(".loginForm").removeClass("open");
});
