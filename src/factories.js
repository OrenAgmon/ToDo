import { set } from "date-fns";

const Task = function (taskName) {

    let isDone = false;
    let dueDate = ''
    let belongTo = ''
    let taskId = Math.random().toString(16).slice(2)

    const getId = () => taskId
    const setId = (id) => taskId = id;

    const getBelong = () => belongTo
    const setBelong =  (projectName) => belongTo = projectName

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
        setDateWeekend,
        getBelong,
        setBelong,
        getId,
        setId
        
    }

}


const Project = (projectName) => {
    let taskArray = []
    const getName = () => projectName;

    const addTask = (currentTask) => {
        taskArray.push(currentTask);
    }
    const deleteTask = (taskId) => {
        taskArray.splice(taskArray.findIndex(task => task.getId() == taskId), 1)
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


    const getProjectIndex = (projectName) => {
        return projectArray.findIndex(element => element.getName() == projectName)
    }
    const addTaskToProject = (projectName, task) =>{

        let projectIndex = projectArray.findIndex(element => element.getName() == projectName)
        projectArray[projectIndex].addTask(task)

    }


    return {
        addProject, getChosenProject, setChosenProject, getProjectArray, addTaskToProject, getProjectIndex
    }
}

export { Task, Project, Projects }



