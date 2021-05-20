import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { requestAddTask, closeTaskFormModal, updateCurrentTask, requestUpdateTask } from '../../app/actions/task';
import { updateCountDownKey } from '../../app/actions/timer';
import Modal from 'react-modal';
import { 
	TextareaAutosize, 
	Button, 
	TextField, 
	InputLabel, 
	Select, 
	MenuItem, 
	Box 
} from '@material-ui/core';
import { Save, AddAlarm } from '@material-ui/icons';
import Swal from 'sweetalert2';
import TIME_TYPES from '../../app/constants/time';
import TIMER_TYPES from '../../app/constants/timer';

const customStyles = {
    content : {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto'
    }
};

Modal.setAppElement('#root');

const initialTask = {
	title: "",
	description: "",
	duration: 30,
	timerType: 1,
	isCompleted: false,
	createdAt: new Date()
};

const initialCustomTime = {
	hours: '',
	minutes: '',
	seconds: ''
}

export default function TaskForm() {

	const dispatch = useDispatch();

	const { isOpenTaskFormModal, currentTask } = useSelector(state => state.task);

	const [task, setTask] = useState(initialTask);

	const [customTime, setCustomTime] = useState(initialCustomTime);
	// este useEffect sirve para actualizar el state de los inputs del tiempo
	// cuando se quiere actualizar la tarea
	useEffect(() => {
		if(currentTask) {
			if(currentTask.timerType === TIMER_TYPES.CUSTOM) {
				const duration = currentTask.duration;

				const hours = Math.floor((duration * 60) / 3600);
				const minutes = Math.floor(duration % 60);
				const seconds = Math.floor(duration * 60) % 60;

				setCustomTime({
					hours,
					minutes,
					seconds
				})
			}

			setTask(currentTask);
			return;
		}

		setTask(initialTask);
	}, [currentTask])
	// este useEffect ayuda como un validador de que las tareas no superen
	// un maximo de 2 horas
	useEffect(() => {
		if(customTime.hours >= 2 && (customTime.minutes || customTime.seconds)) {
			setCustomTime(prevCustomTime => ({ 
				...prevCustomTime,
				minutes: '',
				seconds: ''
			}));
		}
	}, [customTime]);
	// funcion para controlar los inputs del tiempo y realiza las validaciones correspondientes
	function onInputCustomTimeChange({ target: { value, name } }) {
		// expresión regular para validar números enteros
		const regexpIntegerNumber = /^[0-9]+$/;

		// clausala de guarda que si no es un entero no siga 
		// ejecutando la función
		if(regexpIntegerNumber.test(value) || !value) {
			// convirtiendo el valor del input a enter;
			const parseIntValue = parseInt(value);

			if(name === "hours" && (parseIntValue > 2 || parseIntValue < 0)) {
				return; }
			// si las horas ya son 2 no puede haber minutos ni segundos
			if(customTime.hours >= 2 && (name === "minutes" || name === "seconds")) {
				setCustomTime(prevCustomTime => ({ 
					...prevCustomTime,
					minutes: '',
					seconds: ''
				}));

				return;
			}
			// los minutos y segundos no puede superar 59 ni pueden ser menor a 0
			if((name === "minutes" || name === "seconds") && (parseIntValue > 59 || parseIntValue < 0)) {
				return; }

			setCustomTime(prevCustomTime => ({ 
				...prevCustomTime,
				[name]: value
			}));
		}
	}
	// funcion para controlar los inputs que no son de tiempo y realiza las validaciones correspondientes
	function onInputChange({ target: { value, name } }) {
		// recibo un tipo de tiempo entonces se debe de convertir a una constante además
		// se agrega la duracion dependiendo del tipo
		if(name === "timerType") {
			let sendDuration = null;

			switch (value) {
				case TIMER_TYPES.SHORT:
					sendDuration = TIME_TYPES.SHORT_TIME
					break;
				case TIMER_TYPES.MEDIUM:
					sendDuration = TIME_TYPES.MEDIUM_TIME
					break;
				case TIMER_TYPES.LARGE:
					sendDuration = TIME_TYPES.LARGE_TIME
					break;
				default:
					break;
			}

			setTask(prevTask => ({ 
				...prevTask,
				duration: sendDuration,
				[name]: value
			}));

			return;
		}

		setTask(prevTask => ({ 
			...prevTask,
			[name]: value
		}));
	}
	// funcion que envia el form
	function handleSubmit(event) {
		event.preventDefault();

		let time = 0;
		// aqui realizo conversiones del tiempo para enviarlas al temporizador
		if(task.timerType === TIMER_TYPES.CUSTOM) {
			const { hours, minutes, seconds } = customTime;

			const isEmptyTime = !hours && !minutes && !seconds;

			if(!isEmptyTime) {
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
			}
		}
		// si tengo currentTask entonces voy a actualizar
		if(currentTask) {
			if(task.timerType === TIMER_TYPES.CUSTOM) {
				if(time === 0 || !time) {
					Swal.fire('Error', "El tiempo de la tarea no puede ser 0 o estar vacío", 'error');
					return; }

				dispatch(requestUpdateTask({
					...task,
					duration: time
				}));
			}else {
				dispatch(requestUpdateTask(task));
			}

			dispatch(updateCountDownKey());
			setCustomTime(initialCustomTime);
			dispatch(closeTaskFormModal());
			return;
		}

		// si no tengo currentTask entonces voy a crear un nuevo record
		if(task.timerType === TIMER_TYPES.CUSTOM) {
			if(time === 0 || !time) {
				Swal.fire('Error', "El tiempo de la tarea no puede ser 0 o estar vacío", 'error');
				return; }
				
			dispatch(requestAddTask({
				...task,
				duration: time
			}));
		}else {
			dispatch(requestAddTask(task));
		}

		setCustomTime(initialCustomTime);
		dispatch(closeTaskFormModal());
	}

	function handleCloseTaskFormModal() {
		batch(() => {
			dispatch(updateCurrentTask(null));
			setCustomTime(initialCustomTime);
			dispatch(closeTaskFormModal());
		});
	}

	return <Modal isOpen={isOpenTaskFormModal} style={customStyles}
		onRequestClose={handleCloseTaskFormModal}
		closeTimeoutMS={200}
		className="modal"
		overlayClassName="background-modal">
		<h2 className="text-dark-primary mb-5 text-center">Agregando Tarea / Nombre de la tarea</h2>
		<form onSubmit={handleSubmit}>
			<TextField label="Título" name="title" type="text" className="w-100" value={task.title}
				onChange={onInputChange} required disabled={!!currentTask} />
			<InputLabel id="options" className="mt-4">Duración</InputLabel>
			<Select labelId="options"
					id="demo-simple-select"
					name="timerType"
					value={task.timerType}
					IconComponent={AddAlarm}
					className="w-100"
					onChange={onInputChange}
					required>
				<MenuItem value={TIMER_TYPES.SHORT}>Corta</MenuItem>
				<MenuItem value={TIMER_TYPES.MEDIUM}>Media</MenuItem>
				<MenuItem value={TIMER_TYPES.LARGE}>Larga</MenuItem>
				<MenuItem value={TIMER_TYPES.CUSTOM}>Personalizada</MenuItem>
			</Select>
			{
				(task.timerType === TIMER_TYPES.CUSTOM) &&
					<Box display="flex" justifyContent="space-around" alignItems="center" className="mt-3">
						<TextField label="Horas" type="text" name="hours"
							onChange={onInputCustomTimeChange} max={2} value={customTime.hours} />
						<div className="ml-2 mr-2">
							<TextField label="Minutos" type="text" name="minutes"
								onChange={onInputCustomTimeChange} max={59} value={customTime.minutes} />
						</div>
						<TextField label="Segundos" type="text" name="seconds"
							onChange={onInputCustomTimeChange} max={59} value={customTime.seconds} />
					</Box>
			}
			<div className="mt-4 pt-1" />
			<p className="text-label p-0 m-0 mb-1">Descripción</p>
			<TextareaAutosize type="text" name="description" rows={4} rowsMax={4} className="w-100" 
				value={task.description} onChange={onInputChange} />
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
