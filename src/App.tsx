import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AccountInfo from './pages/home/accountInfo/accountInfo';
import AddPatients from './pages/home/doctor/addPatients/addPatients';
import Home from './pages/home/home';
import AddDoctors from './pages/home/users/addDoctors/addDoctors';
import Register from './pages/register/register';
import SignUp from './pages/signUp/signUp';
import Welcome from './pages/welcome/welcome';
import {CreateRecords } from './pages/home/doctor/createRecords/createRecords';
import { DoctorRecords } from './pages/home/doctor/doctorRecords/doctorRecords';
import { UserRecords } from './pages/home/users/userRecords/userRecords';

function App() {
  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Welcome/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/register/signUp' element={<SignUp/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/home/accountInfo' element={<AccountInfo/>}/>
          <Route path='/home/addDoctors' element={<AddDoctors/>}/>
          <Route path='/home/addPatients' element={<AddPatients/>}/>
          <Route path='/home/createRecords' element={<CreateRecords/>}/>
          <Route path='/home/createRecords/:id' element={<DoctorRecords/>}/>
          <Route path='home/userRecords' element={<UserRecords/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
