import { useState } from "react";
import "./bookride.scss";
import { TimeStamp } from "../../Components/TimeStamp";
import { MatchingCard } from "../../Components/MatchingCard";
import { Header } from "../Navbar/Header";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {
  bookingRequestType,
  bookRideFormType,
  rideDetailsType,
  tokenType,
} from "../../Interfaces/RidesType";
import { matchedRideType } from "../../Interfaces/RidesType";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { headers , getAvailableRidesUrl , bookRideUrl } from "../../HttpServices/HttpUrls";

export const BookRide = () => {
  let tokenDetails: tokenType = jwt_decode(localStorage.getItem("jwt-token")!);
  const [show, setShow] = useState(false);

  let [stop1, setStop1] = useState<string>("");
  let [stop2, setStop2] = useState<string>("");
  let [date, setDate] = useState<string>("");
  let [time, setTime] = useState<string>("");
  let [noOfSeats, setNoOfSeats] = useState<string>('0');
  let [availableRides, setAvailableRides] = useState<rideDetailsType[]>([]);
  let [showMatchingCard , setShowMatchingCard] = useState<boolean>(false);
  let [selectedRideDetails, setSelectedRideDetails] = useState<rideDetailsType>(
    {} as rideDetailsType 
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<bookRideFormType>();

  const handleClose = () => setShow(false);

  const handleToggleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    window.location.replace("/offerride");
  };

  const validateBookRideDetails = ()=>{
    if(stop1.trim() === "" || stop2.trim() === "" || time === "") {
      alert("All feilds required");
      return false;
    }
    else if(Number(noOfSeats) <=0) {
      alert("Seats should be positive");
      return false;
    } 
    return true;
  }
  const getAvailableRides = async () => {
    if(!validateBookRideDetails()) {
      return ;
    }
    let tokenDetails: tokenType = jwt_decode(
      localStorage.getItem("jwt-token")!
    );
    const getAvailableRides: matchedRideType = {
      id: 0,
      sourceId: 0,
      destinationId: 0,
      sourceName: stop1.toLowerCase(),
      destinationName: stop2.toLowerCase(),
      userId: tokenDetails.id,
      date: date,
      inTime: time,
      outTime: "2023-03-20T11:33:20.257Z",
      noOfPassenger: Number(noOfSeats),
    };
    let url =`${getAvailableRidesUrl}`;
    try {
      let token = localStorage.getItem('jwt-token');
      var res = await axios.post(url, getAvailableRides , {headers:headers});
      setAvailableRides(res.data);
      setShowMatchingCard(true);
      if(res.data.length!=0){
        toast.success("Get Available ride Successfull");
      }else{
        toast.error("No Rides Found")
      }
      
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  const bookedRide = async (rideDetails: rideDetailsType) => {
    setSelectedRideDetails(rideDetails);
    setShow(true);
  };
  const handleBookRide = async () => {
    const bookRide = {
      id: 0,
      email: tokenDetails.email,
      rideId: selectedRideDetails.id,
      sourceId: 0,
      destinationId: 0,
      date: date,
      inTime: time,
      outTime: "string",
      source: stop1.toLowerCase(),
      destination: stop2.toLowerCase(),
      ownerId: selectedRideDetails.ownerId,
      userId: tokenDetails.id,
      fair: getRideFair(selectedRideDetails),
      noOfPassenger: noOfSeats,
    };
    try {
      let url = `${bookRideUrl}`;
      let token = localStorage.getItem('jwt-token');
      const res = await axios.post(url, bookRide , {headers:headers});
      handleClose();
      toast.success("Ride Booked Successfully.");
      window.location.replace("/history");
    } catch (err) {
      toast.error("Booking Ride Failed");
    }
  };

  const getAvailableSeats: any = (rideDetails: rideDetailsType) => {
    let availabaleSeats = Number.MAX_VALUE;
    let flag = false;
    let noOfStops = 0;
    for (let i = 0; i < rideDetails.stops?.length; i++) {
      var currentStopAvailability =
        Number(rideDetails.capacity) - Number(rideDetails.stops[i].occupency);
      if (rideDetails.stops[i].name == stop1.toLowerCase()) {
        flag = true;
        noOfStops++;
        availabaleSeats = Math.min(currentStopAvailability, availabaleSeats);
      }
      if (rideDetails.stops[i].name == stop2.toLowerCase())
        return availabaleSeats;
      if (flag) {
        noOfStops++;
        availabaleSeats = Math.min(currentStopAvailability, availabaleSeats);
      }
      
    }
    return availabaleSeats;
  };

  const getRideFair: any = (rideDetails: rideDetailsType) => {
    let totalStops: number = rideDetails.stops?.length - 1;
    let flag = false;
    let noOfStops: number = 0;
    for (let i = 0; i < rideDetails.stops?.length; i++) {
      if (rideDetails.stops[i].name == stop1.toLowerCase()) {
        flag = true;
        noOfStops++;
      }
      if (flag) {
        noOfStops++;
      }
      if (rideDetails.stops[i].name == stop2.toLowerCase()) break;
    }
    noOfStops = noOfStops - 2;
    let fairPerStop: number = parseInt(rideDetails.fairPerKm) / totalStops;
    let price: number = Number(fairPerStop * noOfStops)*(Number)(noOfSeats);
    return price.toFixed(2);
  };
  
  return (
    <div className="bookride-container">
      <ToastContainer />
      <div className="book-ride-header d-flex align-items-center justify-content-center">
        <Header />
      </div>
      <div className="bookride d-flex flex-wrap ">
        <div className="bookform d-flex align-items-center justify-content-center">
          <div
            className="bookform-container d-flex flex-column align-items-center "
          >
            <div className="toggle-container d-flex align-items-end">
              <div className="toggle-container-text lh-1">
                <h2>Book a Ride</h2>
                <p>we get you the matches asap !</p>
              </div>
              <div
                className="toggle-btn d-flex justify-content-center"
                onClick={(e) => handleToggleClick(e)}
              >
                <div className="toggle-btn-outer mt-3 d-flex align-items-center justify-content-end violet-shade-bg pe-1">
                  <div className="toggle-btn-inner"></div>
                </div>
              </div>
            </div>
            <div className="input-feild-container d-flex">
              <div className="input-feild ">
                <div className="form-floating mb-0">
                  <input
                    type="text"
                    className="form-control border-0 border-bottom"
                    id="from"
                    placeholder="name@example.com" required
                    onChange={(e) => {
                      setStop1(e.target.value);
                      setShowMatchingCard(false);
                    }}
                  />
                  <label htmlFor="from">From</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control border-0 border-bottom"
                    id="to"
                    placeholder="To" required
                    onChange={(e) => {
                      setStop2(e.target.value);
                      setShowMatchingCard(false);
                    }}
                  />
                  <label htmlFor="to" className="">
                    To
                  </label>
                </div>
                <div className="form-floating">
                  <label htmlFor="to" className="pt-1">
                    Seats
                  </label>
                  <input
                    type="number"
                    className="form-control border-0 border-bottom"
                    id="seats"
                    placeholder="Seats" required 
                    min='1'
                    onChange={(e) => {
                      setNoOfSeats(e.target.value);
                      setShowMatchingCard(false);
                    }}
                  />
                </div>

                <div className="form-floating ">
                  <input
                    type="date"
                    min={ new Date().toISOString().split("T")[0]}
                    className="form-control border-0 border-bottom fs-6 pl-0"
                    id="date"
                    placeholder="dd/mm/yy" required 
                    onChange={(e) => {
                      setDate(e.target.value);
                      setShowMatchingCard(false);
                    }}
                  />
                  <label htmlFor="date" className="pl-0">
                    Date
                  </label>
                </div>
              </div>
              <div className="progress-bar d-flex align-items-center justify-content-between">
                <div className="first-circle"></div>
                <div className="second-circle"></div>
                <div className="second-circle"></div>
                <div className="second-circle"></div>
                <div className="second-circle"></div>
                <i className="fa-solid fa-location-dot violet-shade-c"></i>
              </div>
            </div>
            <div className="time-container ">
              <TimeStamp setTime={setTime} />
            </div>
            <div className="button-container mt-4">
              <button type="button" className="btn btn-primary" onClick={getAvailableRides}>
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="matches-container pt-3">
          <div className="m-container-header d-flex align-items-center">
            <h3>Your Matches</h3>
          </div>
          <div className="card-container d-flex flex-wrap">
            {showMatchingCard && availableRides.length != 0 ? (
              availableRides.map((rideDetails) => (
                <MatchingCard
                  rideDetails={rideDetails}
                  bookedRide={bookedRide}
                  getAvailableSeats={getAvailableSeats}
                  getRideFair={getRideFair}
                />
              ))
            ) : (
              <p> Oops ! Sorry No Ride Mathces....</p>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="matching-card ">
            <div className="card-header p-0 d-flex justify-content-between">
              <h3>{selectedRideDetails.email?.split("@")[0]}</h3>
              <div className="image-container d-flex align-items-end justify-content-end"></div>
            </div>
            <div className="matching-card-content">
              <div className="to-from d-flex">
                <div className="from">
                  <label>From</label>
                  <p>{selectedRideDetails.source}</p>
                </div>
                <div className="icon d-flex align-items-center justify-content-between">
                  <div className="first-circle violet-shade-bg"></div>
                  <div className="second-circle"></div>
                  <div className="second-circle"></div>
                  <div className="second-circle"></div>
                  <div className="second-circle"></div>
                  <i className="fa-solid fa-location-dot violet-shade-c"></i>
                </div>
                <div className="to">
                  <label>To</label>
                  <p>{selectedRideDetails.destination}</p>
                </div>
              </div>
              <div className="date-time d-flex">
                <div className="date">
                  <label>Date</label>
                  <p>{date.substring(0, 10)}</p>
                </div>
                <div className="time">
                  <label>Time</label>
                  <p>{time}</p>
                </div>
              </div>
              <div className="seat-price d-flex">
                <div className="seat">
                  <label>Price</label>
                  <p>{getRideFair(selectedRideDetails)}$</p>
                </div>
                <div className="price">
                  <label>Seat Availability</label>
                  <p>{getAvailableSeats(selectedRideDetails)}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBookRide}>
            Book Ride
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
