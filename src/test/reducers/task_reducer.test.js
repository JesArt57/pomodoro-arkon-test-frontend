import { openTaskFormModal, addTask } from "../../app/actions/task";
import { taskReducer } from "../../app/reducers/task_reducer";

const initialState = {
	isOpenTaskFormModal: false,
	tasks: [],
}

// probando que el task reducer funcione correctamente
describe('Pruebas del task reducer', () => {
	// al enviarle el estado inicial y no encontrar ningua accion debe de retornarmelo
	test('debe de retorna el estado por defecto', () => {

		const state = taskReducer(initialState, {});
		expect(state).toEqual(initialState);

	})
	// probando que el estado cambie de manera correcta al abrir
	// el modal de agregar tarea y al agregar una tarea
	test('debe de abrir el modal de nueva tarea y agregar una tarea', () => {

		const state = taskReducer(initialState, openTaskFormModal());
		expect(state).toEqual({
			isOpenTaskFormModal: true,
			tasks: [],
		});

		const stateAddedTask = taskReducer(initialState, addTask({ id: 1, title: 'T1' }));
		expect(stateAddedTask).toEqual({
			isOpenTaskFormModal: false,
			tasks: [{ id: 1, title: 'T1' }],
		});

	})

});
