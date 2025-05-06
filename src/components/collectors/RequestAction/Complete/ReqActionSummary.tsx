import { useOnDemandComplete } from "@/context/OnDemandCompleteContex"
import { ArrowDown, ArrowUp, CreditCard } from "lucide-react"


type Props = {

}

const ReqActionSummary = (props: Props) => {

  const { pickupRequest } = useOnDemandComplete()

  const balanceAmount = pickupRequest.totalAmount - (pickupRequest.paidAmount as number);
  const isRefund = balanceAmount < 0;

  return (
    <div className="flex flex-col rounded-lg shadow-sm p-6">

      <div className="flex items-center mb-6">
        <CreditCard className="w-6 h-6 text-green-600 mr-3" />
        <h2 className="text-xl font-semibold">Payment Summary</h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 ">
          <span className="opacity-50">Total Weight</span>
          <span className="font-medium">{pickupRequest.totalWeight} kg</span>
        </div>

        <div className="flex justify-between items-center py-3">
          <span className="opacity-50">Total Amount</span>
          <span className="font-medium">${pickupRequest.totalAmount}</span>
        </div>

        <div className="flex justify-between items-center py-3 ">
          <span className="opacity-50">Amount Paid</span>
          <span className="font-medium text-green-600">${pickupRequest.paidAmount}</span>
        </div>

        {balanceAmount !== 0 && (
          <div className={`flex justify-between items-center py-3 ${isRefund ? 'text-blue-600' : 'text-red-600'
            }`}>
            <span className="flex items-center">
              {isRefund ? (
                <>
                  <ArrowDown className="w-4 h-4 mr-2" />
                  Refund Amount
                </>
              ) : (
                <>
                  <ArrowUp className="w-4 h-4 mr-2" />
                  Balance to Pay
                </>
              )}
            </span>
            <span className="font-medium">${Math.abs(balanceAmount)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReqActionSummary