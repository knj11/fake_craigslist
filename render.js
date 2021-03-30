export function loggedInRender() {
  const userName = localStorage.getItem("username");
  $(".userInfo").empty();
  $(".userInfo").html(`
    <a href="#" class="nav-item" id="logOut">Log Out</a>
    <div class="nav-item">
      <span id="userName"></span>
      <i class="fas fa-user"></i>
    </div>
  `);
  $("#userName").text(userName);
  $(".loginForm").removeClass("open");

  //adding click handlers
  $("#logOut").on("click", (event) => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    location.reload();
  });
}

export function notLoggedInRender() {
  $(".userInfo").empty();
  $(".userInfo").html(`
    <a class="nav-item" id="signUp" href="#">Sign up</a>
    <a class="nav-item" id="logIn" href="#">Login</a>
  `);

  //Adding Click handlers
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
}
