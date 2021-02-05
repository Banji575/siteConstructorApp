import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import "react-datepicker/dist/react-datepicker.css";
import './timerToDate.css'
const dateFormat = date => date.toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric' })
const TimerToDate = ({getParams}) => {
    const [toDateDate, setToDateDate] = useState( new Date())
    const [toDateTime, setToDateTime] = useState('12:00')
    console.log(dateFormat(toDateDate))

    
    useEffect(()=>{
        getParams({toDateDate:dateFormat(toDateDate), toDateTime} )
    },[toDateDate, toDateTime])

    return (
        <div className = 'd-flex'>
            <div className='date-picker-conteiner  mr-3'>
                <p className='timer-p'>Дата</p>
                <DatePicker className='date-picker' selected={toDateDate} onChange={date => setToDateDate(date)} />
                <FontAwesomeIcon className='date-picker-icon' icon={faCalendar} />
            </div>
            <div className='date-picker-conteiner'>
                <p className='timer-p'  >Время</p>
                <input type= 'time' value = {toDateTime} onChange = {(evt)=> setToDateTime(evt.target.value)}/>
            </div>
        </div>
    )
}
export default TimerToDate