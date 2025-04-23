import RevenueChart from '@/components/Admin/Payment/RevenueChart'
import React from 'react'

type Props = {}

const PaymentAdmin = (props: Props) => {
  return (
    <div className="py-4 flex-1 bg-primary my-10 mr-10 rounded-t-2xl px-4">
      <h1 className="text-lg font-medium mb-6">Payment Dashboard</h1>
    <RevenueChart />
    </div>
  )
}

export default PaymentAdmin