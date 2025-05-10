import BackBtn from '@/components/common/BackBtn'
import { getPosition } from '@/utils/getCurrentPosition'
import LocationMap from '@/components/common/Map/LocationMap'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'


const Map = () => {

    const location = useLocation()

    const { destination } = location.state
    const [yourPosition, setYourPosition] = useState<[number, number] | null>(null)
    const [routeInfo, setRouteInfo] = useState<{ distance: string; time: string } | null>(null);

    useEffect(() => {
        const getCurrentPosition = async () => {
            try {
                const response = await getPosition()
                console.log('response position ', response)
                setYourPosition([response.latitude, response.longitude])
            } catch (error) {
                console.error('error getting current position ', error)
            }
        }
        getCurrentPosition()
    }, [])

    const handleRouteInfo = (distance: string, time: string) => {
        setRouteInfo({ distance, time });
    }

    return (
        <div className='px-5 py-4'>
            <BackBtn />
            <div className='flex flex-col items-center justify-center m-3'>
                {yourPosition !== null && <LocationMap destination={destination} yourPosition={yourPosition} onRouteInfo={handleRouteInfo} />}

                {routeInfo && (
                <div className="mt-4 text-center bg-white rounded-lg shadow-md p-3 w-64 mx-auto border border-gray-200">
                    <p className="text-sm text-gray-700">
                        Distance: <span className="font-bold text-blue-600">{routeInfo.distance} km</span>
                    </p>
                    <p className="text-sm text-gray-700">
                        Estimated Time: <span className="font-bold text-blue-600">{routeInfo.time} minutes</span>
                    </p>
                </div>
            )}
            </div>
        </div>
    )
}

export default Map