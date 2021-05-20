import { types } from "../../app/types";

// esta prueba me ayuda para tener un control de los types
// que debo de tener.
describe('Pruebas en types', () => {
	// evalua que los types sean iguales al objeto que le envio
	// que son los mismos types que estan en el archivo types.js
	test('los types deben ser iguales', () => {
		expect(types).toEqual({

			// tipos de acciones para controlar el estado de temporizador
			runTimer: '[timer] Run timer',
			stopTimer: '[timer] Stop timer',
			updateTimerType: '[timer] Update timer type',
			updateTime: '[timer] Update time',
			updateCountDownKey: '[timer] Update count down key',
		
			// tipos de acciones para controlar el estado de las tareas
			openTaskFormModal: '[task] Open task form modal',
			closeTaskFormModal: '[task] Close task form modal',
			addTask: '[task] Add task',
			requestAddTask: '[task] Request add task',
			updateTask: '[task] Update task',
			requestUpdateTask: '[task] Request update task',
			deleteTask: '[task] Delete task',
			requestDeleteTask: '[task] Request delete task',
			updateCurrentTask: '[task] Update current task',
			updateTasks: '[task] Update tasks',
			requestUpdateTasks: '[task] Request update tasks',
			openTasksReportModal: '[task] Open tasks report modal',
			closeTasksReportModal: '[task] Close tasks report modal'
			
		});
	})

});
