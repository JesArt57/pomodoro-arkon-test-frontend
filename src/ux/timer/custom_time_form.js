import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
	closeCustomTimeModal, 
	updateTimerType, 
	updateCountDownKey, 
	updateCustomTime 
} from '../../app/actions/timer';
import Modal from 'react-modal';
import { Box, Button, TextField } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import TIMER_TYPES from '../../app/constants/timer' 

const customStyles = {
    content : {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto'
    }
};

Modal.setAppElement('#root');

export default function CustomTimeForm() {

	const { isOpenCustomTimeModal } = useSelector(state => state.timer);

	const dispatch = useDispatch();

	const [customTime, setCustomTime] = useState({
		hours: '',
		minutes: '',
		seconds: ''
	});

	useEffect(() => {
		if(customTime.hours >= 2 && (customTime.minutes || customTime.seconds)) {
			setCustomTime(prevCustomTime => ({ 
				...prevCustomTime,
				minutes: '',
				seconds: ''
			}));
		}
	}, [customTime])

	function onInputChange({ target: { value, name } }) {
		// expresión regular para validar números enteros
		const regexpIntegerNumber = /^[0-9]+$/;

		// clausala de guarda que si no es un entero no siga 
		// ejecutando la función
		if(regexpIntegerNumber.test(value) || !value) {
			// convirtiendo el valor del input a enter;
			const parseIntValue = parseInt(value);

			if(name === "hours" && (parseIntValue > 2 || parseIntValue < 0)) {
				return; }

			if(customTime.hours >= 2 && (name === "minutes" || name === "seconds")) {
				setCustomTime(prevCustomTime => ({ 
					...prevCustomTime,
					minutes: '',
					seconds: ''
				}));

				return;
			}

			if((name === "minutes" || name === "seconds") && (parseIntValue > 59 || parseIntValue < 0)) {
				return; }

			setCustomTime(prevCustomTime => ({ 
				...prevCustomTime,
				[name]: value
			}));
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		
		const { hours, minutes, seconds } = customTime;

		if(!hours && !minutes && !seconds) {
			return; }

		let time = 0;

		if(hours && parseInt(hours) > 0) {
			// convirtiendo las horas a segundos
			time = time + (hours * 60);
		}

		if(minutes && parseInt(minutes) > 0) {
			time = time + (minutes % 60);		
		}

		if(seconds && parseInt(seconds) > 0) {
			time = time + (seconds / 60);
		}

		dispatch(updateCustomTime(time));
		dispatch(updateTimerType(TIMER_TYPES.CUSTOM));
		dispatch(updateCountDownKey());
		dispatch(closeCustomTimeModal());
	}

	function handleCloseCustomTimeModal() {
		dispatch(closeCustomTimeModal());
	}

	return <Modal isOpen={isOpenCustomTimeModal} style={customStyles}
		closeTimeoutMS={200}
		onRequestClose={handleCloseCustomTimeModal}
		className="modal"
		overlayClassName="background-modal">
		<h2 className="text-dark-primary mb-5 text-center">Personalizando Tiempo</h2>
		<form onSubmit={handleSubmit}>
			<Box display="flex" justifyContent="space-around" alignItems="center">
				<TextField label="Horas" type="text" name="hours"
					onChange={onInputChange} max={2} value={customTime.hours} />
				<div className="ml-2 mr-2">
					<TextField label="Minutos" type="text" name="minutes"
						onChange={onInputChange} max={59} value={customTime.minutes} />
				</div>
				<TextField label="Segundos" type="text" name="seconds"
					onChange={onInputChange} max={59} value={customTime.seconds} />
			</Box>
			<div className="mt-4 pt-2" />
			<div className="mx-auto pl-5 pr-5">
				<Button aria-label="delete" className="bg-red text-white" fullWidth
					startIcon={<Save />} type="submit">
					Guardar
				</Button>
			</div>
		</form>
	</Modal>

}
