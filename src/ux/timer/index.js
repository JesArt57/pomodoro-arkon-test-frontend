import React from 'react';
import TimerController from './timer_controller';
import CountDownTimer from './count_down_timer';

export default function Timer({ remainingTimeRef }) {

	// funcion que recibe el componente de CountdownCircleTimer
	// para mostrar el tiempo y la aproveche para actualizar
	// el tiempo en la referencia que ocupo para determinar el tiempo
	// que tomo hacer la tarea
	function timerChildren({ remainingTime }) {
		remainingTimeRef.current = remainingTime;

		const hours = `${Math.floor(remainingTime / 3600)}`.length === 1
			? "0" + Math.floor(remainingTime / 3600) 
			: '' + Math.floor(remainingTime / 3600);

		const minutes = `${Math.floor((remainingTime % 3600) / 60)}`.length === 1
			? "0" + Math.floor((remainingTime % 3600) / 60) 
			: '' + Math.floor((remainingTime % 3600) / 60);

		const seconds = `${remainingTime % 60}`.length === 1
			? "0" + remainingTime % 60 
			: '' + remainingTime % 60;
		
		return `${hours}:${minutes}:${seconds}`;
	}
	
	return <div className="mx-auto text-center pt-5">
		<center>
			<div style={{ fontSize: '3.5rem' }}>
				<CountDownTimer>
					{timerChildren}
				</CountDownTimer>
			</div>
		</center>
		<TimerController />
	</div>

}
