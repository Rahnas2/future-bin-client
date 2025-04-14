import { useOnDemandComplete } from "@/context/OnDemandCompleteContex"


type Props = {

}

const ReqActionSummary = (props: Props) => {

  const { pickupRequest } = useOnDemandComplete()

  return (
    <div>
      <div>
        <span>Total Weight</span>
        <span>{pickupRequest.totalWeight}</span>
      </div>
      <div>
        <span>Actual Price</span>
        <span>{pickupRequest.totalAmount}</span>
      </div>
      <div>
        <span>Paid Amount</span>
        <span>{pickupRequest.paidAmount}</span>
      </div>
      <div>
        <span>Balance To Pay</span>
        <span>{pickupRequest.totalAmount - (pickupRequest.paidAmount as number)}</span>
      </div>
    </div>
  )
}

export default ReqActionSummary