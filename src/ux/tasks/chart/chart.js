import React from 'react';
import { VictoryBar, VictoryChart, VictoryGroup } from 'victory';

// gráfica para mostrar las tareas de la ultima semana
export default function Chart({ buildTasksForGraph, tasks }) {

	const maxY = tasks.length < 50 ? 50 : tasks.length;

	return <VictoryChart domain={{ x: [1, 7], y: [0, maxY] }}>
		<VictoryGroup offset={20} colorScale={"qualitative"}
			style={{ data: { width: 15 } }}>
			<VictoryBar
				data={buildTasksForGraph?.completedTasks}
			/>

			<VictoryBar
				data={buildTasksForGraph?.incompletedTasks}
			/>
		</VictoryGroup>
	</VictoryChart>

}