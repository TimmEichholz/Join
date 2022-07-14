let newLog = taskObjects[4]

/**
 * Data interface between server and backLogs.html
 * required global parameter is taskObjects[]
 */

function loadLogs() {
  document.getElementById("load-logs").innerHTML = "";

  /**
   * this function is to load BackLogs Array from task objects from server
   * 
   * why the setTimeout? why not an async?
   */
  setTimeout(() => {

    // for (let i = logObjects.length; i > 0; i--) {
    //   let LogElement = logObjects[i-1];
    //   loadLogElement(LogElement);

    // }

    taskObjects.forEach((e) => {
      if (e.taskStatus === "backlog") {
        loadLogElement(e)
      }
    })


  }, 200);
}

function loadLogElement(newLog) {
  /**
   * this function is to load html code for single backlog record.
   * it needs to be adapted to the backlog.html design
   */
  let loadElement = document.getElementById("load-logs");
  let string = ""
  string += loadLogElementleftSide(newLog)
  string += loadLogElementAssignedTo(newLog)
  string += loadLogElementrightSide(newLog)

  loadElement.innerHTML += string





}

function loadLogElementleftSide(newLog) {

  return ` 

<div class=" backlog-container row mb-3 align-items-center urgent-border urgent1">
  <div class="col-1 btn-to-board" onclick="intoBoard(${newLog.taskId})">to Board</div>
  <div class="col-2">${newLog.taskTitle}</div>
  <div class="col-2">Operator</div>
  <div class="col-3 assigned-col">

    

    
    

  
  `
}
function loadLogElementAssignedTo(e) {

  let assignedTo = ``;

  for (let index = 0; index < e.taskAsignedTo.length; index++) {
    const element = e.taskAsignedTo[index];
    let id = getIndexOf(userObjects, "userId", element)
    let user = userObjects[id]

    assignedTo += `
  <div class="col-12 row align-items-center mt-1 mb-1">
  <img class=" height35px  d-inline-block rounded-circle" src="${user.userProfileAvatar}" alt="">
  <div class="col-9 h-100 align-txt ">
    <div class="row h-100 align-txt pd-12 h-25">${user.userName}</div>
    <div class="row h-100 align-txt h-25"><a href="guest@guest.com">${user.userEmail}</a></div>
  </div>
</div>`
  }
  return assignedTo
}

function loadLogElementrightSide(newLog) {

  console.log("newlog" ,newLog);
  switch (+newLog.taskCategory) {
    case 0: category = "Development"; break;
    case 1: category = "Sales"; break;
    case 2: category = "Marketing"; break;
    case 3: category = "Product"; break;
    case 4: category = "Engineering";
  }

  return ` 
  </div>
  <div class="col-2">${category}</div>
  <div class="col-2">${newLog.taskDescription}</div>
</div>`;
}

function intoBoard(id){

taskObjects[getIndexOf(taskObjects, "taskId", id)].taskStatus = "todo"
saveToServer("taskObjects", taskObjects);
loadLogs()
}
