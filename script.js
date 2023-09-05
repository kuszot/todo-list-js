const initialieTasks = () => {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
        return JSON.parse(tasks);
    }
    return tasks;
}

const updateTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return tasks;
}


function init() {
    let tasks = initialieTasks();

    const textField = document.getElementById('text-field');
    const toDoList = document.getElementById('to-do-list');

    tasks.forEach(element => {
        if(!element.name) return;
        const task = document.createElement('li')
        const span = document.createElement('span');
        span.innerHTML = "\u00d7";
        task.textContent = element.name;
        toDoList.appendChild(task);
        task.appendChild(span);
        if(element.done){
            task.classList.toggle('checked');
        }
        textField.value = '';
    });





    function addTask(taskName) {
        if(taskName === ''){
            return
        }
        const task = document.createElement('li')
        const span = document.createElement('span');
        span.innerHTML = "\u00d7";
        task.textContent = taskName;
        toDoList.appendChild(task);
        task.appendChild(span);
        textField.value = '';
        tasks = updateTasks([...tasks, {name: taskName, done: false}])
    }


    
    textField.addEventListener('keydown', (e) => {
        if(e.key==="Enter"){
            addTask(textField.value);
        }
    })
    toDoList.addEventListener('click', (e) => {
        if(e.target.tagName==="LI"){
            e.target.classList.toggle('checked');
            
            tasks = updateTasks(tasks.map(task => {
                if(`${task.name}\u00d7` === e.target.textContent){
                    return {...task, done: !task.done}
                }
                return task;
            }))

        }else if(e.target.tagName==="SPAN"){
            tasks = updateTasks(tasks.filter(task => `${task.name}\u00d7` != e.target.parentElement.textContent))
            e.target.parentElement.remove();
        }

    });
}
init();
const inputField = document.getElementById('text-field');

//autofocus on field
inputField.focus();