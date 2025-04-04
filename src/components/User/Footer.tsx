import brand from '../../assets/brand-img-.jpeg'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div>
        <div>
            <img src={brand} alt="brand icon" />
        </div>

        <p className='opacity-50'>Comprehensive waste management solutions for residential, commercial, and industrial needs</p>

        <div className='flex'>
            <div>
                <div>
                    <h3>Quick Links</h3>
                    <span>Home</span>
                    <span>About Us</span>
                    <span>Subscrption Plans</span>
                </div>
            </div>
            <div>
                <div>
                    <h3>Connect with  Us</h3>
                </div>
                <div>
                    <h3>Contact Us</h3>
                </div>
            </div>
        </div>

        <div>© Brand Name. All right reserved</div>
    </div>
  )
}

export default Footer