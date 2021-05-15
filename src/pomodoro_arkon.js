import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Navbar from './ux/layout/navbar';
import Timer from './ux/timer';

export default function PomodoroArkon() {

	return <Provider store={store}>
		<div className="container bg-dark-blue">
			<Navbar />
			<Timer />
		</div>
	</Provider>

}
