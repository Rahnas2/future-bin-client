
import UserNav from '../../components/UserNav'
import Hero from '../../components/Marketing/Hero'
import img from '../../assets/brand-img-.jpeg'
import { MdLoop } from "react-icons/md";
import { TiTick } from 'react-icons/ti';
import AboutUs from '../../components/Marketing/AboutUs';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { fetchUserProfile } from '../../redux/slices/userSlice';
import SubscriptionPlans from '../../components/Marketing/SubscriptionPlans';
import ClientTestimonials from '@/components/Marketing/ClientTestimonials';


const LandingPage = () => {

    // const dispatch = useDispatch<AppDispatch>()

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             await dispatch(fetchUserProfile()).unwrap()
    //         } catch (error) {
    //             console.log('fetch user profile error ', error)
    //         }
    //     }
    //     fetchUser()
    // }, [])

    return (
        <>
            <UserNav />
            <div className='px-8 flex flex-col gap-15'>
                <Hero />
                <AboutUs />
                <SubscriptionPlans />
                <ClientTestimonials />
            </div>

        </>
    )
}

export default LandingPage