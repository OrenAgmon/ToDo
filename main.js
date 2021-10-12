/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data-manager.js":
/*!*****************************!*\
  !*** ./src/data-manager.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"dataManager\": () => (/* binding */ dataManager)\n/* harmony export */ });\n/* harmony import */ var _factories__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories */ \"./src/factories.js\");\n\n\n\nconst dataManager = (function(){\n    const allTasksProject = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.Project)('allTasks', [])\n    let todayProject = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.Project)('today', [])\n    let thisWeekProject = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.Project)('thisWeek', [])\n     \n\n    const addTask = (newTask) =>{\n      allTasksProject.addTask(newTask)\n      console.log(allTasksProject.getTaskArray());\n    }\n\n    const filterArrayByWeek = (taskArray) => {\n        let filteredArray = taskArray.filter( task =>{\n             return task.isTaskThisWeek();\n             \n         })\n         return filteredArray;\n     }\n     const filterArrayByDay = (taskArray) => {\n         let filteredArray = taskArray.filter(task => {\n             return task.isTaskToday();\n         })\n         return filteredArray;\n     }\n\n    \n   return {allTasksProject,todayProject, thisWeekProject, addTask, filterArrayByDay, filterArrayByWeek} \n\n\n})()\n\n\n\n//# sourceURL=webpack://to-do-project/./src/data-manager.js?");

/***/ }),

/***/ "./src/factories.js":
/*!**************************!*\
  !*** ./src/factories.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Task\": () => (/* binding */ Task),\n/* harmony export */   \"Project\": () => (/* binding */ Project),\n/* harmony export */   \"Projects\": () => (/* binding */ Projects)\n/* harmony export */ });\nconst Task = function (taskName) {\n\n    let isDone = false;\n    let dueDate = ''\n    const getName = () => taskName;\n    const setName = (newName) => {\n        taskName = newName;\n    }\n\n    const getChosenDate = () => dueDate;\n    const setDate = (newDate) => {\n        dueDate = newDate;\n    }\n\n    const isTaskToday = () =>{\n        let today = new Date()\n        let currentYear = today.getFullYear()\n        let currentMonth = today.getMonth()\n        let currentDay = today.getDate()\n        let taskYear, taskMonth, taskDate;\n       if(dueDate instanceof Date){\n\n       \n         taskYear = dueDate.getFullYear()\n         taskMonth = dueDate.getMonth()\n         taskDate = dueDate.getDate();\n    }\n        if (currentYear == taskYear && \n            currentMonth == taskMonth &&\n             currentDay == taskDate) {\n            return true;\n        }\n        return false;\n\n    }\n\n    const isTaskThisWeek = () =>{\n        let today = new Date();\n        let currentYear = today.getFullYear()\n        let currentMonth = today.getMonth()\n        let currentDate = today.getDate();\n        let currentDay = today.getDay()\n\n\n        let taskYear = dueDate.getFullYear()\n        let taskMonth = dueDate.getMonth()\n        let taskDate = dueDate.getDate();\n        let taskDay = dueDate.getDate()\n\n        if (taskYear == currentYear && taskMonth == currentMonth\n            && (taskDate - currentDate) < 7\n            && (taskDate - currentDate) == (taskDay - currentDay)){\n                return true\n            } \n            return false\n\n\n    }\n    \n\n    const toggleDone = () => isDone = !isDone\n    return {\n        getName,\n        setName,\n        getChosenDate,\n        setDate,\n        toggleDone,\n        isTaskToday,\n        isTaskThisWeek\n    }\n\n}\n\n\nconst Project = (projectName) => {\n    let taskArray = []\n    const getName = () => projectName;\n\n    const addTask = (currentTask) => {\n        taskArray.push(currentTask);\n    }\n    const deleteTask = (taskName) => {\n        taskArray.splice(taskArray.findIndex(task => task.getName() == taskName), 1)\n    }\n  \n\n    const setTaskArray = (newArray) =>{\n        taskArray = newArray;\n    }\n    const getTaskArray = () => taskArray;\n\n\n\n\n    return {\n        getName,\n        addTask,\n        deleteTask,\n\n        getTaskArray,\n        setTaskArray\n    }\n}\n\n\nconst Projects = () => {\n\n    const chosenProject = 'allTasks'\n    const projectArray = []\n\n    const getChosenProject = () => chosenProject\n    const setChosenProject = function (n) {\n        chosenProject = n;\n\n    }\n    const getProjectArray = () => projectArray;\n    const addProject = (currentProject) => {\n        projectArray.push(currentProject)\n    }\n    const deleteProject = (projectName) => {\n        projectArray.splice(projectArray.findIndex(project => project.getName() == projectName), 1)\n    }\n\n\n    return {\n        addProject, deleteProject, getChosenProject, setChosenProject, getProjectArray\n    }\n}\n\n\n\n\n\n\n\n//# sourceURL=webpack://to-do-project/./src/factories.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data-manager */ \"./src/data-manager.js\");\n/* harmony import */ var _factories__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories */ \"./src/factories.js\");\n\n\n\nconst domManager = (function () {\n\n    const addTaskBtn = document.querySelector('.add-task')\n    const taskInputContainer = document.querySelector('.task-input-container')\n    const taskTextInput = document.querySelector('#task-text-input')\n    const applyTaskButtons = document.querySelectorAll('.apply-task')\n    const tasksContainer = document.querySelector('.tasks-container')\n\n\n\n    const timedProjects = document.querySelectorAll('.side-proj')\n    const applyProjectButtons = document.querySelectorAll('.apply-proj')\n    const addProjBtn = document.querySelector('.create-project')\n    const projInputContainer = document.querySelector('.proj-input-container')\n    const projTextInput = document.querySelector('#new-proj-text')\n    const allProjContainer = document.querySelector('.all-proj-container')\n\n\n\n\n    addTaskBtn.addEventListener('click', () => {\n        toggleAddTaskView(false)\n        taskTextInput.focus()\n    })\n    applyTaskButtons.forEach(button => {\n        button.addEventListener('click', () => {\n            handleApplyTask(button.textContent)\n        })\n    })\n\n    addProjBtn.addEventListener('click', () => {\n        toggleAddProjView(false)\n    })\n    applyProjectButtons.forEach(button => {\n        button.addEventListener('click', () => {\n            handleApplyProject(button.textContent)\n        })\n\n    })\n\n    timedProjects.forEach(button => {\n        button.addEventListener('click', (e) => {\n            handleProjectClick(e.target.textContent)\n        })\n    })\n\n    function handleProjectClick(projectName) {\n        if (projectName == 'Today') {\n            let todayArray = _data_manager__WEBPACK_IMPORTED_MODULE_0__.dataManager.filterArrayByDay(_data_manager__WEBPACK_IMPORTED_MODULE_0__.dataManager.allTasksProject.getTaskArray())\n            updateTodayArray(todayArray)\n            updateDomProjectDisp(todayArray)\n        }\n\n\n        function updateTodayArray(updatedArray){\n            \n            _data_manager__WEBPACK_IMPORTED_MODULE_0__.dataManager.todayProject.setTaskArray(updatedArray)\n            console.log(_data_manager__WEBPACK_IMPORTED_MODULE_0__.dataManager.todayProject.getTaskArray()[0].getName());\n        }\n\n        function updateDomProjectDisp(updatedArray){\n            const currentDisplayedTasks = document.querySelectorAll('task-container')\n            \n            currentDisplayedTasks.forEach(element =>{\n                element.remove()\n            })\n            if(projectName == 'Today'){\n                updatedArray.forEach(task =>{\n                    tasksContainer.appendChild(createDomTask(task))\n                })\n            }\n\n        }\n\n\n    }\n\n    function handleApplyTask(clickedButton) {\n        if (clickedButton == 'Save') {\n            let newTask = (0,_factories__WEBPACK_IMPORTED_MODULE_1__.Task)(taskTextInput.value)\n            let domTask = createDomTask(newTask)\n            tasksContainer.appendChild(domTask)\n            _data_manager__WEBPACK_IMPORTED_MODULE_0__.dataManager.addTask(newTask)\n\n        }\n        toggleAddTaskView(true)\n\n    }\n\n    function handleApplyProject(clickedButton) {\n        if (clickedButton == 'Save') {\n            let newProject = (0,_factories__WEBPACK_IMPORTED_MODULE_1__.Project)(projTextInput.value, [])\n            let domProject = createDomProject(newProject)\n            allProjContainer.append(domProject)\n        }\n\n        toggleAddProjView(true)\n    }\n\n    function createDomProject(newProject) {\n        const projectButton = document.createElement('button')\n        const projectText = document.createElement('span')\n        const projectIcon = document.createElement('span')\n        const projectDeleteIcon = document.createElement('span')\n        const rightProjSection = document.createElement('div')\n\n        rightProjSection.classList.add('right-proj-section')\n        projectButton.classList.add('side-proj')\n        projectButton.classList.add('custom-proj')\n\n        projectText.classList.add('side-text')\n        projectText.textContent = newProject.getName()\n\n        projectIcon.classList.add('side-icon')\n        projectIcon.classList.add('material-icons')\n        projectIcon.textContent = 'label'\n\n        projectDeleteIcon.classList.add('delete-proj-icon')\n        projectDeleteIcon.classList.add('material-icons')\n        projectDeleteIcon.textContent = 'close'\n\n        rightProjSection.append(projectIcon, projectText)\n        projectButton.append(rightProjSection, projectDeleteIcon)\n\n        return projectButton;\n    }\n\n\n    function createDomTask(newTask, newDate) {\n        let domTaskContainer = document.createElement('div')\n        let nameIconContainer = document.createElement('div')\n        let deleteDateContainer = document.createElement('div')\n        let isDoneIcon = document.createElement('span')\n        let taskName = document.createElement('p')\n        let dueDate = document.createElement('input')\n        let deleteBtn = document.createElement('span')\n\n        domTaskContainer.classList.add('task-container')\n        nameIconContainer.classList.add('name-icon-container')\n\n        isDoneIcon.classList.add('material-icons')\n        isDoneIcon.classList.add('addtask-icon')\n        isDoneIcon.textContent = 'check_box_outline_blank'\n\n        taskName.textContent = newTask.getName()\n        taskName.classList.add('task-name')\n\n        deleteDateContainer.classList.add('date-del-container')\n\n        dueDate.setAttribute('type', 'date')\n        dueDate.setAttribute('id', 'due-date')\n        dueDate.setAttribute('name', 'due-date')\n        dueDate.classList.add('due-date')\n        if (newDate != undefined && newDate != null) dueDate.value = newDate;\n\n        deleteBtn.classList.add('material-icons')\n        deleteBtn.classList.add('delete-task')\n        deleteBtn.textContent = 'delete'\n\n        deleteDateContainer.append(dueDate, deleteBtn)\n        nameIconContainer.append(isDoneIcon, taskName)\n        domTaskContainer.append(nameIconContainer, deleteDateContainer)\n\n        setDateDelListeners(deleteBtn, dueDate, taskName.textContent)\n\n        return domTaskContainer;\n\n\n\n\n\n    }\n\n    function setDateDelListeners(deleteTaskBtn, domDueDate, taskName) {\n        domDueDate.addEventListener('change', () => {\n            if (domDueDate !== undefined ) {\n                let dueDate = new Date(domDueDate.value)\n                let taskIndex = _data_manager__WEBPACK_IMPORTED_MODULE_0__.dataManager.allTasksProject.getTaskArray().findIndex(task =>{\n                    return task.getName() == taskName\n                })\n                console.log(dueDate);\n    ;\n                console.log(_data_manager__WEBPACK_IMPORTED_MODULE_0__.dataManager.allTasksProject.getTaskArray()[taskIndex]);\n                _data_manager__WEBPACK_IMPORTED_MODULE_0__.dataManager.allTasksProject.getTaskArray()[taskIndex].setDate(dueDate)\n            }\n\n        })\n        deleteTaskBtn.addEventListener('click', (e) => {\n            deleteTask(e, taskName)\n        })\n\n    }\n\n    function deleteTask(e, taskName, currentProject) {\n        _data_manager__WEBPACK_IMPORTED_MODULE_0__.dataManager.allTasksProject.deleteTask(taskName)\n        e.target.closest('.task-container').remove()\n        console.log(_data_manager__WEBPACK_IMPORTED_MODULE_0__.dataManager.allTasksProject.getTaskArray());\n    }\n\n\n    function toggleAddTaskView(showAdd) {\n        if (showAdd == false) {\n            addTaskBtn.style.display = 'none'\n            taskInputContainer.style.display = 'flex'\n        }\n        else if (showAdd == true) {\n            addTaskBtn.style.display = 'flex'\n            taskInputContainer.style.display = 'none'\n        }\n\n    }\n    function toggleAddProjView(showAdd) {\n        if (showAdd == false) {\n            addProjBtn.style.display = 'none'\n            projInputContainer.style.display = 'flex'\n        }\n        else if (showAdd == true) {\n            addProjBtn.style.display = 'flex'\n            projInputContainer.style.display = 'none'\n        }\n\n    }\n\n\n    return {\n\n    }\n\n})()\n\n\n\n\n//# sourceURL=webpack://to-do-project/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;