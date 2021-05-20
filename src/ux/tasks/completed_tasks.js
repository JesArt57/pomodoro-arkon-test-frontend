import React from 'react';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import EmptyState from '../core/empty_state';

// componente para el reporte de las tareas completadas
export default function CompletedTasks({ tasks, handleDeleteTask }) {
	
	if(tasks.length === 0) {
		return <EmptyState isBackGroundDark={false} /> }

	return <div style={{ maxHeight: 320, overflowY: 'scroll' }}>
		{
			tasks.map(task => (
				<div key={task.id} className="p-2 rounded-border bg-dark-blue text-white mb-3">
					<Tooltip title={task.description}>
						<Box display="flex" alignItems="center" justifyContent="space-between">
							{ task.title }
							<Box display="flex" alignItems="center">
								<label className="text-light-blue">{ `Completada en ${timerTransform(task.completedTime)}` }</label>
								<div className="mr-3" />
								<IconButton variant="contained" className="text-white" 
									onClick={() => handleDeleteTask(task.id)}>
									<Delete />
								</IconButton>
							</Box>
						</Box>
					</Tooltip>
				</div>
			))
		}
	</div>

}

function timerTransform(completedTime) {

	const hours = `${Math.floor(completedTime / 3600)}`.length === 1
		? "0" + Math.floor(completedTime / 3600) 
		: '' + Math.floor(completedTime / 3600);

	const minutes = `${Math.floor((completedTime % 3600) / 60)}`.length === 1
		? "0" + Math.floor((completedTime % 3600) / 60) 
		: '' + Math.floor((completedTime % 3600) / 60);

	const seconds = `${completedTime % 60}`.length === 1
		? "0" + completedTime % 60 
		: '' + completedTime % 60;
	
	return `${hours}:${minutes}:${seconds}`;

}
