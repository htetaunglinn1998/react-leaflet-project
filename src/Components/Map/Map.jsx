import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, ZoomControl, VideoOverlay } from 'react-leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from "leaflet";
import "leaflet/dist/leaflet.css"
import "./Map.css"
import GeoSearch from '../GeoSearch/GeoSearch';


const Map = () => {

    const [position, setPosition] = useState([16.774474543879833, 96.15880187732388])


    //---------------------Getting Current Location-------------------------
    // function getLocation() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.watchPosition(showPosition);
    //     } else {
    //         console.log("Geolocation is not supported by this browser.")
    //     }
    // }
    // function showPosition(position) {
    //     console.log("position", position);
    //     setPosition([position.coords.latitude, position.coords.longitude])
    // }

    // setTimeout(() => {
    //     getLocation();
    // }, 5000)

    //--------------------------To Show Marker Correctly------------------------
    let DefaultIcon = L.icon({
        iconUrl: icon,
        iconAnchor: [12, 40],
        shadowUrl: iconShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    //---------------------------------------------------------------------------

    return (
        <MapContainer center={position} zoomControl={false} zoom={18} scrollWheelZoom={true} style={{ height: "100vh" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}@2x.png?key=YLijIEQ71HGydGXSNPxz"
            />
            <Marker position={position}>
                <Popup className='custom-popup' offset={[6, -18]}>
                    Welcome to "Mapify" App! We are here for you.
                </Popup>
            </Marker>
            <GeoSearch />
            <Circle center={position} radius={50}></Circle>
            <ZoomControl position="bottomright" />
        </MapContainer>
    )
}

export default Map