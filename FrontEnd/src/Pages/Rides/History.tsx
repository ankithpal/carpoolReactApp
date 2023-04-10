import React, { useState } from 'react'
import { useEffect } from 'react'
import { Header } from '../Navbar/Header'
import './history.scss'
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { bookRideType, rideDetailsType, tokenType } from '../../Interfaces/RidesType'
import { BookedCard } from '../../Components/BookedCard'
import { OfferedCard } from '../../Components/OfferedCard'
import { headers , getBookedRideUrl , getOfferedRidesUrl} from '../../HttpServices/HttpUrls';


export const History = () => {

  let tokenDetails : tokenType = jwt_decode(localStorage.getItem('jwt-token')!);
  const [bookedRides , setBookedRides] = useState<bookRideType[]>([]);
  const [offeredRides , setOfferedRides] = useState<rideDetailsType[]>([]);
  const [changeView , setChangeView] = useState<boolean | null >(null);
  
  const handleChangeView = ()=>{
     setChangeView(!changeView);
  }
  useEffect(()=>{
    setChangeView( window.screen.width > 1097 ? null : true);
  } ,[window.screen.width])

  useEffect(() => {
    const bookedRide = async ()=>{
      const url = `${getBookedRideUrl}?id=${tokenDetails.id}`;
      await axios.post(url, '',{headers:headers})
      .then(res=>{setBookedRides(res.data)}).catch(err=>{console.log(err)});
    }
    bookedRide();
  },[])

  useEffect(() => {
    const offeredRide  = async () =>{
      const url = `${getOfferedRidesUrl}?id=${tokenDetails.id}`
      await axios.post(url,'',{headers:headers})
      .then(res=>{ setOfferedRides(res.data)}).catch(err=> console.log(err));
    }
    offeredRide();
  },[])

  return (
    <div className='bookride-container'>    
    <div className='book-ride-header d-flex align-items-center justify-content-center'>
        <Header/>
    </div>
    <div className="history-container d-flex flex-wrap">
      {
        (changeView == null || changeView == true) && 
      
        <div className="bookedride d-flex  align-item-center justify-content-center">
            <div className="bookride-inner mt-3 ml-3 ">
              <div className="booked-ride-header offered-ride-header d-flex align-items-center justify-content-center">Booked Rides 
              <i className="fa-sharp fa-solid fa-repeat ms-3 d-xl-none d-inline" onClick={handleChangeView}></i>
              </div>
               <div className="cards-container mt-4">
                 {
                    bookedRides.length!= 0  ? bookedRides.map((rideDetails) => (
                    <BookedCard rideDetails={rideDetails}/> )) : <p>No  Booked Rides</p> 
                 }
              </div>
            </div>
        </div>
      }
      {
        (changeView == null || changeView == false) && 
      
        <div className="bookedride d-flex align-item-center justify-content-center ">
            <div className="bookride-inner offered-card-inner mt-3 ml-3">
              <div className="offered-ride-header d-flex align-items-center justify-content-center">Offered Rides
              <i className="fa-sharp fa-solid fa-repeat ms-3 d-xl-none d-inline" onClick={handleChangeView}></i>
              </div>
               <div className="cards-container d-flex flex-column mt-3">
                {
                  offeredRides.length!=0 ?  offeredRides.map((rideDetails) => (
                    <OfferedCard rideDetails={rideDetails}/>
                 ))  : <p> No Offered Rides </p>
                 }
              </div>
            </div>
        </div>
      }
        <div className="offeredride"></div>
    </div>
    </div>
  )
}