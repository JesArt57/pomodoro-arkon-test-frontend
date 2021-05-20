import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Navbar from './ux/layout/navbar';
import Tasks from './ux/tasks';
import Timer from './ux/timer';
// este componente es el principal de la app
export default function PomodoroArkon() {
	// esta ref la use desde aqui para saber cual es el tiempo al momento de que una tarea
	// ha finalizado o marcado como completa y no estar mandando ese tiempo
	// al store y asi evitar renders de más
	const remainingTimeRef = useRef(0);

	// se envuelve dentro del provider para proveer el estado a todos los
	// componentes hijos
	return <Provider store={store}>
		<div className="container bg-dark-blue pb-5">
			<Navbar />
			<div className="mx-auto" style={{ maxWidth: '32rem' }}>
				<Timer remainingTimeRef={remainingTimeRef} />
				<Tasks remainingTimeRef={remainingTimeRef} />
			</div>
		</div>
	</Provider>

}
