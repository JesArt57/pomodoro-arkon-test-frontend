import { types } from "../types";
import TIMER_TYPES from "../constants/timer";
import TIME_TYPES from "../constants/time";

// inicializando el estado de la app
const initialState = {
	isRunningTimer: false,
	time: TIME_TYPES.SHORT_TIME,
	timerType: TIMER_TYPES.SHORT,
	countDownKey: 1
}

// creando el reducer
export function timerReducer(state = initialState, action) {
	// switch para saber que acción debe ejecutar el reducer
	switch (action.type) {
		case types.runTimer:
			return {
				...state,
				isRunningTimer: true
			}
		case types.stopTimer:
			return {
				...state,
				isRunningTimer: false
			}
		case types.resetTimer:
			return {
				...state,
				time: action.payload
			}
		case types.updateTimerType:
			return {
				...state,
				timerType: action.payload
			}
		case types.updateTime:
			return {
				...state,
				time: action.payload
			}
		case types.updateCountDownKey:
			return {
				...state,
				countDownKey: state.countDownKey + 1
			}
		default:
			return state;
	}

}
