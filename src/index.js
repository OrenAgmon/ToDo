import { subSeconds } from "date-fns";
import { subMilliseconds } from "date-fns/esm";
import { id } from "date-fns/locale";
import { dataManager } from "./data-manager";
import { Task, Project, Projects } from "./factories"
import { domHelper } from "./domHelper";
import { localStorageHelper } from "./local-storage";

window.onload = () => {
    localStorageHelper.rebuildTasksAndProjects()
    domManager.handleProjectClick('All Tasks')
    domHelper.updateProjDomDisplay(dataManager.customProjects.getProjectArray())
}

const domManager = (function () {
    const mainTitle = document.querySelector('#main-title')
    const addTaskBtn = document.querySelector('.add-task')
    const taskInputContainer = document.querySelector('.task-input-container')
    const taskTextInput = document.querySelector('#task-text-input')
    const applyTaskButtons = document.querySelectorAll('.apply-task')
    const tasksContainer = document.querySelector('.tasks-container')


    const allProjects = document.querySelectorAll('.side-proj')
    const applyProjectButtons = document.querySelectorAll('.apply-proj')
    const addProjBtn = document.querySelector('.create-project')
    const projInputContainer = document.querySelector('.proj-input-container')
    const projTextInput = document.querySelector('#new-proj-text')
    const allProjContainer = document.querySelector('.all-proj-container')





    addTaskBtn.addEventListener('click', () => {
        domHelper.toggleAddTaskView(false)
        taskTextInput.focus()
    })
    applyTaskButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleApplyTask(button.textContent)
        })
    })

    addProjBtn.addEventListener('click', () => {
        domHelper.toggleAddProjView(false)
        projTextInput.focus()
    })
    applyProjectButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleApplyProject(button.textContent)
        })

    })

    allProjects.forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.textContent != 'close') {
                handleProjectClick(e.currentTarget.getAttribute('id'))
            }

        })
    })


    function handleProjectClick(projectId) {
        dataManager.customProjects.setChosenProject('')
        domHelper.toggleAddTaskView(true)
        domHelper.toggleAddProjView(true)
        if (projectId == 'Today') {
            let todayArray = dataManager.filterArrayByDay(dataManager.allTasksProject.getTaskArray())
            dataManager.todayProject.setTaskArray(todayArray)
            dataManager.toggleIsEditingToday()
            mainTitle.textContent = projectId


            domHelper.updateTaskDomDisp(todayArray)


        }
        else if (projectId == 'All Tasks') {
            domHelper.updateTaskDomDisp(dataManager.allTasksProject.getTaskArray())
            dataManager.toggleEditAll()
            mainTitle.textContent = projectId

        }
        else if (projectId == 'This Week') {
            let thisWeekArray = dataManager.filterArrayByWeek(dataManager.allTasksProject.getTaskArray())

            dataManager.thisWeekProject.setTaskArray(thisWeekArray)
            dataManager.toggleEditingWeek()
            mainTitle.textContent = projectId

            domHelper.updateTaskDomDisp(thisWeekArray)


        }

        else {
            dataManager.customProjects.setChosenProject(projectId)

        }
        if (dataManager.customProjects.getChosenProject() != '') {
            dataManager.toggleEditAll()
            let chosenProjectArray = dataManager.customProjects.getProjectArray()[dataManager.customProjects.getProjectIndex(projectId)].getTaskArray()
            domHelper.updateTaskDomDisp(chosenProjectArray)
            mainTitle.textContent = 'Project ' + dataManager.customProjects.getChosenProject()

        }








    }

    function handleApplyTask(clickedButton) {
        if (clickedButton == 'Save') {
            let newTask = Task(taskTextInput.value)
            if (dataManager.getIsEditingToday()) {
                newTask.setDateToday()
            }
            if (dataManager.getIsEditingWeek()) {
                newTask.setDateWeekend()
            }
            let chosenProject = dataManager.customProjects.getChosenProject()
            dataManager.addTask(newTask)


            if (chosenProject != '') {
                dataManager.customProjects.addTaskToProject(chosenProject, newTask)
                newTask.setBelong(chosenProject)
            }

            let domTask = domHelper.createDomTask(newTask)
            tasksContainer.appendChild(domTask)
            taskTextInput.value = ''



        }
        domHelper.toggleAddTaskView(true)


    }

    function handleApplyProject(clickedButton) {
        if (clickedButton == 'Save') {
            let newProject = Project(projTextInput.value, [])
            dataManager.customProjects.addProject(newProject)

            let domProject = domHelper.createDomProject(newProject)
            allProjContainer.append(domProject)
            projTextInput.value = ''
        }
        domHelper.toggleAddProjView(true)


    }








    return {
        handleProjectClick,
        handleApplyTask
    }

})()





// console.log(localStorageHelper.rebuildTasksAndProjects());
// domManager.handleProjectClick('All Tasks')

window.addEventListener('beforeunload', () => {
    localStorageHelper.addAllTasksToStorage()
})

console.log(localStorage);

export { domManager }