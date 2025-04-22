
import UserNav from '../../components/UserNav'
import Hero from '../../components/Marketing/Hero'
import AboutUs from '../../components/Marketing/AboutUs';
import SubscriptionPlans from '../../components/Marketing/SubscriptionPlans';
import ClientTestimonials from '@/components/Marketing/ClientTestimonials';
import Footer from '@/components/User/Footer';


const LandingPage = () => {

    return (
        <>
            <UserNav />
            <div className='px-8 flex flex-col gap-15 mb-8'>
                <Hero />
                <AboutUs />
                <SubscriptionPlans />
                <ClientTestimonials />
            </div>
            <Footer />

        </>
    )
}

export default LandingPage