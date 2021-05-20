import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { Box, Tooltip } from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { updateTasks, updateCurrentTask } from '../../app/actions/task';
import { updateTime, updateTimerType, updateCountDownKey } from '../../app/actions/timer';
import TaskOptions from './task_options';
import TIMER_TYPES from "../../app/constants/timer";
import EmptyState from '../core/empty_state';

// componente que muestra la lista de tareas pendientes
export default function TodoList({ filter, remainingTimeRef }) {

	const { tasks } = useSelector(state => state.task);

	const dispatch = useDispatch();

	// con este estado controlo la lista de tareas cuando se hace el Dragging de las tareas
	const [currentDraggingTaskId, setCurrentDraggingTaskId] = useState();

	// cuando las tareas son vacias el contador se mandar 0
	useEffect(() => {
		if(tasks.length === 0) {
			dispatch(updateTime(0));
			dispatch(updateCountDownKey());
		}
	}, [tasks, dispatch]);

	// este use memo filtra las tareas segun el tipo de tarea
	const filteredTasks = useMemo(() => {
		if(tasks.length === 0) {
			return []; }

		if(filter === 0) {
			return tasks; }

		if(filter === TIMER_TYPES.SHORT) {
			return tasks.filter(task => task.timerType <= TIMER_TYPES.SHORT); }

		if(filter === TIMER_TYPES.MEDIUM) {
			return tasks.filter(task => task.timerType >= TIMER_TYPES.SHORT && task.timerType <= TIMER_TYPES.LARGE); }

		if(filter === TIMER_TYPES.LARGE) {
			return tasks.filter(task => task.timerType > TIMER_TYPES.LARGE); }

		return tasks;
	}, [filter, tasks]);

	// filtro de las tareas no completadas que son las que se debe mostrar
	const filteredIncompletedtasks = useMemo(() => {
		if(filteredTasks.length === 0) {
			return []; }

		return filteredTasks.filter(task => !task.isCompleted);
	}, [filteredTasks]);

	// este efecto sirve para mandar la 1er tarea de la lista
	// como la tarea en curso
	useEffect(() => {
		if(filteredIncompletedtasks.length > 0) {
			const currentTask = filteredIncompletedtasks[0];
			// con el batch optimizo el renderizado
			// para que no sea multiple y solo se hace una vez
			batch(() => {
				dispatch(updateCurrentTask(currentTask));
				dispatch(updateTime(currentTask.duration));
				dispatch(updateTimerType(currentTask.timer_type));
				dispatch(updateCountDownKey());
			}); 
		}else {
			batch(() => {
				dispatch(updateCurrentTask(null));
				dispatch(updateTime(0));
				dispatch(updateCountDownKey());
			}); 
		}
	}, [filteredIncompletedtasks, dispatch]);

	// esta funcion se ejecuta al iniciar el arrastrado de una tarea
	function handleOnDragStart(result) {
		setCurrentDraggingTaskId(result.draggableId);
	}

	// esta funcion se ejecuta al finalizar el arrastrado de una tarea
	// y envio la primera como la tarea en curso
	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const tasksCopy = Array.from(filteredIncompletedtasks);
		const [ reorderedItem ] = tasksCopy.splice(result.source.index, 1);
		tasksCopy.splice(result.destination.index, 0, reorderedItem);

		dispatch(updateTasks(tasksCopy));
		setCurrentDraggingTaskId(null);
	}

	// si no hay tareas por hacer muestra un empty state
	if(!Array.isArray(filteredIncompletedtasks) || filteredIncompletedtasks.length === 0) {
		return <EmptyState />;
	}

 	return <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
		<Droppable droppableId="tasks">
			{(provided) => (
			<div {...provided.droppableProps} ref={provided.innerRef}>
				{
					filteredIncompletedtasks.map((task, index) => {
						return <Draggable key={task.id} draggableId={task.id} index={index}>
							{
								(provided) => (
									<div className={
										`todo-item mb-3 p-2 rounded-border 
										${(task.id === currentDraggingTaskId) 
											? 'bg-light-blue text-blue'
											: ''}`
									}
									ref={provided.innerRef} 
										{...provided.draggableProps} 
										{...provided.dragHandleProps}>
										<Tooltip title={task.description}>
											<Box display="flex" 
												justifyContent="space-between"
												alignItems="center">
												<h3>{ task.title }</h3>
												<TaskOptions task={task} remainingTimeRef={remainingTimeRef} />
											</Box>
										</Tooltip>
									</div>
								)
							}
						</Draggable>
					})
				}
				{provided.placeholder}
			</div>
			)}
		</Droppable>
	</DragDropContext>

}
