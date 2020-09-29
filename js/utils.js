export const getElement = (ele) => {
	const element = document.querySelector(ele);
	if (element) {
		return element;
	} else {
		console.log(`there is no such element`);
	}
};

export const showAlret = (className, message) => {
	const alret = getElement('.alret');
	alret.classList.add(className);
	alret.textContent = message;
	setTimeout(() => {
		alret.classList.remove(className);
	}, 1500);
};

export const clearAllTasks = () => {
	const tasksList = getElement('.tasks-list');
	const container = getElement('.tasks-container');
	tasksList.innerHTML = '';
	container.classList.remove('show-container');
	showAlret('alret-red', 'all tasks have been deleted!');
	localStorage.removeItem('tasks');
};
