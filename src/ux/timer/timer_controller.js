import React from 'react';
import { runTimer, stopTimer, updateTime, updateCountDownKey } from '../../app/actions/timer';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton } from '@material-ui/core';
import { Pause, PlayArrow, Replay } from '@material-ui/icons';
import TIMER_TYPES from "../../app/constants/timer";
import TIME_TYPES from "../../app/constants/time";

// este componente es el que controla el temporizador 
// con las acciones de correr, parar y resetear el temporizador
export default function TimerOptions() {

	const dispatch = useDispatch();

	const { timerType } = useSelector(state => state.timer);

	const { tasks } = useSelector(state => state.task);

	function handleRunTimer() {
		dispatch(runTimer());
	}

	function handleStopTimer() {
		dispatch(stopTimer());
	}

	function handleResetTimer() {
		dispatch(stopTimer());
		
		// se actualiza el countDownKey para que se actualize la prop key
		// del temporizador y asi actualizar la renderizacion del tiempo
		dispatch(updateCountDownKey());

		switch (timerType) {
			case TIMER_TYPES.SHORT:
				dispatch(updateTime(TIME_TYPES.SHORT_TIME));
				break;
			case TIMER_TYPES.MEDIUM:
				dispatch(updateTime(TIME_TYPES.MEDIUM_TIME));
				break;
			case TIMER_TYPES.LARGE:
				dispatch(updateTime(TIME_TYPES.LARGE_TIME));
				break;
			default:
				break;
		}
	}

	return <div className="mt-5 pl-5 pr-5">
		<Box display="flex" justifyContent="space-around" alignItems="center">
			<IconButton variant="contained" className="text-light-blue"
				onClick={handleRunTimer} disabled={tasks.length === 0}>
				<PlayArrow fontSize="large" />
			</IconButton>
			<IconButton variant="contained" className="text-light-blue"
				onClick={handleStopTimer} disabled={tasks.length === 0}>
				<Pause fontSize="large" />
			</IconButton>
			<IconButton variant="contained" className="text-light-blue"
				onClick={handleResetTimer} disabled={tasks.length === 0}>
				<Replay fontSize="large" />
			</IconButton>
		</Box>
	</div>

}
