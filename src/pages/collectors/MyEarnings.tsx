import MyEarningsComponent from '@/components/collectors/MyEarnings/MyEarningsComponent'


const MyEarnings = () => {
    return (
        <div className='flex min-h-lvh'>
            <div className="bg-primary md:mt-10 md:mr-5 px-4 py-10 md:py-5 rounded-t-2xl flex-1 ">

                <MyEarningsComponent />
            </div>
        </div>
    )
}

export default MyEarnings