import { types } from "../types";
import { fetchFunction } from "../helpers/fetch";
import Swal from "sweetalert2";

// declarando acciones para manipular el estado de las tareas
export const openTaskFormModal = () => ({ type: types.openTaskFormModal });

export const closeTaskFormModal = () => ({ type: types.closeTaskFormModal });

// esta es la accion asincrona para mandar la peticion de
// guardar una tarea en la BD y en el state de redux hago uso de fetchFunction
export const requestAddTask = (task) => {

	return async(dispatch) => {
		
		try {
			const response = await fetchFunction('tasks', task, 'POST');

			const body = await response.json();

			if(body.ok) {
				task.id = body.task.id;
				dispatch(addTask(task));
			}
		} catch (error) {
			console.log('error')
		}

	}

}

// esta accion es para agregar una tarea al estado de redux
export const addTask = (task) => ({ 
	type: types.addTask,
	payload: task
});

// esta es la accion para actualizar la lista de tareas en BD y en el state de redux
export function requestUpdateTasks() {

	return async(dispatch) => {
		
		try {
			
			const response = await fetchFunction('tasks');

			const body = await response.json();

			const tasks = body.tasks;

			dispatch(updateTasks(tasks));

		} catch (error) {

			console.log(error);
			
		}

	}

}

// accion para modificar las tareas en redux
export const updateTasks = (tasks) => ({ 
	type: types.updateTasks,
	payload: tasks
});

// esta accion actualiza una tarea en la BD y en el state de redux
export function requestUpdateTask(task) {

	return async(dispatch) => {
		
		try {
			
			const response = await fetchFunction(`tasks/${task.id}`, task, 'PUT');

			const body = await response.json();

			if(body.ok) {
				dispatch(updateTask(task));
			}else {
				Swal.fire('Error', 'Ha ocurrido un error al actualizar la tarea', 'error');
			}

		} catch (error) {
			console.log(error);
		}

	}

}

// esta accion actualiza una tarea en redux
const updateTask = (task) => ({ 
	type: types.updateTask,
	payload: task
});

// esta accion elimina una tarea en BD y en el state de redux
export function requestDeleteTask(taskId) {

	return async(dispatch) => {

		try {
			
			const response = await fetchFunction(`tasks/${taskId}`, {}, 'DELETE');

			const body = await response.json();

			if(body.ok) {
				dispatch(deleteTask(taskId));
			}else {
				Swal.fire('Error', body.msg, 'error');
			}

		} catch (error) {
			console.log(error);
		}

	}

}

// esta accion elimina una tarea en redux
const deleteTask = (taskId) => ({ 
	type: types.deleteTask,
	payload: taskId
});

// esta accion actualiza la tarea en curso en redux
export const updateCurrentTask = (task) => ({ 
	type: types.updateCurrentTask,
	payload: task
});

// estas acciones manipulan el estado que controla la apertura
// y cierre del modal de reporte de tareas en redux
export const openTasksReportModal = () => ({ type: types.openTasksReportModal });

export const closeTasksReportModal = () => ({ type: types.closeTasksReportModal });
