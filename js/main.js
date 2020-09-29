import { getElement, clearAllTasks } from '../js/utils.js';
import { submitForm, tasks, displayTasks } from '../js/submitForm.js';

const Form = getElement('.todo-form');
const clearAll = getElement('.clear-all');
const tasksList = getElement('.tasks-list');

Form.addEventListener('submit', submitForm);
clearAll.addEventListener('click', clearAllTasks);
window.addEventListener('DOMContaentLoaded', displayTasksDOM(tasks));

function displayTasksDOM(tasks) {
	if (tasks.length > 0) {
		tasks.forEach((task) => {
			displayTasks(task.value, task.id);
		});
	}

}
