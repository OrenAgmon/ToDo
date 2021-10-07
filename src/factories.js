const Task = function (taskName, dueDate){

    const isUrgent = false;

    getName = () => taskName;
    setName = (newName) => {
        taskName = newName;
    }

    getDate = () => dueDate;
    setDate = (newDate) => {
        dueDate = newDate;
    }

    toggleUrgent = () => isUrgent = !isUrgent

    return{
        getName, setName, getDate, setDate, toggleUrgent
    }
    
}

const Project  = (taskArray) =>{
    
}