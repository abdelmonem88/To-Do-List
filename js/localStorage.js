export const getTasks = () => {
	let tasks = localStorage.getItem('tasks');
	if (tasks) {
		tasks = JSON.parse(localStorage.getItem('tasks'));
		return tasks;
	} else {
		return [];
	}
};

export const setTasks = (ele) => {
	localStorage.setItem('tasks', JSON.stringify(ele));
};
