import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import {BrowserRouter , Routes , Route , Link} from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Login from './screens/Login';
import Register from './screens/Register';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';
function App() {
  return (
    <div className="App">
      <Nav/>
      <BrowserRouter>
      <Routes>
      <Route path='/home' element={<Homescreen/>}/>
      <Route path='/book/:roomid/:fromdate/:todate' element={<Bookingscreen/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={<Profilescreen/>}/>
      <Route path='/profile' element={<Profilescreen/>}/>
      <Route path='/admin' element={<Adminscreen/>}/>
      <Route path='/' element={<Landingscreen/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
