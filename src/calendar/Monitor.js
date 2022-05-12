import React from "react";
import '../App.css'
import MyButton from "./MyButton";


const Monitor = ({ today, prevMonth, thisMonth, nextMonth }) => {
  return (
    <div id='MonitorWrapper'>
      <div id='TextWrapper'>
        <span style={{ marginRight: '8px', fontWeight: 'bold' }}>{today.format('MMMM')}</span>
        <span>{today.format('YYYY')}</span>
      </div>
      <div id='ButtonsWrapper'>
        <button id='ChangeMonthButton' onClick={prevMonth}> &lt; </button>
        <MyButton onClick={thisMonth}>Today</MyButton>
        <button id='ChangeMonthButton' onClick={nextMonth}> &gt; </button>
      </div>
    </div>
  );
};

export default Monitor;