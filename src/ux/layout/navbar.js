import React from 'react';
import { useDispatch } from 'react-redux';
import { openCustomTimeModal } from '../../app/actions/timer';
import { Equalizer, Tune } from '@material-ui/icons';
import { Button, Box } from '@material-ui/core';


export default function Navbar() {

	const dispatch = useDispatch();

	function handleOpenCustomTimeModal() {
		dispatch(openCustomTimeModal());
	}

	return <nav className="border-bottom-light-blue navbar p-3">
		<Box display="flex" justifyContent="space-between">
			<h1 className="text-red">Pomodoro Arkon Test</h1>
			<Box display="flex">
				<Button variant="contained" startIcon={<Tune />} 
					onClick={handleOpenCustomTimeModal}>
					Personalizar tiempo
				</Button>
				<div className="mr-3" />
				<Button variant="contained" startIcon={<Equalizer />}>
					Reporte
				</Button>
			</Box>
		</Box>
	</nav>

}
