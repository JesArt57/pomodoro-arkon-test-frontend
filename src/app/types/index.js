// definiendo los tipos de acciones
export const types = {

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
	
}
