
export const   signupUrl = 'https://localhost:7256/signup';
export const loginUrl = 'https://localhost:7256/login';
export const getAvailableRidesUrl = 'https://localhost:7256/api/BookRide/getavailablerides';
export const bookRideUrl = 'https://localhost:7256/api/BookRide/bookride';
export const offerRideUrl = 'https://localhost:7256/offerride';
export const getOfferedRidesUrl = 'https://localhost:7256/getOfferedRides';
export const getBookedRideUrl = 'https://localhost:7256/api/BookRide/getbookedride';

export const  headers = {
    "Content-type": "application/json; charset=UTF-8",
    "Authorization": 'Bearer ' + localStorage.getItem('jwt-token')
  }