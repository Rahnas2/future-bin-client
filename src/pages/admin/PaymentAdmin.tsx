import { fetchRevenueSummaryApi } from '@/api/adminServices'
import RevenueChart from '@/components/Admin/Payment/RevenueChart'
import PaymentSummaryCard from '@/components/common/Payment/PaymentSummaryCard'
import Transactions from '@/components/common/Payment/Transactions'
import { revenueSummaryType } from '@/types/revenueSummaryType'
import { Banknote, RotateCcw, Send, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Props = {}

const PaymentAdmin = (props: Props) => {

  const [summary, setSummary] = useState({
    credited: 0,
    refunded: 0,
    transfered: 0
  })
  useEffect(() => {
    const fetchSummary = async() => {
      try {
        const result = await fetchRevenueSummaryApi()
        const summaryData = {
          credited: 0,
          refunded: 0,
          transfered: 0,
        };
  
        result.summary.forEach((item: revenueSummaryType) => {
          if (summaryData.hasOwnProperty(item.type)) {
            summaryData[item.type] = item.total;
          }
        });
  
        setSummary(summaryData);
      } catch (error) {
        console.error('error fetching revenue summary ', error)
      }
    }
    fetchSummary()
  },[])
  return (
    <div className='flex min-h-lvh'>
      <div className="py-4 min-h-lvh bg-primary mt-10 mr-10 rounded-t-2xl px-4 flex-1 flex flex-col gap-5">
        <h1 className="text-lg font-medium ">Payment Dashboard</h1>

        {/* Revenue summary */}
        <div className='flex gap-5 justify-between '>
          <PaymentSummaryCard Icon={Banknote} text1='Gross Revenue' text2={`$ ${summary.credited}`} />
          <PaymentSummaryCard Icon={Send} text1='Total Payouts' text2={`$ ${summary.transfered}`} />
          <PaymentSummaryCard Icon={RotateCcw} text1='Total Refunds' text2={`$ ${summary.refunded}`} />
          <PaymentSummaryCard Icon={Wallet} text1='Net Revenue' text2={`$ ${summary.credited - (summary.refunded + summary.transfered)}`} />
        </div>

        <RevenueChart />

        <Transactions />
      </div>
    </div>
  )
}

export default PaymentAdmin