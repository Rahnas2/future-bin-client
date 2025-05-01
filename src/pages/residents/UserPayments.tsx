import Transactions from '@/components/common/Payment/Transactions'

type Props = {}

const UserPayments = (props: Props) => {
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