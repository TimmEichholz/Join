
/**
 * This object class is designed to create and store all new task information needed for this KANBAN application.
 * @param {Number} taskId this parameter is used to save the primary key as unique id of one task 
 * @param {String} taskTitle this parameter is used to save title of a task 
 * @param {String} taskCategory this parameter is used to save the information, to which category, this task belongs to 
 * @param {String} taskDescription this parameter is used to save the detailed discription of a task 
 * @param {String} taskDueDate this parameter is used to save due date of one task 
 * @param {Number} taskUrgency this parameter is used to save urgency of one task, 1 for Urgency 'high', 2 for urgency 'middle', 3 for urgency 'low' 
 * @param {Array} taskAsignedTo this Array is used to save all user IDs, of which this task is asigned to.
 * @param {Number} listId this Number includes the information of the index of list id, to which this task belongs to.
 * @param {String} createdBy this String is used to store information, who create this task
 * @param {String} lastUpDate this parameter is used to store the time, when the task is last updated
 *
 */

 class Task{
    taskId;
    taskTitle;
    taskCategory;
    taskDescription;
    taskDueDate;
    taskUrgency;
    taskStatus;
    taskAsignedTo = [];
    taskStatus = 'backlog';
    listId = 0;
    createdBy = 'admin';
    lastUpDate;


    constructor(GLOBAL_VARIABLES, asignedUsers){
        this.taskId = highestTaskId()//GLOBAL_VARIABLES.currTaskId;

        let date = new Date();

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        if(month < 10){
            month = '0' + month;
        }
        let day = date.getDate();
        if(day<10){
            day = '0' + day;
        }

        date = year + '-' + month + '-' + day;

        this.lastUpDate = date;
        this.taskStatus = "backlog";
        this.taskAsignedTo = asignedUsers;
    }



    dataFromInput(formData){
        this.taskTitle = formData.get('taskTitle');
        this.taskCategory = formData.get('taskCategory');
        this.taskDescription = formData.get('taskDescription');
        this.taskDueDate = formData.get('taskDueDate');
        this.taskUrgency = formData.get('taskUrgency');
        console.log(this);
    }

    

    
}
function highestTaskId(){
 
    return taskObjects.length>0? Math.max(...taskObjects.map(o => o.taskId))+1:0;
 }
