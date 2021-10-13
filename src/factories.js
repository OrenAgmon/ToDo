import { set } from "date-fns";

const Task = function (taskName) {

    let isDone = false;
    let dueDate = ''
    const getName = () => taskName;
    const setName = (newName) => {
        taskName = newName;
    }

    const getChosenDate = () => dueDate;
    const setDate = (newDate) => {
        dueDate = newDate;
    }

    const isTaskToday = () =>{
        let today = new Date()
        let currentYear = today.getFullYear()
        let currentMonth = today.getMonth()
        let currentDay = today.getDate()
        let taskYear, taskMonth, taskDate;
       if(dueDate instanceof Date){

       
         taskYear = dueDate.getFullYear()
         taskMonth = dueDate.getMonth()
         taskDate = dueDate.getDate();
    }
        if (currentYear == taskYear && 
            currentMonth == taskMonth &&
             currentDay == taskDate) {
            return true;
        }
        return false;

    }

    const isTaskThisWeek = () =>{
        let today = new Date();
        let currentYear = today.getFullYear()
        let currentMonth = today.getMonth()
        let currentDate = today.getDate();
        let currentDay = today.getDay()
        let taskYear, taskMonth, taskDate, taskDay;

        if(dueDate instanceof Date){
             taskYear = dueDate.getFullYear()
             taskMonth = dueDate.getMonth()
             taskDate = dueDate.getDate();
             taskDay = dueDate.getDay()

        }
      

        if (taskYear == currentYear && taskMonth == currentMonth
            && (taskDate - currentDate) < 7
            && (taskDate - currentDate) == (taskDay - currentDay)){
                return true
            } 
            return false


    }

    const setDateToday = () => {
        let today = new Date()
        setDate(today)
    }
    const setDateWeekend = () =>{
        let sat= new Date()
        sat.setDate(sat.getDate() + (6-(sat.getDay())))
        setDate(sat)
    }
    

    const toggleDone = () => isDone = !isDone
    return {
        getName,
        setName,
        getChosenDate,
        setDate,
        toggleDone,
        isTaskToday,
        isTaskThisWeek,
        setDateToday,
        setDateWeekend
    }

}


const Project = (projectName) => {
    let taskArray = []
    const getName = () => projectName;

    const addTask = (currentTask) => {
        taskArray.push(currentTask);
    }
    const deleteTask = (taskName) => {
        taskArray.splice(taskArray.findIndex(task => task.getName() == taskName), 1)
    }
  

    const setTaskArray = (newArray) =>{
        taskArray = newArray;
    }
    const getTaskArray = () => taskArray;




    return {
        getName,
        addTask,
        deleteTask,

        getTaskArray,
        setTaskArray
    }
}


const Projects = () => {

    let chosenProject = ''
    const projectArray = []

    const getChosenProject = () => chosenProject
    const setChosenProject = function (n) {
        chosenProject = n;

    }
    const getProjectArray = () => projectArray;
    const addProject = (currentProject) => {
        projectArray.push(currentProject)
    }
    const deleteProject = (projectName) => {
        projectArray.splice(projectArray.findIndex(project => project.getName() == projectName), 1)
    }

    const getProjectIndex = (projectName) => {
        return projectArray.findIndex(element => element.getName() == projectName)
    }
    const addTaskToProject = (projectName, task) =>{

        let projectIndex = projectArray.findIndex(element => element.getName() == projectName)
        projectArray[projectIndex].addTask(task)

    }


    return {
        addProject, deleteProject, getChosenProject, setChosenProject, getProjectArray, addTaskToProject, getProjectIndex
    }
}

export { Task, Project, Projects }



