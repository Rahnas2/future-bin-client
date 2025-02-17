
import {Routes, Route} from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import SelectRole from '../pages/auth/SelectRole'
import CompleteProfile from '../pages/auth/CompleteProfile'
import OtpVerfication from '../pages/auth/OtpVerfication'


const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/otp-verification' element={<OtpVerfication />} />
        <Route path='/select-role' element={<SelectRole />}/>
        <Route path='complete-profile' element={<CompleteProfile />}/>
    </Routes>
  )
}

export default AppRoutes