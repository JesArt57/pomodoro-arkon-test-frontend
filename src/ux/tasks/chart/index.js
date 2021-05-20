import React, { Fragment } from 'react';
import { Box } from '@material-ui/core';

import EmptyState from '../../core/empty_state';
import Chart from './chart';

// componente donde se muestra la grafica
// y leyendas de las tareas de la ultima semana
export default function ChartComponent({ 
	tasks, 
	startDate, 
	endDate, 
	filteredTasksByLastWeek, 
	buildTasksForGraph 
}) {

	if(tasks.length === 0 ) {
		return <EmptyState isBackGroundDark={false} /> }
	
	return <Fragment>
		<h4>Del {startDate} al {endDate}</h4>
		<Box display="flex" alignItems="center">
			<Box display="flex" alignItems="center">
				<h4 className="m-0 mr-1">
					{ filteredTasksByLastWeek?.completedTasks?.length } Completa(s)
				</h4>
				<div className="bg-completed-bar" style={{ width: 20, height: 20, borderRadius: '100%' }} />
			</Box>
			<div className="ml-3" />
			<Box display="flex" alignItems="center">
				<h4 className="m-0">
					{ filteredTasksByLastWeek?.incompletedTasks?.length } Incompleta(s)
				</h4>
				<div className="bg-incompleted-bar" style={{ width: 20, height: 20, borderRadius: '100%' }} />
			</Box>
		</Box>
		<Chart buildTasksForGraph={buildTasksForGraph} tasks={tasks} />
	</Fragment>

}
