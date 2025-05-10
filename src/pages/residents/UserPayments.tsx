import Transactions from '@/components/common/Payment/Transactions'


const UserPayments = () => {
    return (
            <div className="flex-1 md:py-15 md:px-8 md:bg-seconday rounded-lg shadow-sm">

                <div>
                    <h2 className='font-medium text-lg mb-6'>Transactions</h2>
                    <Transactions />
                </div>
            </div>
    )
}

export default UserPayments