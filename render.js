export function loggedInRender() {
  const userName = localStorage.getItem("username");
  //Add the logged in User links
  $("#userMenu").removeClass("d-none");

  //Remove the links for Login
  $("#signUp").addClass("d-none");
  $("#logIn").addClass("d-none");

  $("#user").text(userName);
  $(".loginForm").removeClass("open");

  //adding click handlers
  $("#logOut").on("click", (event) => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    location.reload();
  });

  $("#createPost").on("click", (event) => {
    $(".createForm").addClass("open");
  });
}

export function notLoggedInRender() {
  //clear out the UserMenu Dropdown in the nav bar
  $("#userMenu").addClass("d-none");

  //Adding Click handlers
  $("#signUp").on("click", (event) => {
    $("#loginTypeTitle").text("Sign-up Form");
    $("#loginTypeButton").data("newUserBool", true);
    $("#loginTypeButton").text("Sign Up");
    $(".loginForm").addClass("open");
  });

  $("#logIn").on("click", (event) => {
    $("#loginTypeTitle").text("Login Form");
    $("#loginTypeButton").data("newUserBool", false);
    $("#loginTypeButton").text("Sign In");
    $(".loginForm").addClass("open");
  });
}

function getHtmlCard(post, isMyPostPage) {
  let div = $(`
    <div class="card m-3">
      <div class="card-header">
        <h4 class="card-title">${post.title}</h4>
        <p>User: ${post.author.username}</p>
        <p>Location: ${post.location}</p>
      </div>
      <div class="card-body">
        <p class="card-text">${post.description}</p>
        <p>Price: ${post.price}</p>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-between">
          ${
            post.active && (post.isAuthor || isMyPostPage)
              ? `<button type="button" class="btn btn-danger deletePost">Delete</button>` +
                `<button type="button" class="btn btn-info editPost">Edit</button>`
              : ``
          }
          ${post.active ? "" : "Post has been deleted"}
          ${
            ((post.active && !post.isAuthor) && !isMyPostPage)
              ? `<button type="button" class="btn btn-info messageUser">Message</button>`
              : ""
          }
        </div>
      </div>
    </div>
  `);

  div.data("postId", post._id);
  return div;
}

export function renderCards(cardArray, isMyPostPage) {
  //function only takes an Array
  cardArray.forEach((element) =>
    $("#cardGroup").append(getHtmlCard(element, isMyPostPage))
  );
}
