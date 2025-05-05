
import { useCallback, useEffect, useState } from "react";
import { fetchPickupRequestHistoryApi } from "@/api/userService";
import { BasePickupRequestType, pickupRequestType } from "@/types/PickupRequest";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/slices";
import WorkSummary from "./WorkSummary";
import AreaChart from "./AreaChart";
import CollectorRequestHistoryTable from "./CollectorRequestHistoryTable";
import EmptyCollections from "./EmptyCollections";
import { CityCollectionDataType } from "@/types/CityCollectionDataType";
import WorkStatus from "./WorkStatus";
import { fetchAreaDataForCollectorApi } from "@/api/pickupRequest";
import ComponentSpinner from "@/components/common/ComponentSpinner";

type Props = {}

const CollectorDashComp = (props: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [loadingAreaData, setloadingAreaData] = useState(false)


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

    // Pagination states
    const [allPagination, setAllPagination] = useState({
        currentPage: 1,
        totalPages: 1
    });
    const [pendingPagination, setPendingPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    });
    const [completedPagination, setCompletedPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    });
    const [cancelledPagination, setCancelledPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    });

    const { collector } = useSelector((state: IRootState) => state.collector)

    const [areaChartData, setAreaChartData] = useState<CityCollectionDataType[]>([]);

    const fetchRequestHistory = useCallback(async () => {
        try {
            //fetch all paginated data for reach state
            const [allResult, pendingResult, completedResult, cancelledResult] = await Promise.all([
                fetchPickupRequestHistoryApi('all', allPagination.currentPage, 10),
                fetchPickupRequestHistoryApi('confirmed', pendingPagination.currentPage, 10),
                fetchPickupRequestHistoryApi('completed', completedPagination.currentPage, 10),
                fetchPickupRequestHistoryApi('cancelled', cancelledPagination.currentPage, 10),
            ]);

            // Update collections
            setAllCollections(allResult.requests)
            setPendingCollections(pendingResult.requests)
            setCompletedCollections(completedResult.requests)
            setCancelledCollections(cancelledResult.requests)

            // Update pagination states
            setAllPagination((prev) => ({
                ...prev,
                totalPages: allResult.totalPages,
            }));
            setPendingPagination((prev) => ({
                ...prev,
                totalPages: pendingResult.totalPages,
            }));
            setCompletedPagination((prev) => ({
                ...prev,
                totalPages: completedResult.totalPages,
            }));
            setCancelledPagination((prev) => ({
                ...prev,
                totalPages: cancelledResult.totalPages,
            }));

            // Update work summary
            setWorkSummary({
                totalCollection: allResult.total,
                pendingWorks: pendingResult.total,
                completedWorks: completedResult.total,
                cancelledWorks: cancelledResult.total,
            })

        } catch (error) {
            console.error('error fetching request history', error)
        } finally {
            setIsLoading(false)
        }
    }, [
        allPagination.currentPage,
        pendingPagination.currentPage,
        completedPagination.currentPage,
        cancelledPagination.currentPage,
    ])

    useEffect(() => {
        fetchRequestHistory()
    }, [fetchRequestHistory])

    useEffect(() => {
        const fetchAreaData = async () => {
            try {
                setloadingAreaData(true)
                const result = await fetchAreaDataForCollectorApi()
                setAreaChartData(result.data)
            } catch (error) {
                console.log('error fetching area data ', error)
            } finally {
                setloadingAreaData(false)
            }
        }
        fetchAreaData()
    }, [])


    return (
        <div className="bg-primary mt-10 mr-4 rounded-t-2xl px-4 py-4 flex-1 ">
            {isLoading ? <ComponentSpinner /> :
                <>
                    <WorkStatus status={collector?.details?.status ? collector.details.status as 'active' | 'in-active' : 'in-active'} />

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
                            allCollection.length ?
                                <div className="flex items-center justify-between">
                                    <CollectorRequestHistoryTable
                                        collectionHistory={allCollection}
                                        type="all"
                                        pagination={allPagination}
                                        setPagination={setAllPagination}
                                    />
                                    <div className="">
                                        {loadingAreaData ? <ComponentSpinner /> : <AreaChart data={areaChartData.map(data => ({ city: data.city, count: data.total }))} total={workSummary.totalCollection} />}
                                    </div>
                                </div> :
                                <EmptyCollections type="all" />
                        }

                    </div>

                    {allCollection.length !== 0 &&
                        <>
                            {/* // /* pending collections */}
                            < div className="mt-8">
                                <div className="mb-8">Pending Works</div>

                                {pendingCollections.length ?
                                    <div className="flex items-center justify-between">
                                        <CollectorRequestHistoryTable
                                            collectionHistory={pendingCollections}
                                            type="pending"
                                            pagination={pendingPagination}
                                            setPagination={setPendingPagination}
                                        />
                                        {loadingAreaData ? <ComponentSpinner /> : <AreaChart data={areaChartData.map(data => ({ city: data.city, count: data.pending }))} total={workSummary.pendingWorks} />}
                                    </div> :
                                    <EmptyCollections type="pending" />
                                }
                            </div>


                            {/* /* completed collections */}
                            <div className="mt-8">
                                <div className="mb-8">Completed Works</div>
                                {completedCollections.length ?
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CollectorRequestHistoryTable
                                                collectionHistory={completedCollections}
                                                type="completed"
                                                pagination={completedPagination}
                                                setPagination={setCompletedPagination}
                                            />
                                        </div>
                                        <div>
                                            {loadingAreaData ? <ComponentSpinner /> : <AreaChart data={areaChartData.map(data => ({ city: data.city, count: data.completed }))} total={workSummary.completedWorks} />}
                                        </div>
                                    </div> :
                                    <EmptyCollections type="completed" />
                                }

                            </div>

                            {/* //  cancelled collections */}
                            <div className="mt-8">
                                <div className="mb-8">Canelled Works</div>
                                {cancelledCollections.length ?
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CollectorRequestHistoryTable
                                                collectionHistory={cancelledCollections}
                                                type="cancelled"
                                                pagination={cancelledPagination}
                                                setPagination={setCancelledPagination}
                                            />
                                        </div>
                                        <div>
                                            {loadingAreaData ? <ComponentSpinner /> : <AreaChart data={areaChartData.map(data => ({ city: data.city, count: data.cancelled }))} total={workSummary.cancelledWorks} />}
                                        </div>
                                    </div> :
                                    <EmptyCollections type="cancelled" />
                                }

                            </div>
                        </>
                    }
                </>
            }
        </div >

    )
}

export default CollectorDashComp