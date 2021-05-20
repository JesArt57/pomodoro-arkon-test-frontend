import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';
import { requestAddTask, requestUpdateTask } from '../../app/actions/task';
import { types } from '../../app/types';

// definiendo un mock para saber si el sweet alert se disparo
// al momento de un error de api
jest.mock('sweetalert2', () => ({
	fire: jest.fn()
}));

// configurando el store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// estado inicial
const initialState = {};
// es un let porque en el beforeEach
// quiero reinicializar todas la acciones que ese store
// va haber ejecutado
let store = mockStore(initialState);

// probando las acciones de task
describe('Pruebas en las acciones de task', () => {

	beforeEach(() => {
		// reinicializar en cada peticion
		store = mockStore(initialState);
	});
	// probando que mi peticion y la accion se realicen de manera correcta
	test('requestAddTask correcto', async () => {
		await store.dispatch(requestAddTask({
			title: "Test Todo",
			description: "Tarea para probar requestAddTask action",
			duration: 1500,
			timerType: 1,
			isCompleted: true,
			createdAt: new Date(),
			completedTime: 1215,
		}));

		const actions = store.getActions();
		
		expect(actions[0]).toEqual({
			type: types.addTask,
			payload: {
				id: expect.any(String),
				title: expect.any(String),
				description: expect.any(String),
				duration: expect.any(Number),
				timerType: expect.any(Number),
				isCompleted: expect.any(Boolean),
				createdAt: expect.any(Date),
				completedTime: expect.any(Number)
			}
		});
	});

	test('requestUpdateTask incorrecta no envio parametros', async() => {
		await store.dispatch(requestUpdateTask({
			title: "Test Todo",
			description: "Tarea para probar requestAddTask action",
			duration: 1500,
			timerType: 1,
			createdAt: new Date(),
		}));

		const actions = store.getActions();

		// si hay errores deberia regresar los actions vacios y el Swal debio mostrarte
		expect(actions).toEqual([]);
		expect(Swal.fire).toHaveBeenCalledWith("Error", "Ha ocurrido un error al actualizar la tarea", "error");
	});

});
