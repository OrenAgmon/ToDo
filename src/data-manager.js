import { de } from 'date-fns/locale'
import {Task, Project, Projects} from './factories'

const dataManager = (function(){
    const allTasksProject = Project('allTasks', [])
    let todayProject = Project('today', [])
    let thisWeekProject = Project('thisWeek', [])
     

    const addTask = (newTask) =>{
      allTasksProject.addTask(newTask)
      console.log(allTasksProject.getTaskArray());
    }

    const filterArrayByWeek = (taskArray) => {
        let filteredArray = taskArray.filter( task =>{
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

    
   return {allTasksProject,todayProject, thisWeekProject, addTask, filterArrayByDay, filterArrayByWeek} 


})()

export {dataManager}