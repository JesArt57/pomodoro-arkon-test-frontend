import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestUpdateTask } from '../../app/actions/task';
import { stopTimer } from '../../app/actions/timer';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Swal from 'sweetalert2';

// este componente es el temporizador
export default function CountDownTimer({ children }) {

	const { 
		isRunningTimer, 
		countDownKey, 
		time
	} = useSelector(state => state.timer);

	const { currentTask } = useSelector(state => state.task);

	const dispatch = useDispatch();

	// al finalizar la tarea la marca como completada y con la referencia
	// actualizo el tiempo que le tomo
	function onComplete() {
		dispatch(stopTimer());

		dispatch(requestUpdateTask({
			...currentTask,
			isCompleted: true,
			completedTime: Math.floor(currentTask.duration * 60)
		}));
		
		Swal.fire('Tarea completa', 'El tiempo de la tarea actual ha finalizado', 'info');
	}

	return <CountdownCircleTimer
		key={countDownKey}
		isPlaying={isRunningTimer}
		onComplete={onComplete}
		duration={time * 60}
		strokeWidth={6}
		size={250}
		colors={[["#f73859", 0.33], ["#f73859", 0.33], ["#f73859", 0.33]]}
		trailColor="#61dafb">
		{children}
	</CountdownCircleTimer>

}
