export function loggedInRender() {
  const userName = localStorage.getItem("username");
  $("#signUp").remove();
  $("#logIn").remove();
  $("#userName").text(userName);
  $(".userInfo").addClass("loggedIn");
  $(".loginForm").removeClass("open");
}