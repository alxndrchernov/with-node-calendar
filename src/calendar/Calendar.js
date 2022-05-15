import React, { useEffect, useState } from "react";
import moment from "moment";

import Title from "./Title";
import Monitor from "./Monitor";
import CalendarGrid from "./CalendarGrid";
import MyInput from "./MyInput";

import '../App.css'
import {newEvent} from "../api/api";

function Calendar({eventsData}) {

	moment.updateLocale("en", { week: { dow: 1 } });
	const [today, setToday] = useState(moment());
	const startDay = today.clone().startOf('month').startOf('week');
	const totalDays = 42;


	const prevMonth = () => {
		setToday(prev => prev.clone().subtract(1, 'month'));
	}
	const thisMonth = () => {
		setToday(moment());
	}
	const nextMonth = () => {
		setToday(today.clone().add(1, 'month'));
	}
	const [method, setMethod] = useState(null);
	const [event, setEvent] = useState(null);

	const [ShowForm, setShowForm] = useState(false);
	const [showDel, setShowDel] = useState(false);
	const [events, setEvents] = useState([]);


	useEffect(() => {
		setEvents(eventsData)
		if (localStorage.getItem('events')) {
			const notes = JSON.parse(localStorage.getItem('events'))
			setEvents(notes);
		}
	}, [eventsData])


	const openEventsForm = (methodName, eventForUpdate) => {
		setShowForm(true);
		setEvent(eventForUpdate);
		setMethod(methodName);
	}

	const cancelForm = () => {
		setShowForm(false);
		setEvent(null);
		setShowDel(false);
	}

	const changeEvent = (text, field) => {
		setEvent(prevState => ({
			...prevState,
			[field]: text
		})
		)
	}

	const creUpNote = async () => {
		if (event.title.length > 0) {

			if (method === 'Update') {

				setEvents(events.map(eventEl => eventEl.id === event.id ? event : eventEl))
				// localStorage.setItem('events', JSON.stringify(events.map(eventEl => eventEl.id === event.id ? event : eventEl)))
			}
			else {
				await newEvent(event).then(async res=>{
					const response = await res.json()
					console.log(response)
				})
				setEvents([...events, event])
				// localStorage.setItem('events', JSON.stringify([...events, event]))
			}
		}
		cancelForm();
	}

	const deleteNote = () => {
		setEvents(events.filter(note => note.id !== event.id));
		// localStorage.setItem('events', JSON.stringify(events.filter(note => note.id !== event.id)))
		cancelForm();
	}

	return (
		<>
			{
				ShowForm ? (
					<div id='EventsForm' onClick={cancelForm}>
						<div id='EventForm' onClick={e => e.stopPropagation()}>
							<MyInput
								onChange={e => changeEvent(e.target.value, 'title')}
								value={event.title}
								placeholder='Title'
							/>
							<MyInput
								onChange={e => changeEvent(e.target.value, 'description')}
								value={event.description}
								placeholder='Description'
							/>
							<div id='ButtonsForm'>
								<button className='buttonForm' onClick={cancelForm}>Cancel</button>
								<button className='buttonForm' onClick={creUpNote}>{method}</button>
								{showDel && <button id='buttonDel' onClick={deleteNote}>Х</button>}
							</div>
						</div>
					</div>
				) : null
			}
			<div id="GeneralWindow">
				<Title />
				<Monitor
					today={today}
					prevMonth={prevMonth}
					thisMonth={thisMonth}
					nextMonth={nextMonth}
				/>
				<CalendarGrid
					startDay={startDay}
					today={today}
					totalDays={totalDays}
					events={events}
					openEventsForm={openEventsForm}
					setShowDel={setShowDel}
				/>
			</div>
		</>
	)
}

export default Calendar;
