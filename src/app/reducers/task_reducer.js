import { types } from "../types";

// inicializando el estado de la app
const initialState = {
	isOpenTaskFormModal: false,
	tasks: [],
	currentTask: null, // esta es la tarea en curso
	isOpenTasksReportModal: false,
}

// creando el reducer
export function taskReducer(state = initialState, action) {
	// switch para saber que acción debe ejecutar el reducer
	switch (action.type) {
		case types.openTaskFormModal:
			return {
				...state,
				isOpenTaskFormModal: true
			}
		case types.closeTaskFormModal:
			return {
				...state,
				isOpenTaskFormModal: false
			}
		case types.addTask:
			return {
				...state,
				tasks: [action.payload, ...state.tasks]
			}
		case types.updateTask:
			return {
				...state,
				tasks: state.tasks.map(task => {
					if(task.id === action.payload.id) {
						return action.payload;
					}

					return task;
				})
			}
		case types.deleteTask:
			return {
				...state,
				tasks: state.tasks.filter(task => task.id !== action.payload)
			}
		case types.updateCurrentTask:
			return {
				...state,
				currentTask: action.payload
			}
		case types.updateTasks:
			return {
				...state,
				tasks: action.payload
			}
		case types.openTasksReportModal:
			return {
				...state,
				isOpenTasksReportModal: true
			}
		case types.closeTasksReportModal:
			return {
				...state,
				isOpenTasksReportModal: false
				}
		default:
			return state;
	}

}
