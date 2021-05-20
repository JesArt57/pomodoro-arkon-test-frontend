import React, { useState, useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { openTaskFormModal, updateCurrentTask, requestUpdateTasks } from '../../app/actions/task';
import { Box, Button, MenuItem, Select } from '@material-ui/core';
import { Add, Search } from '@material-ui/icons';
import TaskForm from './task_form';
import TodoList from './todo_list';
import TIMER_TYPES from '../../app/constants/timer';
import TaskReport from './task_report';

export default function Tasks({ remainingTimeRef }) {

	const { tasks } = useSelector(state => state.task);

	const dispatch = useDispatch();

	const [filter, setFilter] = useState(0);
	// funcion para actualizar las tarea es decir llena las tareas del estado
	// con las que tiene API
	useEffect(() => {
		dispatch(requestUpdateTasks());
	}, [dispatch]);
	
	function handleOpenTaskFormModal() {
		batch(() => {
			dispatch(updateCurrentTask(null));
			dispatch(openTaskFormModal());
		});
	}

	function onSelectChange({ target: { value } }) {
		setFilter(value);
	}

	return <div className="mt-4">
		<div className="pb-2 border-bottom-light-blue mb-3">
			<Box display="flex" justifyContent="space-between" alignItems="center" 
				className="task-options">
				<h2 className="text-red">Tareas</h2>
				<Box display="flex" alignItems="center">
					<Select value={filter}
							IconComponent={Search}
							className="w-100 text-white"
							label="filtrar"
							style={{ minWidth: '7rem' }}
							onChange={onSelectChange}
							disabled={tasks.length === 0}
							>
						<MenuItem value={0}>Todas</MenuItem>
						<MenuItem value={TIMER_TYPES.SHORT}>Corta</MenuItem>
						<MenuItem value={TIMER_TYPES.MEDIUM}>Media</MenuItem>
						<MenuItem value={TIMER_TYPES.LARGE}>Larga</MenuItem>
					</Select>
					<div className="ml-3" />
					<Button startIcon={<Add />} className="text-white" 
						style={{ minWidth: '9.8rem' }}
						onClick={handleOpenTaskFormModal}>
						Agregar Tarea
					</Button>
				</Box>
			</Box>
		</div>
		<TodoList filter={filter} remainingTimeRef={remainingTimeRef} />
		<TaskForm />
		<TaskReport />
	</div>

}



