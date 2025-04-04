import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { createControlComponent } from '@react-leaflet/core';


interface CustomRoutingProps extends L.ControlOptions {
    yourPosition: [number, number];
    destination: [number, number];
    onRouteInfo: (distance: string, time: string) => void;
  }

const createRoutingMachineLayer = (props: CustomRoutingProps) => {
    const instance = L.Routing.control({
        waypoints: [
            L.latLng(props.yourPosition[0], props.yourPosition[1]),
            L.latLng(props.destination[0], props.destination[1]),
        ],
        routeWhileDragging: true,
        show: false,
        fitSelectedRoutes: true,
        showAlternatives: true,
        lineOptions: {
            styles: [{ color: '#6FA1EC', weight: 4 }],
        } as any,
    });

    // Add event listener for route calculation
    instance.on('routesfound', (e) => {
        const routes = e.routes;
        const summary = routes[0].summary;
        const distance = (summary.totalDistance / 1000).toFixed(2); // Convert meters to km
        const time = Math.round(summary.totalTime / 60); // Convert seconds to minutes
        props.onRouteInfo(distance, time.toString());
    });

    return instance;
};

export const MapRoutingMachine = createControlComponent(createRoutingMachineLayer)   