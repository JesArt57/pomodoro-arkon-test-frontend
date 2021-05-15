import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TIMER_TYPES from '../../app/constants/timer';
import TIME_TYPES from '../../app/constants/time';
import { updateTimerType, updateCountDownKey, updateTime, stopTimer, updateCustomTime } from '../../app/actions/timer';
import { Box, Button } from '@material-ui/core';

export default function TimerController() {

	const dispatch = useDispatch();

	const { timerType, customTime } = useSelector(state => state.timer);

	const isUpdatingTimerTypeRef = useRef(false);

	// cada que cambie el tipo de tiempo se debe actualizar el tiempo
	// no lo meti en handleTimerType porque esa funcion ya tiene
	// muchas responsabilidades y se hace mas dificil la lectura del código
	// además de aplicar transparencia referencial de clean code
	useEffect(() => {
		if(isUpdatingTimerTypeRef.current === false) {
			return; }

		isUpdatingTimerTypeRef.current = false;

		if(timerType === TIMER_TYPES.SHORT) {
			dispatch(updateTime(TIME_TYPES.SHORT_TIME));
			dispatch(updateCountDownKey());
			return;
		}

		if(timerType === TIMER_TYPES.MEDIUM) {
			dispatch(updateTime(TIME_TYPES.MEDIUM_TIME));
			dispatch(updateCountDownKey());
			return;
		}

		if(timerType === TIMER_TYPES.LARGE) {
			dispatch(updateTime(TIME_TYPES.LARGE_TIME));
			dispatch(updateCountDownKey());
			return;
		}

		if(timerType === TIMER_TYPES.CUSTOM) {
			dispatch(updateCountDownKey());
			return;
		}
	}, [timerType, customTime, dispatch]);

	// funcion que modifica el tipo de tiempo 
	// aplicando el método de clausulas de guarda de clean code
	// para evitar el uso de else y anidaciones, es una sustitución del switch
	function handleTimerType(type) {
		isUpdatingTimerTypeRef.current = true;
		dispatch(stopTimer());

		if(type === TIMER_TYPES.SHORT) {
			dispatch(updateTimerType(TIMER_TYPES.SHORT));
			return;
		}

		if(type === TIMER_TYPES.MEDIUM) {
			dispatch(updateTimerType(TIMER_TYPES.MEDIUM));
			return;
		}

		if(type === TIMER_TYPES.LARGE) {
			dispatch(updateTimerType(TIMER_TYPES.LARGE));
			return;
		}

		if(type === TIMER_TYPES.CUSTOM) {
			dispatch(updateTimerType(TIMER_TYPES.CUSTOM));
			return;
		}
	}

	return <div className="nav-buttons p-2 bg-dark">
		<Box display="flex" justifyContent="space-around" alignItems="center" className="nav-buttons">
			<Button variant="contained" className="bg-red button-group text-light-blue"
				onClick={() => handleTimerType(TIMER_TYPES.LARGE)}>
				Largo
			</Button>
			<Button variant="contained" className="bg-red button-group text-light-blue"
				onClick={() => handleTimerType(TIMER_TYPES.MEDIUM)}>
				Medio
			</Button>
			<Button variant="contained" className="bg-red button-group text-light-blue"
				onClick={() => handleTimerType(TIMER_TYPES.SHORT)}>
				Corto
			</Button>
			<Button variant="contained" className="bg-red button-group text-light-blue"
				onClick={() => handleTimerType(TIMER_TYPES.CUSTOM)}>
				Personalizado
			</Button>
		</Box>
	</div>

}
