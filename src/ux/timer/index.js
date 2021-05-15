import React from 'react';
import TimerOptions from './timer_options';
import TimerController from './timer_controller';
import CountDownTimer from './count_down_timer';
import CustomTimeForm from './custom_time_form';

export default function Timer() {

	function timerChildren({ remainingTime }) {
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
	
	return <div className="mx-auto text-center mt-5 pt-5" style={{ maxWidth: '30rem' }}>
		<TimerOptions />
		<center>
			<div className="mt-5" style={{ fontSize: '3.5rem' }}>
				<CountDownTimer>
					{timerChildren}
				</CountDownTimer>
			</div>
		</center>
		<TimerController />
		<CustomTimeForm />
	</div>

}
