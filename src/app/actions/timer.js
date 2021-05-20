import { types } from "../types";

// declarando acciones para manipular el estado del timer
// ninguna de estas acciones altera directamente la BD
// solo actualiza el estado de redux
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


export const updateTimerType = (type) => ({ 
	type: types.updateTimerType,
	payload: type
});

export const updateCountDownKey = () => ({ type: types.updateCountDownKey });
