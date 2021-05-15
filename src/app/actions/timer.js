import { types } from "../types";

// declarando acciones para manipular el estado del timer
export const runTimer = () => ({ type: types.runTimer });

export const stopTimer = () => ({ type: types.stopTimer });

export const resetTimer = (time) => ({ 
	type: types.stopTimer,
	payload: time
});

export const updateTime = (time) => ({ 
	type: types.updateTime,
	payload: time
});

export const updateCustomTime = (customTime) => ({ 
	type: types.updateCustomTime,
	payload: customTime
});

export const updateTimerType = (type) => ({ 
	type: types.updateTimerType,
	payload: type
});

export const updateCountDownKey = () => ({ type: types.updateCountDownKey });

export const openCustomTimeModal = () => ({ type: types.openCustomTimeModal });

export const closeCustomTimeModal = () => ({ type: types.closeCustomTimeModal });
