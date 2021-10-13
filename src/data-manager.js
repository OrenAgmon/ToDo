import { de } from 'date-fns/locale'
import { Task, Project, Projects } from './factories'

const dataManager = (function () {
    let allTasksProject = Project('allTasks', [])
    let todayProject = Project('today', [])
    let thisWeekProject = Project('thisWeek', [])
    let customProjects = Projects()
    let isEditingToday = false;
    let isEditingWeek = false;

    const getIsEditingToday = () => isEditingToday;
    const toggleIsEditingToday = () =>{
        isEditingToday = !isEditingToday;
        if(getIsEditingWeek){
            isEditingWeek = false;
        }
    } 
    const getIsEditingWeek = () => isEditingWeek
    const toggleEditingWeek = () => {
        isEditingWeek = !isEditingWeek
        if(getIsEditingToday){
            isEditingToday  = false;
        }
    }
    const toggleEditAll = () =>{
        isEditingToday = false;
        isEditingWeek = false;
        
    }



    const addTask = (newTask) => {
        allTasksProject.addTask(newTask)
    }

    const filterArrayByWeek = (taskArray) => {
        let filteredArray = taskArray.filter(task => {
            console.log(task.isTaskThisWeek());
            return task.isTaskThisWeek();

        })
        return filteredArray;
    }
    const filterArrayByDay = (taskArray) => {
        let filteredArray = taskArray.filter(task => {
            return task.isTaskToday();
        })
        return filteredArray;
    }


    return {
        allTasksProject,
        todayProject
        , thisWeekProject
        , customProjects
        , addTask
        , filterArrayByDay
        , filterArrayByWeek
        , getIsEditingToday
        , toggleIsEditingToday
        , getIsEditingWeek
        , toggleEditingWeek,
        toggleEditAll
    }


})()

export { dataManager }