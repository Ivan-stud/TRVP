const calendarTable = document.querySelector('#calendarTable tbody');
const monthYear = document.getElementById('monthYear');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');
const todoContainer = document.getElementById('todoContainer');
const selectedDate = document.getElementById('selectedDate');
const todoList = document.getElementById('todoList');
const todoInput = document.getElementById('todoInput');
const addTodo = document.getElementById('addTodo');

let currentDate = new Date();
let todos = {};

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    monthYear.textContent = currentDate.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' });

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    calendarTable.innerHTML = '';

    let row = document.createElement('tr');
    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement('td'));
    }

    for (let day = 1; day <= lastDate; day++) {
        const cell = document.createElement('td');
        const cellDate = new Date(year, month, day);

        cell.textContent = day;
        cell.dataset.date = cellDate.toISOString().split('T')[0];

        if (cellDate.toDateString() === new Date().toDateString()) {
            cell.classList.add('today');
        }

        if (todos[cell.dataset.date]) {
            cell.classList.add('has-todos');
        }

        cell.addEventListener('click', () => openTodoList(cell.dataset.date));

        row.appendChild(cell);

        if ((firstDay + day) % 7 === 0 || day === lastDate) {
            calendarTable.appendChild(row);
            row = document.createElement('tr');
        }
    }
}

function openTodoList(date) {
    selectedDate.textContent = `Задачи для ${date}`;
    todoList.innerHTML = '';

    if (!todos[date] || todos[date].length === 0) {
        todoList.textContent = 'Планы отсутствуют!';
    } else {
        todos[date].forEach(task => {
            const item = document.createElement('div');
            item.textContent = task;
            todoList.appendChild(item);
        });
    }

    todoContainer.style.display = 'block';
    todoInput.dataset.date = date;
}

addTodo.addEventListener('click', () => {
    const date = todoInput.dataset.date;
    const task = todoInput.value.trim();

    if (task) {
        if (!todos[date]) {
            todos[date] = [];
        }
        todos[date].push(task);
        todoInput.value = '';
        renderCalendar();
        openTodoList(date);
    }
});

prevMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();