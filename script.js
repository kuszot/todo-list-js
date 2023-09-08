const taskInput = document.getElementById('text-field');

function init(){
    const taskList = document.getElementById('to-do-list');
    let tasks = initializeTasks();

    tasks.forEach(element => {
        if(!element.name) return;
        const task = document.createElement('li')
        const span = document.createElement('span');
        span.innerHTML = "\u00d7";
        task.textContent = element.name;
        taskList.appendChild(task);
        task.appendChild(span);
        task.dataset.id = element.id;
        if(element.done){
            task.classList.toggle('checked');
        }
    });
    
    function addTask(taskName){
        if (taskName === '') return;
        const task = document.createElement('li');
        const span = document.createElement('span');
        span.innerHTML = "\u00d7";
        task.textContent = taskName;
        task.appendChild(span);
        task.dataset.id = tasks.length;
        taskList.appendChild(task);
        tasks = updateTasks([...tasks, {name:taskName, done: false, id: task.dataset.id}]);
    }

    taskInput.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
            addTask(taskInput.value);
            taskInput.value = '';
        };
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI'){
            e.target.classList.toggle('checked');
            tasks = updateTasks(tasks.map((task) => {
                if (task.id === e.target.dataset.id){
                    return {...task, done: !task.done}
                }
                return task;
            }));
        } else if (e.target.tagName === 'SPAN'){
            console.log(updateTasks(tasks.filter((task) => console.log(task.id, e.target.parentElement.dataset.id))));
            tasks = updateTasks(tasks.filter((task) => task.id !== e.target.parentElement.dataset.id))
            e.target.parentElement.remove();
        }
    });
}


const initializeTasks = () => {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
        return JSON.parse(tasks)
    };
    return [];
}

const updateTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return tasks;
}

init();
taskInput.focus();
