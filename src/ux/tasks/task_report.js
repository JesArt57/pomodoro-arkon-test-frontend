import React, { Fragment, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonGroup, Button, Grid, TextField } from '@material-ui/core';
import Modal from 'react-modal';
import { Search } from '@material-ui/icons';
import { closeTasksReportModal, requestDeleteTask } from '../../app/actions/task';
import es from 'dayjs/locale/es';
import dayjs from 'dayjs';
import ChartComponent from './chart';
import CompletedTasks from './completed_tasks';

const customStyles = {
    content : {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		height: 500
    }
};

Modal.setAppElement('#root');

const daysOfWeek = ["Lun","Mar","Mie","Jue","Vie","Sab","Dom"];
// este es el reporte de las tareas (gráfica e historial de tareas completadas)
export default function TaskReport() {

	const { isOpenTasksReportModal } = useSelector(state => state.task);

	const { tasks } = useSelector(state => state.task);

	const dispatch = useDispatch();
	
	const [isShowGraph, setIsShowGraph] = useState(true);

	const [filter, setFilter] = useState('');

	const activeStyle = 'bg-red text-white';

	// este useMemo es el que hace el filtro por nombre
	const filteredTasks = useMemo(() => {
		if(tasks.length === 0) {
			return tasks; }

		const completedTasks = tasks.filter(task => task.isCompleted);

		if(filter && filter.length > 0 && !isShowGraph) {
			return completedTasks.filter(task => task.title.toLowerCase().trim().includes(filter));
		}

		return completedTasks;
 	}, [tasks, filter, isShowGraph]);

	 // aqui saco las tareas de la ultima semana contando desde hoy
	const filteredTasksByLastWeek = useMemo(() => {
		if(tasks.length > 0) {

			const lastSevenDayOfWeek = [0,1,2,3,4,5,6].reduce((days, day) => {
				days.push(dayjs().subtract(day, 'day').date());

				return days;
			}, []);

			const completedTasks = tasks.filter(task => task.isCompleted 
				&& lastSevenDayOfWeek.includes(dayjs(task.createdAt).date()));

			const incompletedTasks = tasks.filter(task => !task.isCompleted 
				&& lastSevenDayOfWeek.includes(dayjs(task.createdAt).date()))

			return { completedTasks, incompletedTasks };
		}
	}, [tasks]);

	// aqui construyo apartir de las tareas de esta ultima semana los datos para la grafica
	// separo las completas de las incompletas
	const buildTasksForGraph = useMemo(() => {
		if(!(typeof filteredTasksByLastWeek === "object")) {
			return; }

		const completedTasksByDayOfWeek = [1,2,3,4,5,6,7].map(
			day => filteredTasksByLastWeek.completedTasks.filter(task => dayjs(task.createdAt).day() === day));

		const incompletedTasksByDayOfWeek = [1,2,3,4,5,6,7].map(
			day => filteredTasksByLastWeek.incompletedTasks.filter(task => dayjs(task.createdAt).day() === day));


		const completedTasks = daysOfWeek.map((day, index) => ({ x: day, y: completedTasksByDayOfWeek[index].length }));
		
		const incompletedTasks = daysOfWeek.map((day, index) => ({ x: day, y: incompletedTasksByDayOfWeek[index].length }));

		return { completedTasks, incompletedTasks }
	}, [filteredTasksByLastWeek]);

	const startDate = dayjs().subtract(7, 'day').format('DD/MM/YYYY', es);
	const endDate = dayjs().format('DD/MM/YYYY', es);

	function handleCloseTasksReportModal() {
		dispatch(closeTasksReportModal());
	}

	function handleDeleteTask(taskId) {
		dispatch(requestDeleteTask(taskId));
	}

	return <Modal isOpen={isOpenTasksReportModal} style={customStyles}
		closeTimeoutMS={200}
		onRequestClose={handleCloseTasksReportModal}
		className="modal w-100"
		overlayClassName="background-modal">
		<h2 className="text-center text-dark-blue mb-4">Reporte de Tareas</h2>
		<ButtonGroup aria-label="button group"
			 className="w-100 text-center">
			<Button className={`w-50 ${isShowGraph ? activeStyle : ''}`} onClick={() => setIsShowGraph(true)}>
				Gráfica
			</Button>
			<Button className={`w-50 ${isShowGraph ? '' : activeStyle}`} onClick={() => setIsShowGraph(false)}>
				Tareas Completadas
			</Button>
		</ButtonGroup>
		<div className="mt-4">
			{
				(isShowGraph)
					? <ChartComponent tasks={tasks} startDate={startDate} endDate={endDate} 
						filteredTasksByLastWeek={filteredTasksByLastWeek} 
						buildTasksForGraph={buildTasksForGraph} /> 
					: <Fragment>
						<Grid container spacing={1} alignItems="flex-end">
							<Grid item>
								<Search />
							</Grid>
							<Grid item>
								<TextField id="input-with-icon-grid" label="Busca una tarea"
									onChange={event => setFilter(event.target.value)}
									value={filter} />
							</Grid>
						</Grid>
						<div className="mt-3" />
						<CompletedTasks tasks={filteredTasks} handleDeleteTask={handleDeleteTask} />
					</Fragment>
			}			
		</div>
	</Modal>

}
