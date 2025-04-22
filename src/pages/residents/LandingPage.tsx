
import UserNav from '../../components/UserNav'
import Hero from '../../components/Marketing/Hero'
import AboutUs from '../../components/Marketing/AboutUs';
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