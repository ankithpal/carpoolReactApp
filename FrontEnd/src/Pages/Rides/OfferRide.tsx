import React from 'react'
import './bookride.scss';
import { TimeStamp } from '../../Components/TimeStamp';
import { Header } from '../Navbar/Header';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { stopsType, tokenType } from '../../Interfaces/RidesType';
import axios from 'axios';
import { headers , offerRideUrl } from '../../HttpServices/HttpUrls';

export const OfferRide = () => {

  let [showStops , setShowStops]  = useState(false);
  let [selectedStop , setSelectedStop] = useState("");
  let [source , setSource] = useState<string>("");
  let [destination , setDestination] = useState<string>("");
  let [date , setDate] = useState<string>("");
  let [seats , setSeats] = useState<string>("");
  let [price , setPrice] = useState<string>("");
  let [time , setTime]  = useState<string>("");
  let [stopsList , setStopsList] = useState< stopsType[]>([]);

  const redirectTobookRide = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      window.location.replace('/bookride');
  }
  const moveToNextPage = ()=>{
      setShowStops(!showStops);
      setStopsList([]);
  }
  
  const validateOfferRideDetails = ()=>{
     if(source.trim()==="" || destination.trim()==="" || time ==="" || seats==="") {
      alert("All feilds are required");
      return false;
     }
     if(isNaN(Number(price)) || Number(price) < 0) {
       alert("price should be number");
       return false;
     }
     stopsList.forEach(stop => {
       if(stop.name.trim() === "") return false;
     });
     return true;
  }
  const handleSubmit = async ()=>{
       if(!validateOfferRideDetails()){
        return ;
       }
       let tokenDetails : tokenType = jwt_decode(localStorage.getItem('jwt-token')!);
       let initialStop = {
        "id": 0,
        "loationId": 0,
        "name":source.toLowerCase(),
        "occupency": 0
       }
       let finalStop = {
        "id": 0,
        "loationId": 0,
        "name":destination.toLowerCase(),
        "occupency": 0
      }
       const offerRequest = {
        "id": 0,
        "sourceId": 0,
        "destinationId": 0,
        "source": source.toLowerCase(),
        "destination": destination.toLowerCase(),
        "distance": 0,
        "date": date,
        "intime": time,
        "email":tokenDetails.email,
        "outTime": "2023-03-20T10:26:34.742Z",
        "capacity": seats,
        "fairPerKm": price,
        "ownerId": tokenDetails.id,
        "vehicleNumber": "string",
        "stops": [initialStop , ...stopsList , finalStop]
      }
      
      let url = `${offerRideUrl}`;
      try{
        let token = localStorage.getItem('jwt-token');
        let headers = {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": 'Bearer ' + token 
        };
        const res = axios.post(url , offerRequest , {headers:headers});
        window.location.replace('/history');
      }catch(err){
        console.log(err);
      } 
  }

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement> , item : any , index : Number)=>{
       setStopsList(stopsList.map((stop , idx)=>{
          if(index == idx ){
            return (
              {...stop , [e.target.name] : e.target.value}
            )
          }
          return stop;
       }))
  }
  
  const addInputFeild = ()=>{
    setStopsList([ ...stopsList ,{
      "id": 0,
      "loationId": 0,
      "name":'',
      "occupency": 0
    }])
  }
  
  return (
    <div className='bookride-container '>    
    <div className="book-ride-header d-flex align-items-center justify-content-center">
        <Header/>
    </div>
    <div className="bookride d-flex flex-wrap">
       <div className="bookform d-flex align-items-center justify-content-center">
        <div className="bookform-container d-flex flex-column align-items-center">
          <div className="toggle-container d-flex align-items-end">
              <div className='toggle-container-text lh-1'>
                <h2>Offer a Ride</h2>
                <p>we get you the matches asap !</p>
              </div>
              <div className="toggle-btn d-flex justify-content-center">
                <div className="toggle-btn-outer mt-3 d-flex align-items-center justify-content-start ps-1 orange-shade-bg" onClick={e=>redirectTobookRide(e)} ><div className="toggle-btn-inner orange-shade-bg"></div></div>
                
              </div>
          </div>
          <div className="input-feild-container input-feild-offer-ride d-flex ">
            <div className="input-feild  offer-ride-input">
            <div className="form-floating mb-0">
              <input type="text" className="form-control border-0 border-bottom" required id="from" placeholder="name@example.com" onChange={e=>{setSource(e.target.value)}}/>
              <label htmlFor="from">From</label>
            </div>
            <div className="form-floating">
              <input type="text" className="form-control border-0 border-bottom" required id="to" placeholder="Password" onChange={e=>{setDestination(e.target.value)}} />
              <label htmlFor="to" className=''>To</label>
            </div>
            <div className="form-floating ">
              <input type="date" className="form-control border-0 border-bottom fs-6 pl-0" required  min={new Date().toISOString().split('T')[0]} id="date" placeholder="dd/mm/yy" onChange={e=>{setDate(e.target.value)}} />
              <label htmlFor="date" className='pl-0'>Date</label>
            </div>
            </div>
            <div className="progress-bar d-flex align-items-center justify-content-between">
              <div className="first-circle"></div>
              <div className="second-circle" ></div>
              <div className="second-circle"></div>
              <div className="second-circle"></div>
              <div className="second-circle"></div>
              <i className="fa-solid fa-location-dot violet-shade-c" ></i>
            </div>
          </div>
          <div className="time-container ">
            <TimeStamp  setTime ={setTime}/>
          </div>
          <div className="button-container next-button mt-4 d-flex align-items-end justify-content-end" onClick={e=>{moveToNextPage()}}>
               <div className ="button-container-next">Next</div>
               <i className="fa-solid fa-angles-right d-flex align-item-center mt-1" ></i>
          </div>
        </div>
       </div>
       {showStops && 
        <div className="bookform d-flex align-items-center justify-content-center">
          <div className="bookform-container d-flex flex-column align-items-center">
            <div className="toggle-container d-flex align-items-end">
                <div className='toggle-container-text lh-1'>
                  <h2>Offer a Ride</h2>
                  <p>we get you the matches asap !</p>
                </div>
                  <div className="toggle-btn d-flex justify-content-center" onClick={e=>{moveToNextPage()}}>
                    <div className="toggle-btn-outer mt-3 d-flex align-items-center justify-content-start ps-1 orange-shade-bg"><div className="toggle-btn-inner"></div></div>
                  </div>
            </div>
            <div className="input-feild-container">
              <div className="input-feild offer-ride-input-feild">
                
                 <div className="form-floating d-flex ">
                   <input type="text" className="form-control border-0 border-bottom" id="to"  placeholder="Password" value={source} />
                   <label htmlFor="to" className=''>From</label>
                  </div>
                {
                   stopsList.map((item , index) =>
                   <div className="form-floating d-flex ">
                   <input type="text" className="form-control border-0 border-bottom" id="to" name="name" onChange={e=>{handleInputChange(e , item , index)}} />
                   <label htmlFor="to" className=''>Stop {index+1}</label>
                  </div>
                 )
                }
                
              <div className="form-floating d-flex ">
                   <input type="text" className="form-control border-0 border-bottom" id="to" value={destination}/>
                   <label htmlFor="to" className=''>To</label>
                   <i className="fa-solid fa-plus mt-4" onClick={addInputFeild}></i>
                  </div>
              </div>
              <div className="progress-bar d-flex align-items-center justify-content-between" style={{height:"60%"}}>
                <div className="first-circle" ></div>
                <div className="second-circle" ></div>
                <div className="second-circle" ></div>
                <div className="second-circle" ></div>
                <div className="second-circle" ></div>
                <div className="second-circle"></div>
                <i className="fa-solid fa-location-dot violet-shade-c" ></i>
              </div>
            </div>
            <div className="time-container d-flex">
                <div className="available-seat mt-2">
                <label>Available Seat</label>
                  <div className="total-seats d-flex justify-content-between mt-2">
                      <div className={`seats d-flex align-items-center justify-content-center ${selectedStop == '1' ? 'selected-stop':''}`} onClick={e=>{e.preventDefault(); setSelectedStop('1'); setSeats('1')}}>1</div>
                      <div className={`seats d-flex align-items-center justify-content-center ${selectedStop == '2' ? 'selected-stop':''}`} onClick={e=>{e.preventDefault(); setSelectedStop('2'); setSeats('2')}}>2</div>
                      <div className={`seats d-flex align-items-center justify-content-center ${selectedStop == '3' ? 'selected-stop':''}`} onClick={e=>{e.preventDefault(); setSelectedStop('3'); setSeats('3')}}>3</div>
                  </div>
                  </div>
                <div className="total-price mt-2 d-flex flex-column"> 
                <label >Price</label>
                <div className=" d-flex">
                    <input type="text" className='border-0 w-50 h-50 mt-3 price-input' placeholder='180$' onChange={e=>{setPrice(e.target.value)}}/>
                </div>
                </div>
            </div>
            <div className="button-container mt-4" >
                <button type="button" className="btn btn-primary" onClick={handleSubmit} >Submit</button>
            </div>
          </div>
        </div>
       }
    </div>
    </div>
  )
}


