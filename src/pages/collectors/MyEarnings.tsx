import MyEarningsComponent from '@/components/collectors/MyEarnings/MyEarningsComponent'


const MyEarnings = () => {
    return (
        <div className='flex min-h-lvh'>
            <div className="bg-primary mt-10 mr-5 rounded-t-2xl px-4 py-4 flex-1 ">

                <MyEarningsComponent />
            </div>
        </div>
    )
}

export default MyEarnings