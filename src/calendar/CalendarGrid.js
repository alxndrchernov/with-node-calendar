import React from "react";
import { nanoid } from 'nanoid'
import moment from "moment";
import styled from "styled-components";
import '../App.css'

const CellWrapper = styled('div')`
min-width: 140px;
min-height: 80px;
background-color: ${props => props.isWeekends ? '#272829' : '#1E1F25'};
color: ${props => props.selectedMonth ? 'deeppink' : 'DarkSlateGray'};
`;

const RowInCell = styled('div')`
display: flex;
justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
flex-direction: column;
`;



const CalendarGrid = ({ startDay, today, totalDays, events, openEventsForm, setShowDel }) => {

    const day = startDay.clone().subtract(1, 'day');
    const currentDay = (day) => moment().isSame(day, 'day');
    const selectedMonth = (day) => today.isSame(day, 'month');
    const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());

    return (
        <>
            <div id="weekGridWrapper">{[...Array(7)].map((weekDay, index) => (
                <div key={index} id='weekWrapper'>
                    <RowInCell style={{ paddingRight: '8px' }} justifyContent={'flex-end'}>
                        {moment().day(index + 1).format('ddd')}
                    </RowInCell>
                </div>))}
            </div>
            <div id="GridWrapper">
                {
                    daysArray.map((dayItem) => (
                        <CellWrapper
                            key={dayItem.unix()}
                            isWeekends={dayItem.day() === 6 || dayItem.day() === 0}
                            selectedMonth={selectedMonth(dayItem)}
                        >

                            <RowInCell
                                justifyContent={'flex-end'}
                            >

                                <div id='ShowDayWrapper'>

                                    <div id='DayWrapper'
                                        onClick={() => openEventsForm('Create', {
                                            id: nanoid(),
                                            title: '',
                                            description: '',
                                            date: dayItem.format('X')
                                        })}>

                                        {currentDay(dayItem)
                                            ? <div id='CurrentDay'>{dayItem.format('D')}</div>
                                            : <div id='Day'>{dayItem.format('D')}</div>}

                                    </div>

                                </div>
                                <ul id='Events'>
                                    {
                                        events
                                            .filter(event => event.date >= dayItem.format('X') && event.date <= dayItem.clone().endOf('day').format('X'))
                                            .map(event =>
                                                <li key={event.id}>
                                                    <button id='Event' onClick={() => { setShowDel(true); openEventsForm('Update', event) }}>
                                                        {event.title}
                                                    </button>
                                                </li>
                                            )
                                    }
                                </ul>
                            </RowInCell>
                        </CellWrapper>
                    ))
                }
            </div>
        </>
    );
};

export default CalendarGrid;