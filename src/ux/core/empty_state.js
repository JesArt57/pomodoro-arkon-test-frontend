import React from 'react';
import imageEmptyState from '../core/images/empty_state.svg';
import imageEmptyData from '../core/images/empty_data.svg';

export default function EmptyState({ isBackGroundDark = true }) {

	return <div>
		<h2 className={`text-center ${isBackGroundDark ? 'text-white' : 'text-navy-blue'} mb-5`}>
			No hay tareas para mostrar
		</h2>
		<center>
			<img src={isBackGroundDark ? imageEmptyState : imageEmptyData} width={isBackGroundDark ? "300" : "250" }
				alt="Tareas vacías" />
		</center>
	</div>
	
}
