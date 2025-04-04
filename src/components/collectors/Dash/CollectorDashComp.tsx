
import { useEffect, useState } from "react";
import { fetchPickupRequestHistoryApi } from "@/api/userService";
import { BasePickupRequestType, pickupRequestType } from "@/types/PickupRequest";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/slices";
import WorkSummary from "./WorkSummary";

import { MdLocationOn } from "react-icons/md";
import AreaChart from "./AreaChart";
import CollectorRequestHistoryTable from "./CollectorRequestHistoryTable";
import EmptyCollections from "./EmptyCollections";
import { number, string } from "yup";
import { CityCollectionDataType } from "@/types/CityCollectionDataType";

type Props = {}

const CollectorDashComp = (props: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)

    // work summary
    const [workSummary, setWorkSummary] = useState({
        totalCollection: 0,
        pendingWorks: 0,
        completedWorks: 0,
        cancelledWorks: 0,
    });

    // work summary detail
    const [allCollection, setAllCollections] = useState<pickupRequestType[]>([])
    const [pendingCollections, setPendingCollections] = useState<pickupRequestType[]>([])
    const [completedCollections, setCompletedCollections] = useState<pickupRequestType[]>([])
    const [cancelledCollections, setCancelledCollections] = useState<pickupRequestType[]>([])

    const { collector } = useSelector((state: IRootState) => state.collector)

    const [areaChartData, setAreaChartData] = useState<CityCollectionDataType[]>([]);


    useEffect(() => {
        const fetchRequestHistory = async () => {
            try {

                //fetch request history
                const result = await fetchPickupRequestHistoryApi()
                const requestHistory = result.requestHistory

                //handle count of work summary
                let newCounts = {
                    totalCollection: requestHistory.length,
                    pendingWorks: 0,
                    completedWorks: 0,
                    cancelledWorks: 0,
                };



                let cityDataMap = new Map<string, CityCollectionDataType>();

                requestHistory.forEach((req: pickupRequestType) => {
                    if (req.status === 'accepted') newCounts.pendingWorks++;
                    else if (req.status === 'completed') newCounts.completedWorks++;
                    else if (req.status === 'cancelled') newCounts.cancelledWorks++;

                    const city = req.address.city
                    if (cityDataMap.has(city)) {

                        const cityStatus = cityDataMap.get(city)!
                        cityStatus.total++
                        if (req.status === 'accepted') cityStatus.pending++
                        else if (req.status === 'completed') cityStatus.completed++;
                        else if (req.status === 'cancelled') cityStatus.cancelled++;

                        cityDataMap.set(city, cityStatus)

                    } else {
                        cityDataMap.set(city, {
                            city: city,
                            total: 1,
                            pending: 0,
                            completed: 0,
                            cancelled: 0,
                        })
                    }
                });

                setWorkSummary(newCounts);

                //handle work summary detail
                setAllCollections(requestHistory)
                setPendingCollections(requestHistory.filter((req: pickupRequestType) => req.status === 'accepted'))
                setCompletedCollections(requestHistory.filter((req: pickupRequestType) => req.status === 'completed'))
                setCancelledCollections(requestHistory.filter((req: pickupRequestType) => req.status === 'cancelled'))

                const areaChartData: CityCollectionDataType[] = Array.from(cityDataMap.values());
                setAreaChartData(areaChartData);
                

                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.log('error fetching request history')
            }
        }
        fetchRequestHistory()
    }, [])


    if (isLoading) {
        return <div>loading..</div>
    }
    return (
        <div className="bg-primary my-10 mr-4 rounded-t-2xl px-4 py-4 flex-1 ">

            <div className="text-end">
                <label htmlFor="">Status: </label>
                <select className={`outline-0 ${collector?.details?.status === 'active' ? 'text-accent2' : 'text-red-600 '}`} name="" id="">
                    <option className="hidden" >{collector?.details?.status === 'active' ? 'on-duty' : 'off-duty'}</option>
                    <option value={collector?.details?.status === 'active' ? 'in-active' : 'active'}>{collector?.details?.status === 'active' ? 'off-duty' : 'off-duty'}</option>
                </select>

            </div>

            <div className="mb-5">
                <label htmlFor="">Today</label>
                <input type="text" />
            </div>

            <WorkSummary
                totalCollectionCount={workSummary.totalCollection}
                totalPendingWorkCount={workSummary.pendingWorks}
                totalCompletedWorkCount={workSummary.completedWorks}
                totalCacelWorkCount={workSummary.cancelledWorks}
            />

            {/* toatal collections */}
            <div className="mt-15">
                <div className="mb-8">Total Collections</div>

                {
                    workSummary.totalCollection ?
                        <div className="flex items-center justify-between">
                            <CollectorRequestHistoryTable
                                collectionHistory={allCollection}
                                type="all"
                            />
                            <div className="">
                                <AreaChart data={areaChartData.map(data => ({city: data.city, count: data.total}))} total={workSummary.totalCollection}/>
                            </div>
                        </div> :
                        <EmptyCollections type="all" />
                }

            </div>

            {workSummary.totalCollection !== 0 &&
                <>
                    {/* // /* pending collections */}
                    < div className="mt-8">
                        <div className="mb-8">Pending Works</div>

                        {workSummary.pendingWorks ?
                            <div className="flex items-center justify-between">
                                <CollectorRequestHistoryTable
                                    collectionHistory={pendingCollections}
                                    type="pending"
                                />
                                <AreaChart data={areaChartData.map(data => ({city: data.city, count: data.pending}))} total={workSummary.pendingWorks}/>
                            </div> :
                            <EmptyCollections type="pending" />
                        }
                    </div>


                    {/* /* completed collections */}
                    <div className="mt-8">
                        <div className="mb-8">Completed Works</div>
                        {workSummary.completedWorks ?
                            <div className="flex items-center justify-between">
                                <div>
                                    <CollectorRequestHistoryTable
                                        collectionHistory={completedCollections}
                                        type="completed"
                                    />
                                </div>
                                <div>
                                    <AreaChart data={areaChartData.map(data => ({city: data.city, count: data.completed}))} total={workSummary.completedWorks}/>
                                </div>
                            </div> :
                            <EmptyCollections type="completed" />
                        }

                    </div>

                    {/* //  cancelled collections */}
                    <div className="mt-8">
                        <div className="mb-8">Canelled Works</div>
                        {workSummary.cancelledWorks ?
                            <div className="flex items-center justify-between">
                                <div>
                                    <CollectorRequestHistoryTable
                                        collectionHistory={cancelledCollections}
                                        type="cancelled"
                                    />
                                </div>
                                <div>
                                    <AreaChart data={areaChartData.map(data => ({city: data.city, count: data.cancelled}))} total={workSummary.cancelledWorks}/>
                                </div>
                            </div> :
                            <EmptyCollections type="cancelled" />
                        }

                    </div>
                </>
            }

        </div >

    )
}

export default CollectorDashComp