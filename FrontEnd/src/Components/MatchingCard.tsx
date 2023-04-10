import { mathchingCardType } from '../Interfaces/RidesType';
import './matchingcard.scss';


export const MatchingCard = ({rideDetails  , bookedRide , getAvailableSeats , getRideFair}:mathchingCardType) => {
  return (
  <div className='matching-card' onClick={e=>{bookedRide(rideDetails)}}>
        <div className="card-header p-0 d-flex justify-content-between">
            <h3>{rideDetails.email.split("@")[0]}</h3>
            {/* <div className='image-container d-flex align-items-end justify-content-end'></div> */}
        </div>
        <div className="matching-card-content">
            <div className="to-from d-flex">
              <div className="from">
               <label>From</label>
               <p className='places-name'>{rideDetails.source}</p>
              </div>
              <div className="icon d-flex align-items-center justify-content-between">
              <div className="first-circle violet-shade-bg" ></div>
              <div className="second-circle" ></div>
              <div className="second-circle"></div>
              <div className="second-circle"></div>
              <div className="second-circle"></div>
              <i className="fa-solid fa-location-dot violet-shade-c"></i>
              </div>
              <div className="to">
               <label>To</label>
               <p className='places-name'>{rideDetails.destination}</p>
              </div>
            </div>
            <div className="date-time d-flex">
             <div className="date">
             <label>Date</label>
               <p>{rideDetails.date?.substring(0 , 10)}</p>
             </div>
             <div className="time">
             <label>Time</label>
               <p>{rideDetails.intime}</p>
             </div>
            </div>
            <div className="seat-price d-flex">
               <div className="seat">
                <label>Price</label>
                <p>{getRideFair(rideDetails)}$</p>
               </div>
               <div className="price">
                <label>Seat Availability</label>
                <p>{getAvailableSeats(rideDetails)}</p>
               </div>
            </div>
        </div>
    </div>
  )
}
