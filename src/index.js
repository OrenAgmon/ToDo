import { id } from "date-fns/locale";
import { dataManager } from "./data-manager";
import { Task, Project, Projects } from "./factories"

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
        toggleAddTaskView(false)
        taskTextInput.focus()
    })
    applyTaskButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleApplyTask(button.textContent)
        })
    })

    addProjBtn.addEventListener('click', () => {
        toggleAddProjView(false)
        projTextInput.focus()
    })
    applyProjectButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleApplyProject(button.textContent)
        })

    })

    allProjects.forEach(button => {
        button.addEventListener('click', (e) => {
            if(e.target.textContent!= 'close'){
                handleProjectClick(e.currentTarget.getAttribute('id'))
            }
            
        })
    })


    function handleProjectClick(projectId) {
        dataManager.customProjects.setChosenProject('')
        if (projectId == 'Today') {
            let todayArray = dataManager.filterArrayByDay(dataManager.allTasksProject.getTaskArray())
            dataManager.todayProject.setTaskArray(todayArray)
            dataManager.toggleIsEditingToday()
            

            updateDomProjectDisp(todayArray)


        }
        else if (projectId == 'All Tasks') {
            updateDomProjectDisp(dataManager.allTasksProject.getTaskArray())
            dataManager.toggleEditAll()
        }
        else if (projectId == 'This Week') {
            let thisWeekArray = dataManager.filterArrayByWeek(dataManager.allTasksProject.getTaskArray())
            dataManager.thisWeekProject.setTaskArray(thisWeekArray)
            dataManager.toggleEditingWeek()

            updateDomProjectDisp(thisWeekArray)


        }

        else{
            dataManager.customProjects.setChosenProject(projectId)

        }
         if(dataManager.customProjects.getChosenProject() != '') {
             dataManager.toggleEditAll()
            let chosenProjectArray = dataManager.customProjects.getProjectArray()[dataManager.customProjects.getProjectIndex(projectId)].getTaskArray()
            updateDomProjectDisp(chosenProjectArray)

        }

        mainTitle.textContent = projectId



        function updateDomProjectDisp(updatedArray) {
            const currentDisplayedTasks = document.querySelectorAll('.task-container')
            if(currentDisplayedTasks.length > 0){
                currentDisplayedTasks.forEach(element => {
                    element.remove()
                })
            }
         
            if(updatedArray.length > 0){
                updatedArray.forEach(task => {
                    tasksContainer.appendChild(createDomTask(task))
                })
            }
          
        }



    }

    function handleApplyTask(clickedButton) {
        if (clickedButton == 'Save') {
            let newTask = Task(taskTextInput.value)
            if(dataManager.getIsEditingToday()){
                newTask.setDateToday()
            } 
            if(dataManager.getIsEditingWeek()){
                newTask.setDateWeekend()
            } 
            let chosenProject = dataManager.customProjects.getChosenProject()
            dataManager.addTask(newTask)

            let domTask = createDomTask(newTask)
            tasksContainer.appendChild(domTask)
            taskTextInput.value = ''

            if(chosenProject != ''){
                dataManager.customProjects.addTaskToProject(chosenProject, newTask)
            }


        }
        toggleAddTaskView(true)

    }

    function handleApplyProject(clickedButton) {
        if (clickedButton == 'Save') {
            let newProject = Project(projTextInput.value, [])
            dataManager.customProjects.addProject(newProject)

            let domProject = createDomProject(newProject)
            allProjContainer.append(domProject)
            projTextInput.value = ''
        }
        toggleAddProjView(true)


    }

    function createDomProject(newProject) {
        const projectButton = document.createElement('button')
        const projectText = document.createElement('span')
        const projectIcon = document.createElement('span')
        const projectDeleteIcon = document.createElement('span')
        const rightProjSection = document.createElement('div')

        rightProjSection.classList.add('right-proj-section')
        projectButton.classList.add('side-proj')
        projectButton.classList.add('custom-proj')
        projectButton.setAttribute('id', `${newProject}`)

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

        projectButton.addEventListener('click', (e) =>{
            handleProjectClick(e.target.textContent)
        })
        projectDeleteIcon.addEventListener('click', (e) =>{
            deleteProject(e)
        })

        return projectButton;
    }

    function deleteProject(e){
      e.target.closest('.custom-proj').remove()
      dataManager.customProjects.deleteProject(e.target.textContent)  
      dataManager.customProjects.getProjectArray()
    }


    function createDomTask(newTask) {
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

            setDateDelListeners(deleteBtn, dueDate, taskName.textContent)
        }


        defineClassesAndAttr()
        appendEverything()
        return domTaskContainer;





    }

    function setDateDelListeners(deleteTaskBtn, domDueDate, taskName) {
        domDueDate.addEventListener('change', () => {
            if (domDueDate !== undefined) {
                let dueDate = new Date(domDueDate.value)
                let taskIndex = dataManager.allTasksProject.getTaskArray().findIndex(task => {
                    return task.getName() == taskName
                })

                dataManager.allTasksProject.getTaskArray()[taskIndex].setDate(dueDate)
            }

        })
        deleteTaskBtn.addEventListener('click', (e) => {
            deleteTask(e, taskName)
        })

    }

    function deleteTask(e, taskName, currentProject) {
        dataManager.allTasksProject.deleteTask(taskName)
        e.target.closest('.task-container').remove()
    }


    function toggleAddTaskView(showAdd) {
        if (showAdd == false) {
            addTaskBtn.style.display = 'none'
            taskInputContainer.style.display = 'flex'
        }
        else if (showAdd == true) {
            addTaskBtn.style.display = 'flex'
            taskInputContainer.style.display = 'none'
        }

    }
    function toggleAddProjView(showAdd) {
        if (showAdd == false) {
            addProjBtn.style.display = 'none'
            projInputContainer.style.display = 'flex'
        }
        else if (showAdd == true) {
            addProjBtn.style.display = 'flex'
            projInputContainer.style.display = 'none'
        }

    }


    return {

    }

})()


