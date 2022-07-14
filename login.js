let loginUser = {
  userId: -1,
  userName: "",
  userPassword: "",
};
var formData;

let selectedAvatar = "/img/profile.png";

function guestLogin() {
  loginUser.userName = "guest";
  loginUser.userPassword = "guest";
  setUserCookie();
  checkLogin();
}

function userLogin(e) {
  e.preventDefault();

  let loginData = document.getElementById("input-login");
  formData = new FormData(loginData);

  dataFromLogin(formData);
  setUserCookie();
  checkLogin();
}

function dataFromLogin(formData) {
  loginUser.userName = formData.get("userName");
  loginUser.userPassword = formData.get("userPassword");
}
function setUserCookie() {
  document.cookie = "user=" + loginUser.userName + "; path=/";
}

//

function checkLogin() {
  if (checkUserAndPassword() === true && checkPassword() === true) {
    window.open("board.html", "_self");
  } else {
    alert("wrong Username or Password");
  }
}

function checkPassword() {
  for (let i = 0; i < userObjects.length; i++) {
    if (
      userObjects[i]["userName"] == loginUser.userName &&
      userObjects[i]["userPassword"] == loginUser.userPassword
    ) {
      loginUser.userPassword = "";
      loginUser.userId = i;
      console.log("check Password true");
      return true;
    }
  }
  loginUser.userPassword = "";
  return false;
}

/**
 * Data interface between server and Login.html
 * @param {*} e
 */

async function createNewUser(e) {
  e.preventDefault();

  // get input data from the form
  let inputForm = document.getElementById("input-user");
  var formData = new FormData(inputForm);

  // create new user
  let newUser = new User(GLOBAL_VARIABLES.currUserId, selectedAvatar);
  newUser.dataFromInput(formData);

  if (
    checkForDouble(userObjects, "userName", newUser.userName) === true ||
    checkForDouble(userObjects, "userEmail", newUser.userEmail) === true
  ) {
    alert("This Username or Email adresse has already been used!");
  } else {
    userObjects.push(newUser);
    GLOBAL_VARIABLES.currUserId++;
    dataFromLogin(formData);
    // update data on server
    await saveToServer("userObjects", userObjects);
    await saveToServer("globalVariables", GLOBAL_VARIABLES);
    setUserCookie();
    alert("the User " + loginUser.userName + " was created successfully");
    window.open('/join/board.html', '_self');
    
  }

  // add new task to existing tasks
}

function checkForDouble(array, reference, searchcriteria) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][reference] == searchcriteria) {
      return true;
    }
  }
}

function logout() {
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function selectAvatar(index) {
  let avatar = ["avatar1.jpg", "avatar2.png", "avatar3.png", "avatar4.png"];

  let selected = document.getElementById("user-avatar");

  selected.src = "img/" + avatar[index];

  selectedAvatar = "img/" + avatar[index];
}
