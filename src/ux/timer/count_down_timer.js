import React from 'react';
import { useSelector } from 'react-redux';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import TIMER_TYPES from '../../app/constants/timer' 

export default function CountDownTimer({ children }) {

	const { 
		isRunningTimer, 
		countDownKey, 
		time, 
		customTime, 
		timerType 
	} = useSelector(state => state.timer);

	return <CountdownCircleTimer
		key={countDownKey}
		isPlaying={isRunningTimer}
		duration={((timerType === TIMER_TYPES.CUSTOM) ? customTime : time) * 60}
		strokeWidth={6}
		size={250}
		colors={[["#f73859", 0.33], ["#f73859", 0.33], ["#f73859", 0.33]]}
		trailColor="#61dafb">
		{children}
	</CountdownCircleTimer>

}
