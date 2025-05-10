import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet-routing-machine'
import 'leaflet/dist/leaflet.css';
import { MapRoutingMachine } from './MapRoutingMachine';


type Props = {
    yourPosition: [number, number]
    destination: [number, number]
    onRouteInfo: (distance: string, time: string) => void;
}

const LocationMap = (props: Props) => {

    return (
        <MapContainer
            center={props.yourPosition}
            zoom={15} className='w-4xl h-150'
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={props.destination}>
                <Popup>Destinatoin</Popup>
            </Marker>

            <Marker position={props.yourPosition}>
                <Popup>Your Location</Popup>
            </Marker>
            <MapRoutingMachine  yourPosition={props.yourPosition} destination={props.destination} onRouteInfo={props.onRouteInfo} />

        </MapContainer >
    )
}

export default LocationMap