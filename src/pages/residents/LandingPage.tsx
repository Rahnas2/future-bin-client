
// import { useDispatch } from 'react-redux'
import UserNav from '../../components/UserNav'
// import { AppDispatch } from '../../redux/store'
// import { logOut } from '../../redux/slices/authSlice'
// import { useNavigate } from 'react-router-dom'


const LandingPage = () => {
    // const handleLogOut = async () => {
    //     try {
    //         await dispatch(logOut()).unwrap()
    //         navigate('/login')
    //     } catch (error) {
    //         console.log('log out errror ', error)
    //     }
    // }
    return (
        <>
            <UserNav />
            {/* <div onClick={handleLogOut} className="flex justify-end ">
                <span onClick={handleLogOut} className="px-6 py-2 bg-accent cursor-pointer">Logout</span>
            </div> */}
        </>
    )
}

export default LandingPage