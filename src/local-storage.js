import { Task, Project, Projects } from "./factories"
import { dataManager } from "./data-manager"
import { domHelper } from "./domHelper"

const localStorageHelper = (function () {

    const addAllTasksToStorage = () => {
        dataManager.allTasksProject.getTaskArray().forEach(task => {
            let stringTask = returnStringTask(task)

            localStorage.setItem(task.getId(), JSON.stringify(stringTask))
            console.log(JSON.stringify(stringTask));
            console.log(stringTask)
        })

        function returnStringTask(task) {
            return {
                name: task.getName(),
                dueDate: task.getChosenDate(),
                id: task.getId(),
                belongTo: task.getBelong()
            }


        }
    }

        const deleteTask = (taskId) => {
            localStorage.removeItem(taskId)
        }

        const rebuildTasksAndProjects = () => {
            Object.keys(localStorage).forEach(key =>{
                let task = parseTask(key)
                console.log(task.getChosenDate());
                dataManager.allTasksProject.addTask(task)

                if(task.getBelong()!= ''){
                    let projectIndex = dataManager.customProjects.getProjectIndex(task.getBelong())
                    if(projectIndex == -1){
                        let newProject = Project(task.getBelong())
                        newProject.addTask(task)
                        dataManager.customProjects.addProject(newProject)
                    }
                    else{
                        dataManager.customProjects[projectIndex].addTask(task)

                    }

                }
                
            })



            function parseTask(key){
                let stringTask = JSON.parse(localStorage.getItem(key))
                let taskedTask = Task(stringTask.name)
                taskedTask.setDate(new Date(stringTask.dueDate))
                taskedTask.setBelong(stringTask.belongTo)
                taskedTask.setId(stringTask.id)
                return taskedTask

            }


        }


        return {
            addAllTasksToStorage,
            rebuildTasksAndProjects,
            deleteTask
        }

    })()

    export { localStorageHelper }


