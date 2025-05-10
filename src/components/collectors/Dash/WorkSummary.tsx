import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
import { MdCancel, MdPending } from 'react-icons/md'
import { SiVirustotal } from 'react-icons/si'

type Props = {
    totalCollectionCount: number,
    totalPendingWorkCount: number,
    totalCompletedWorkCount: number,
    totalCacelWorkCount: number 
}

const WorkSummary = (props: Props) => {
  return (
    <div className="flex justify-between gap-5 [&>*]:bg-seconday [&>*]:px-8 [&>*]:py-6 [&>*]:rounded-lg [&>*]:w-2xs [&>*]:shadow-2xl">
    
                    <div className="shadow-2xl">
                        <div className="flex items-center justify-between mb-10">
                            <SiVirustotal className="inline text-accent2 text-2xl" />
                            <button className="border border-gray-500 px-3 py-1 rounded-full text-sm">View Detail</button>
                        </div>
    
                        <div className="text-md font-medium opacity-50 mb-3">Total Collection</div>
    
                        <div className="font-bold text-xl">{props.totalCollectionCount}</div>
                    </div>
    
                    <div>
                        <div className="flex items-center justify-between mb-10">
                            <MdPending className="inline text-accent2 text-2xl" />
                            <button className="border border-gray-500 px-3 py-1 rounded-full text-sm" >View Detail</button>
                        </div>
    
                        <div className="text-md font-medium opacity-50 mb-3">Pending Works</div>
    
                        <div className="font-bold text-xl">{props.totalPendingWorkCount}</div>
                    </div>
    
                    <div>
                        <div className="flex items-center justify-between mb-10">
                            <IoCheckmarkDoneCircleSharp className="inline text-accent2 text-2xl" />
                            <button className="border border-gray-500 px-3 py-1 rounded-full text-sm">View Detail</button>
                        </div>
                        <div className="text-md font-medium opacity-50 mb-3">Completed Works</div>
    
                        <div className="font-bold text-xl">{props.totalCompletedWorkCount}</div>
                    </div>
    
    
                    <div>
                        <div className="flex items-center justify-between mb-10">
                            <MdCancel className="inline text-accent2 text-2xl" />
                            <button className="border border-gray-500 px-3 py-1 rounded-full text-sm">View Detail</button>
                        </div>
                        <div className="text-md font-medium opacity-50 mb-3">Cancelled Work</div>
    
                        <div className="font-bold text-xl">{props.totalCacelWorkCount}</div>
                    </div>
                </div>
  )
}

export default WorkSummary