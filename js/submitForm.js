import { getElement, showAlret } from '../js/utils.js';
import { getTasks, setTasks } from '../js/localStorage.js';

const container = getElement('.tasks-container');
const tasksList = getElement('.tasks-list');
const taskInput = getElement('.task-input');
const submitBtn = getElement('.submit-btn');

//edit task variables
let editFlag = false;
let editID;
let editedElement;

export let tasks = getTasks();

export const submitForm = (e) => {
	e.preventDefault();
	let value = taskInput.value;
	value = value.toLowerCase();
	let alreadyAdded = tasks.find((task) => task.value === value);
	let id = new Date().getTime().toString();

	if (value != '' && !editFlag) {
		if (alreadyAdded) {
			showAlret('alret-red', 'Sorry, task already added before!');
		} else {
			let newTask = { id, value };
			tasks.push(newTask);
			displayTasks(value, id);
			showAlret('alret-green', 'Task has been added!');
			setTasks(tasks);
			setDefualt();
		}
	} else if (value != '' && editFlag) {
		editedElement.textContent = value;
		let editLocalStorage = tasks.find((task) => {
			return task.id === editID;
		});
		editLocalStorage.value = value;
		showAlret('alret-green', 'Task has been edited!');
		setTasks(tasks);
		setDefualt();
	} else {
		showAlret('alret-red', 'Sorry, no task entred!');
	}
};

//
//display tasks
export const displayTasks = (value, taskID) => {
	const task = document.createElement('div');
	const ID = document.createAttribute('data-id');
	ID.value = taskID;
	task.classList.add('task');
	task.setAttributeNode(ID);
	task.innerHTML = `<p class="task-desc">${value}</p>
 <div class="task-btns">
  <button class="edit-btn btn">
   Edit
  </button>
  <button class="delete-btn btn">
   Delete
  </button>
 </div>`;

	const editBtn = task.querySelector('.edit-btn');
	editBtn.addEventListener('click', editTask);
	const deleteBtn = task.querySelector('.delete-btn');
	deleteBtn.addEventListener('click', deleteTask);

	tasksList.appendChild(task);
	container.classList.add('show-container');

	if (tasksList.children.length > 3) {
		tasksList.classList.add('show-scroll');
	} else {
		tasksList.classList.remove('show-scroll');
	}
};

//edit task
const editTask = (e) => {
	let parentElement = e.currentTarget.parentElement.parentElement;
	editedElement = e.currentTarget.parentElement.previousElementSibling;
	editFlag = true;
	taskInput.value = editedElement.textContent;
	editID = parentElement.dataset.id;
	submitBtn.value = e.currentTarget.textContent;
};

//delete task
const deleteTask = (e) => {
	let element = e.currentTarget.parentElement.parentElement;
	let elementID = element.dataset.id;
	element.remove();
	showAlret('alret-red', 'Task has been deleted!');
	tasks = tasks.filter((task) => {
		return task.id !== elementID;
	});
	setTasks(tasks);
	if (tasksList.children.length === 0) {
		container.classList.remove('show-container');
	}
};

//set defualt
function setDefualt() {
	taskInput.value = '';
	editID = '';
	editFlag = false;
	submitBtn.value = 'Submit';
}
