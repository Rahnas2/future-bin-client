
import authBanner from '../../assets/auth-img-1.jpg'


const Banner = () => {
    return (
        <div className='hidden xl:block'>
            <img className='h-full' src={authBanner} alt="" />
        </div>
    )
}

export default Banner