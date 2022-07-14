/**
 * 
 */
let dropId;
let currentId;

/**
 * 
 */
async function boardInit() {
    await init();
    loadBoardsanew();
}

/**
 * 
 */
function loadBoardsanew() {
    loadListsToBoard();
    for (let i = 0; i < taskObjects.length; i++) {
        writeTasks(i);
    }
}

/**
 * class Task{
    taskId;
    taskTitle;
    taskCategory;
    taskDescription;
    taskDueDate;
    taskUrgency;
    taskAsignedTo = [];
    listId = 0;
    createdBy = 'admin';
    lastUpDate;
 * 
 * loads the tasks into the different columns
 * @param {} id allTasks object
 */
function writeTasks(id) {
    document.getElementById(taskObjects[id]['taskStatus']).innerHTML += taskPart1(id) + taskPartAssignedTo(id)
}

function taskPart1(id) {
    return `<div id="id${taskObjects[id]['taskId']}" class="board-entry " data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fillModal(${id}) " draggable="true" ondragstart="drag(event, ${id} )" ondrop="return false;" ondragover="noAllowDrop(event)">
        <div class="${taskObjects[id]['taskCategory']}">
           <div class="d-flex justify-content-between w-100"> 
                <span class="board-date">${taskObjects[id]['taskDueDate']}</span> 
                <div class="board-urgency-point ${urgencyColor[taskObjects[id]['taskUrgency']]}"></div></div>
            <h4 class="board-text-short">${taskObjects[id]['taskTitle']}</h4>
            <p class="board-text-short">${taskObjects[id]['taskDescription']}</p>
            <div class="d-flex  board-task-footer">
                <div class="category">${categoryObjects[taskObjects[id]['taskCategory']]}</div> <div class="board-avatar-container">         `
}
/**
 * 
 * @param {Number} id goes through taskAsignedTo and loads all of them   
 * @returns 
 */
function taskPartAssignedTo(id) {
    let assignedTo = '';
    for (let i = 0; i < taskObjects[id]['taskAsignedTo'].length; i++) {
        assignedTo += `<img class="avatar" src=${[userObjects[taskObjects[id]['taskAsignedTo'][i]]['userProfileAvatar']]}                   alt=${userObjects[taskObjects[id]['taskAsignedTo'][i]]['userName']}></img>
        
    `
    }
    assignedTo += `</div></div>
    </div>
</div>`
    return assignedTo;
}





/**
 * fills the Modal after it is opened
 * @param {Object} id allTasks object
 */
function fillModal(id) {
    removeOldModalData()
    let urgency = urgencyPicker(taskObjects[id])
    let modalFooter = document.getElementById('board-modal-footer');
    currentId = id;
    //modalFooter.innerHTML = "";


     document.getElementById('modal-dueto').innerHTML = "Due to Date: " + taskObjects[id]['taskDueDate']
     //document.getElementById('modal-lastUpdate').innerHTML = "last Update: " + taskObjects[id]['lastUpDate']
     document.getElementById('modal-urgency').classList.add(urgency)
     document.getElementById('modal-urgency').innerHTML = "Urgency: " + urgency

     document.getElementById('modal-id').value = taskObjects[id]['taskId'];
     document.getElementById('input-task-title').value = taskObjects[id]['taskTitle'];
     document.getElementById('input-task-description').innerHTML = taskObjects[id]['taskDescription'];
    // document.getElementById('modal-category').innerHTML = categoryObjects[taskObjects[id]['taskCategory']];

    for (let i = 0; i < taskObjects[id]['taskAsignedTo'].length; i++) {
         let modalAvatar = document.getElementById('modal-avatar');
       //  modalAvatar.src = userObjects[taskObjects[id]['taskAsignedTo'][i]]['userProfileAvatar'];
    
         modalFooter.innerHTML += `<div class="d-flex flex-column align-items-center p-1">
     <img  class="avatar" src=${userObjects[taskObjects[id]['taskAsignedTo'][i]]['userProfileAvatar']} alt=${userObjects[taskObjects[id]['taskAsignedTo'][i]]['userName']} />
     <span >${userObjects[taskObjects[id]['taskAsignedTo'][i]]['userName']}</span><div>`

         document.getElementById('modal-category').innerHTML = categoryObjects[taskObjects[2]["taskCategory"]]
         //classList.add(taskObjects[id]['taskCategory'])
    }
}

 function removeOldModalData() {
     document.getElementById('modal-urgency').classList.remove('high', 'normal', 'low');
     document.getElementById('board-modal-footer').innerHTML = "";
    }

/**
 * 
 * @param {Event} ev 
 */
function saveChanges(ev) {
    console.log("huhu");
    ev.preventDefault();
    console.log("huhu2");

    changeTask();
    
    console.log(taskObjects);
    saveToServer("taskObjects", taskObjects);
    console.log(taskObjects);
    loadBoardsanew();
}
/**
 * 
 */
function changeTask() {
    let newTask = {
        title: "",
        description: "",
    }

    let id = document.getElementById('modal-id').value
    let modalData = document.getElementById('boardModal');
    formData = new FormData(modalData);
    //new Task() didn't work, this is a workaround
    newTask.title = formData.get('taskTitle');
    newTask.description = formData.get('taskDescription');

    taskObjects[id]['taskTitle'] = newTask.title;
    taskObjects[id]['taskDescription'] = newTask.description;
    newLastUpdate(id)
}



/**
 * Drag and Drop
 */
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev, idNr) {
    ev.dataTransfer.setData("text", ev.target.id);
    dropId = idNr;
}

/**
 * 
 * @param {Object} ev dragged object
 * @param {Number} dropCategory 
 * changes allTasks[].status into new category
 */
function drop(ev,  dropCategory) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    taskObjects[dropId]['taskStatus'] = dropCategory;
    newLastUpdate(dropId)
    saveToServer("taskObjects", taskObjects);
}
/**
 * 
 * @param {*} ev 
 */
function newBoardList(ev) {
    ev.preventDefault();
    newListObject();
    saveToServer("listObjects", listObjects);
    loadBoardsanew()
}

function noAllowDrop(ev) {
    ev.stopPropagation();
}

/**
 * 
 */
function newListObject() {
    let newList = {
        listId: "",
        listName: ""
    }
    let newBoardListInput = document.getElementById('listInput').value;
    newList.listId = newBoardListInput;
    newList.listName = newBoardListInput

    listObjects.push(newList);
    let fab = document.getElementById('fab');
    fab.setAttribute('aria-expanded', false)
    document.getElementById('listInput').value = "";
    document.getElementById('collapseExample').classList.remove("show")
    


}

/**
 * 
 */
function loadListsToBoard() {
    let loadElement = document.getElementById("board-body");
    loadElement.innerHTML = '';

    for (let i = 0; i < listObjects.length; i++) {
        let list = listObjects[i];
        if (i <= 3) {
            loadElement.innerHTML += writeListColumnBasic(list)
        }
        else {
            loadElement.innerHTML += writeListColumn(list)
        }
    }
   // loadElement.innerHTML += buttonNewList()
}

function writeListColumnBasic(list) {
    return `<div class="board-column"><div class="d-flex justify-content-center align-items-center">
    <h2>${list.listName}</h2> </div>
    <div
      id="${list.listId}"
      class="board-column-text-board"
      ondrop="drop(event, '${list.listId}')"
      ondragover="allowDrop(event)"
    ></div>
  </div>`;
}



/**
 * 
 * @param {*} list 
 * @returns 
 */
function writeListColumn(list) {
    return `<div class="board-column"><div class="d-flex justify-content-end align-items-center">
    <h2>${list.listName}</h2> <button type="button" class="btn-close"  aria-label="Delete" onclick="deleteList('${list.listId}')"></button></div>
    <div
      id="${list.listId}"
      class="board-column-text-board"
      ondrop="drop(event, '${list.listId}')"
      ondragover="allowDrop(event)"
    ></div>
  </div>`;
}

/**
 * 
 * @returns 
 
function buttonNewList() {
    return `
    <div class="fab" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
    aria-expanded="false" aria-controls="collapseExample"> + </div>
    
    <p style="">

      
    </p>
    <div class="collapse" id="collapseExample">
      <form onsubmit="newBoardList(event)">
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label"></label>
          <input class="form-control" id="listInput" rows="1" required></input>
        </div>
        <button  class="btn btn-primary btn-lg font-bold bg-purple " type="submit">Create</button>
      </form>
    </div>
  </div>
 
  </div></div>`
}*/
// <img ondragover="allowDrop(event)" class="m-3" ondrop="drop(event, 'backlog') " src="img/trash.png" alt="">


function newLastUpdate(id) {
    let currentTask = taskObjects[id];
    let changedTask = new Task(id);
    currentTask.lastUpDate = changedTask.lastUpDate;
    taskObjects[id] = currentTask;

}



function deleteList(listName) {

    for (let i = 0; i < listObjects.length; i++) {
        if (listName === listObjects[i].listId) {
            if (checkEmptyList(listName) == true) {
                alert('to remove a List it has to be empty')
            } else {

                listObjects.splice(i, 1)
            }
        }
        saveToServer("listObjects", listObjects);
        loadBoardsanew()
    }
}
function checkEmptyList(listName) {
    for (let i = 0; i < taskObjects.length; i++) {

        if (taskObjects[i].taskStatus == listName) {
            return true
        }

    }
}

function deleteTask() {
    let check = confirm(
        `are you sure you want to delete this task? 

Your action will still be able to see it in the Backlog`);
    if (check == true) {
            taskObjects[currentId]['taskStatus'] = "backlog";

        newLastUpdate(currentId)
        saveToServer("taskObjects", taskObjects);

        createNewLogs('Task deleted',taskObjects[currentId]);
        loadBoardsanew();
    }
}