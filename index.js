const addBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
let listTasks = [];
let checkedState = [];

addBtn.addEventListener('click', renderTask);

function renderTask() {
    if (taskInput.value) { 
        listTasks.push(taskInput.value);
        checkedState.push(false);
        render(listTasks);
        taskInput.value = "";
    }
}

function render(tasks) {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const listItem = document.createElement('div');
        listItem.className = 'check';
        listItem.innerHTML = `
            <input type="checkbox" name="checkBox" id="checkBox${index}" ${checkedState[index] ? 'checked' : ''}>
            <li>
                <p class="checktask ${checkedState[index] ? 'highlight' : ''}" id="task${index}">${task}</p>
            </li>
            <button type="submit" class="deleteBtn" id="delete${index}">Delete</button>
        `;
        taskList.appendChild(listItem);
    });

    const deleteTasks = document.querySelectorAll('button[type="submit"]');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', (e) => highlightCheckedOption(e, index));
    });

    deleteTasks.forEach((submission, index) => {
        submission.addEventListener('click', (e) => deleteCheckedOption(e, index));
    });
}

function highlightCheckedOption(e, index) {
    const checkbox = e.target;
    const task = checkbox.parentElement.querySelector('.checktask');

    if (checkbox.checked) { 
        task.classList.add('highlight');
        checkedState[index] = true
    } else {
        task.classList.remove('highlight');
        checkedState[index] = false
    }
}

function deleteCheckedOption(e) {
    const button = e.target;
    const taskIndex = button.id.replace('delete', '');
    listTasks.splice(taskIndex, 1);
    render(listTasks);
}
