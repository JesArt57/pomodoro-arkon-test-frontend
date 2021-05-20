import { runTimer, stopTimer } from "../../app/actions/timer";
import { timerReducer } from "../../app/reducers/timer_reducer";

const initialState = {
	isRunningTimer: false
}

// probando que el timer reducer funcione correctamente
describe('Pruebas del timer reducer', () => {

	test('debe de retorna el estado por defecto', () => {
		// al enviar el estado inicial y la accion vacia debe de
		// retornar el estado inicial
		const state = timerReducer(initialState, {});
		expect(state).toEqual(initialState);

	})
	// prueba del correcto cambio de estado al correr y detener el timer
	test('debe de correr y detener el temporizador ', () => {

		const state = timerReducer(initialState, runTimer());
		expect(state).toEqual({ isRunningTimer: true });

		const stateStopedTimer = timerReducer(initialState, stopTimer());
		expect(stateStopedTimer).toEqual({ isRunningTimer: false });

	})

});
