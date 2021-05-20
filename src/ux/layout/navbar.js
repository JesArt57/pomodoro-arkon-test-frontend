import React from 'react';
import { useDispatch } from 'react-redux';
import { openTasksReportModal, requestAddTask } from '../../app/actions/task';
import { Equalizer, Send } from '@material-ui/icons';
import { Button, Box } from '@material-ui/core';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

// este componente es la barra de navegación de la app
export default function Navbar() {

	const dispatch = useDispatch();

	function handleOpenTasksReportModal() {
		dispatch(openTasksReportModal());
	}
	// esta funcion crea las 50 tareas random
	function createRandomTasks() {
		// creaun arreglo con 50 posiciones vacias y contruye la tarea
		// con datos variables
		const randomTasks = [...Array(50)].map((task, index) => ({
			title: `Tarea ${index + 1}`,
			description: `Esta es la tarea aleatoria ${index + 1}`,
			duration: 1500 + index,
			timerType: 1,
			isCompleted: true,
			createdAt: dayjs().subtract(index, 'hour'),
			completedTime: Math.floor(((1500 + index) * getRandomInt()) / 100)
		}));
		// hace las peticiones para guardar las tareas
		randomTasks.forEach((task, index) => {
			if(index === 49) {
				Swal.fire('Tareas aleatorias', 'Tareas creadas con éxito', 'success');
			}

			dispatch(requestAddTask(task))
		});
	
	}

	return <nav className="border-bottom-light-blue navbar p-3">
		<Box display="flex" justifyContent="space-between">
			<h1 className="text-red">Pomodoro Arkon Test</h1>
			<Box display="flex" alignItems="center">
				<Button variant="contained" startIcon={<Equalizer />}
					onClick={handleOpenTasksReportModal}>
					Reporte
				</Button>
				<div className="mr-3" />
				<Button variant="contained" startIcon={<Send />}
					onClick={createRandomTasks}>
					Crear tareas aleatorias
				</Button>
			</Box>
		</Box>
	</nav>

}
// funcion para generar un numero random entero de 80 a 100
function getRandomInt() {
	return Math.floor(Math.random() * (100 - 80)) + 80;
}
