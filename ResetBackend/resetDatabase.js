/**
 * this function is used to define the original value of all saved parameters for usage of all sites.
 * by executing this function, the database will be restored to its original state.
 *
 * CAUTION: only for testing purpose
 */

setURL("https://timm-eichholz.de/join/smallest_backend_ever-master");

async function init() {
  await downloadFromServer();
  // userObjects = JSON.parse(backend.getItem("userObjects")) || []; // used for login.html, addtask.html
  // categoryObjects = JSON.parse(backend.getItem("categoryObjects")) || []; // used for addtask.html
  // taskObjects = JSON.parse(backend.getItem("taskObjects")) || []; // used for addtask.html
  // listObjects = JSON.parse(backend.getItem("listObjects")) || []; // used for board.html
  // GLOBAL_VARIABLES = JSON.parse(backend.getItem("globalVariables")) || {}; // used for every sites
}

function resetDataBase() {
  // set default users
  let admin = new User(0, "img/profile.png");

  admin.setAdmin();

  let guest = new User(1, "img/profile.png");

  guest.setGuest();

  let userObjects = [admin, guest];
  saveToServer("userObjects", userObjects);

  // reset taskObjects to empty
  let taskObjects = [];
  saveToServer("taskObjects", taskObjects);

  // set default categories
  let categoryObjects = [
    "Development",
    "Sales",
    "Marketing",
    "Product",
    "Engineering",
  ];
  saveToServer("categoryObjects", categoryObjects);

  // set default lists
  let listObjects = [
    new List("todo", "TO DO"),
    new List("progress", "IN PROGRESS"),
    new List("testing", "TESTING"),
    new List("done", "DONE"),
  ];
  saveToServer("listObjects", listObjects);

  let logObjects = [];
  saveToServer("logObjects", logObjects);

  // set initial global variables for ids
  let GLOBAL_VARIABLES = {
    currUserId: 2,
    currListId: 4, // Start with 4, because 0, 1, 2,3 are used for default list objects
    currTaskId: 0,
  };
  saveToServer("globalVariables", GLOBAL_VARIABLES);
}


async function saveToServer(objectName, object) {
  console.log(objectName);
  console.log(object)
  await backend.setItem(objectName, JSON.stringify(object));
}