import './timestamp.scss';
import { useState } from 'react';
import { timeStampType } from '../Interfaces/RidesType';
export const TimeStamp = ({setTime} : timeStampType) => {
  
  let [selectedTime , setSelectedTime] = useState<string>('');
  
  return (
    <>
     <div className='timestamp w-100 h-100'>
        <p className='text-secondary mt-1'>Time</p>
        <div className="time-container d-flex flex-wrap  align-items-start">
        <div className={`time-div d-flex align-items-center justify-content-center mb-1 me-1
            ${selectedTime == '1' ? 'selected-time':''}`} onClick={e=>{e.preventDefault(); setSelectedTime('1'); setTime('5am - 9am');}}>5am - 9am</div>
            <div className={`time-div d-flex align-items-center justify-content-center mb-1 me-1
            ${selectedTime == '2' ? 'selected-time':''}`} onClick={e=>{e.preventDefault(); setSelectedTime('2'); setTime('9am - 12pm')}}>9am - 12pm</div>
             <div className={`time-div d-flex align-items-center justify-content-center mb-1 me-1
            ${selectedTime == '3' ? 'selected-time':''}`} onClick={e=>{e.preventDefault(); setSelectedTime('3'); setTime('12pm - 3pm')}}>12pm - 3pm</div>
             <div className={`time-div d-flex align-items-center justify-content-center mb-1  me-1
             ${selectedTime == '4' ? 'selected-time':''}`} onClick={e=>{e.preventDefault(); setSelectedTime('4'); setTime('3pm - 6pm')}}>3pm - 6pm</div>
             <div className={`time-div d-flex align-items-center justify-content-center mb-1 me-1
            ${selectedTime == '5' ? 'selected-time':''}`} onClick={e=>{e.preventDefault(); setSelectedTime('5'); setTime('6pm - 9pm')}}>6pm - 9pm</div>
             <div className={`time-div d-flex align-items-center justify-content-center mb-1 me-1
            ${selectedTime == '6' ? 'selected-time':''}`} onClick={e=>{e.preventDefault(); setSelectedTime('6'); setTime('9pm - 12am')}}>9pm - 12am</div>
        </div>
     </div>
    </>
  )
}
