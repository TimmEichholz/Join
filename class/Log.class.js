class Log{
    operationType;
    creater;
    taskName;
    userAvatar; 
    userName;
    userEmail; 
    logCategory;
    logDetails; 
    UrgencyColor;

    constructor(operationType, creater, taskObject, userObject, UrgencyColor){
        this.operationType = operationType;
        this.creater = creater;
        this.taskName = taskObject.taskTitle;
        this.userAvatar = userObject.userProfileAvatar;
        this.userName = userObject.userName;
        this.userEmail = userObject.userEmail;
        this.logCategory = categoryObjects[taskObject.taskCategory];
        this.logDetails = taskObject.taskDescription;
        this.UrgencyColor = UrgencyColor;

       


        console.log(this);
    }

    
}
