import { dataManager } from "./data-manager"
import {Task, Project, Projects} from "./factories"
import { domManager } from "./index"
import { localStorageHelper } from "./local-storage"

const domHelper = (function (){

    const createDomTask  = (newTask) =>{
        let domTaskContainer = document.createElement('div')
        let nameIconContainer = document.createElement('div')
        let deleteDateContainer = document.createElement('div')
        let isDoneIcon = document.createElement('span')
        let taskName = document.createElement('p')
        let dueDate = document.createElement('input')
        let deleteBtn = document.createElement('span')

        function defineClassesAndAttr() {

            domTaskContainer.classList.add('task-container')
            nameIconContainer.classList.add('name-icon-container')

            isDoneIcon.classList.add('material-icons')
            isDoneIcon.classList.add('addtask-icon')
            isDoneIcon.classList.add('check-icon')
            isDoneIcon.textContent = 'check_box_outline_blank'

            taskName.textContent = newTask.getName()
            taskName.classList.add('task-name')

            deleteDateContainer.classList.add('date-del-container')

            dueDate.setAttribute('type', 'date')
            dueDate.setAttribute('id', 'due-date')
            dueDate.setAttribute('name', 'due-date')
            dueDate.classList.add('due-date')
            if (newTask.getChosenDate() instanceof Date) {
                dueDate.value = newTask.getChosenDate().toISOString().slice(0, 10)
            }

            deleteBtn.classList.add('material-icons')
            deleteBtn.classList.add('delete-task')
            deleteBtn.textContent = 'delete'
        }


        function appendEverything() {
            deleteDateContainer.append(dueDate, deleteBtn)
            nameIconContainer.append(isDoneIcon, taskName)
            domTaskContainer.append(nameIconContainer, deleteDateContainer)

            setDateDelListeners(deleteBtn, dueDate, newTask, isDoneIcon)
        }

        function setDateDelListeners(deleteTaskBtn, domDueDate, newTask, isDoneBtn) {
            domDueDate.addEventListener('change', () => {
                if (domDueDate !== undefined) {
                    let dueDate = new Date(domDueDate.value)
                    let taskIndex = dataManager.allTasksProject.getTaskArray().findIndex(task => {
                        return task.getId() == newTask.getId()
                    })
    
                    dataManager.allTasksProject.getTaskArray()[taskIndex].setDate(dueDate)
                }
    
            })
            deleteTaskBtn.addEventListener('click', (e) => {
                deleteTask(e, newTask)
            })
    
            isDoneBtn.addEventListener('click', (e) => {
                deleteTask(e, newTask)
            })
        }


        defineClassesAndAttr()
        appendEverything()
        return domTaskContainer;


    }
    const createDomProject = (newProject) =>{
        const projectButton = document.createElement('button')
        const projectText = document.createElement('span')
        const projectIcon = document.createElement('span')
        const projectDeleteIcon = document.createElement('span')
        const rightProjSection = document.createElement('div')

        rightProjSection.classList.add('right-proj-section')
        projectButton.classList.add('side-proj')
        projectButton.classList.add('custom-proj')
        projectButton.setAttribute('id', `${newProject.getName()}`)

        projectText.classList.add('side-text')
        projectText.textContent = newProject.getName()

        projectIcon.classList.add('side-icon')
        projectIcon.classList.add('material-icons')
        projectIcon.textContent = 'label'

        projectDeleteIcon.classList.add('delete-proj-icon')
        projectDeleteIcon.classList.add('material-icons')
        projectDeleteIcon.textContent = 'close'

        rightProjSection.append(projectIcon, projectText)
        projectButton.append(rightProjSection, projectDeleteIcon)

        projectButton.addEventListener('click', (e) => {
            domManager.handleProjectClick(e.currentTarget.getAttribute('id'))
        })
        projectDeleteIcon.addEventListener('click', (e) => {
            e.stopPropagation()
            deleteProject(e)
        
        })

        return projectButton;

    }
    const updateTaskDomDisp = (updatedArray) => {
        const currentDisplayedTasks = document.querySelectorAll('.task-container')
        const tasksContainer = document.querySelector('.tasks-container')
        if (currentDisplayedTasks.length > 0) {
            currentDisplayedTasks.forEach(element => {
                element.remove()
            })
        }

        if (updatedArray.length > 0) {
            updatedArray.forEach(task => {
                tasksContainer.appendChild(createDomTask(task))
            })
        }

        

    }

    function deleteTask(e, newTask) {
        dataManager.allTasksProject.deleteTask(newTask.getId())
        e.target.closest('.task-container').remove()
        localStorageHelper.deleteTask(newTask.getId())

        if (dataManager.customProjects.getChosenProject() != '') {
            let projectIndex = dataManager.customProjects.
                getProjectIndex(dataManager.customProjects.getChosenProject())
            dataManager.customProjects.getProjectArray()[projectIndex].deleteTask(newTask.getId())

        }
        if (newTask.getBelong() != '') {

            //deleting task from a custom project
           
            let chosen = newTask.getBelong()
            let projectIndex = dataManager.customProjects.getProjectIndex(chosen)
            dataManager.customProjects.getProjectArray()
            [projectIndex].deleteTask(newTask.getId())
        }

    }
    function deleteProject(e) {
        e.target.closest('.custom-proj').remove()
        dataManager.deleteProject(e.target.closest('.custom-proj').getAttribute('id'))
        dataManager.customProjects.getProjectArray()

        if (e.target.closest('.custom-proj').getAttribute('id') == dataManager.customProjects.getChosenProject()) {
            domManager.handleProjectClick('All Tasks')
        }
        if (dataManager.customProjects.getChosenProject() == '') {
            if (dataManager.getIsEditingToday()) domManager.handleProjectClick('Today')
            else if (dataManager.getIsEditingWeek()) domManager.handleProjectClick('This Week')
            else domManager.handleProjectClick('All Tasks')
        }
    }

    const  toggleAddTaskView = (showAdd) => {
        const taskInputContainer = document.querySelector('.task-input-container')
        const addTaskBtn = document.querySelector('.add-task')


        if (showAdd == false) {
            addTaskBtn.style.display = 'none'
            taskInputContainer.style.display = 'flex'
        }
        else if (showAdd == true) {
            addTaskBtn.style.display = 'flex'
            taskInputContainer.style.display = 'none'
        }

    }
    const  toggleAddProjView = (showAdd) => {
        const projInputContainer = document.querySelector('.proj-input-container')
        const addProjBtn = document.querySelector('.create-project')


        if (showAdd == false) {
            addProjBtn.style.display = 'none'
            projInputContainer.style.display = 'flex'
        }
        else if (showAdd == true) {
            addProjBtn.style.display = 'flex'
            projInputContainer.style.display = 'none'
        }

    }
    const updateProjDomDisplay =(updatedProjArray) =>{
        const allProjContainer = document.querySelector('.all-proj-container')
        updatedProjArray.forEach(project =>{
            let domProject = createDomProject(project)
            allProjContainer.appendChild(domProject)
        })
    }
    




    return{ createDomTask,
            createDomProject,
            updateTaskDomDisp,
            toggleAddProjView,
            toggleAddTaskView,
            updateProjDomDisplay
    }

})()

export {
    domHelper
}