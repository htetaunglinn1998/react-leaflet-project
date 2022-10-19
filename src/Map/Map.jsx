import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, ZoomControl } from 'react-leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from "leaflet";
import "leaflet/dist/leaflet.css"
import "./Map.css"

const Map = () => {

    const position = [16.774474543879833, 96.15880187732388]

    //--------------------------To Show Marker Correctly------------------------
    let DefaultIcon = L.icon({
        iconUrl: icon,
        iconAnchor: [12, 36],
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
            <Marker position={position} >
                <Popup className='custom-popup' offset={[6, -18]}>
                    Welcome to "Way To Go" App!
                </Popup>
            </Marker>
            <Circle center={position} radius={50}></Circle>
            <ZoomControl position="bottomright" />
        </MapContainer>
    )
}

export default Map