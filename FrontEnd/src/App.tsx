import { Routes, Route} from 'react-router-dom';
import { Home } from './Pages/Rides/Home';
import { SignUp  } from './Pages/Authentication/SignUp';
import { BookRide } from './Pages/Rides/BookRide';
import { OfferRide } from './Pages/Rides/OfferRide';
import { History } from './Pages/Rides/History';
import './App.scss';
import { Login } from './Pages/Authentication/Login';

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path='/' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}> </Route>
     </Routes>
     { localStorage.getItem('jwt-token') && 
      <Routes> 
        <Route path='/bookorofferride' element={<Home/>}/>
        <Route path='/offerride' element={<OfferRide/>}/>
        <Route path='/bookride' element ={<BookRide/>}/>
        <Route path='/history' element={<History/>}/>
      </Routes>
     }
    </div>
  );
}
export default App;










