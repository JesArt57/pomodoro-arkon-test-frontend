import React from 'react';
import { batch, useDispatch } from 'react-redux';
import { 
	requestUpdateTask, 
	requestDeleteTask, 
	updateCurrentTask, 
	openTaskFormModal 
} from '../../app/actions/task';
import { Box, Switch, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

// este componente es el que se encarga de realizar las acciones de las tareas aun no completadas
export default function TaskOptions({ task, remainingTimeRef }) {

	const dispatch = useDispatch();
	// esta funcion sirve para cuando marcan una tarea como completa poder actualizar su estado
	// y aqui uso la referencia que puse en el componente padre de la App para tomar el tiempo
	// que tardo en realizarla
	function handleCompleteTask() {
		dispatch(requestUpdateTask({
			...task,
			isCompleted: true,
			completedTime: remainingTimeRef.current
		}));
	}

	function handleDeleteTask() {
		dispatch(requestDeleteTask(task.id));
	}

	function handleUpdateTask() {
		batch(() => {
			dispatch(updateCurrentTask(task));
			dispatch(openTaskFormModal());
		});
		
	}

	return <Box display="flex" justifyContent="space-between" alignItems="center">
		<Switch
			checked={task.isCompleted}
			onChange={handleCompleteTask}
			inputProps={{ 'aria-label': 'primary  checkbox' }}
		/>
		<IconButton variant="contained" className="text-white"
			onClick={handleUpdateTask}>
			<Edit className="text-dark-blue" />
		</IconButton>
		<IconButton variant="contained" className="text-white" onClick={handleDeleteTask}>
			<Delete className="text-dark-blue" />
		</IconButton>
	</Box>
}
