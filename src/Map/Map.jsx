import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from "leaflet";
import "leaflet/dist/leaflet.css"
import "./Map.css"

const Map = () => {

    const position = [16.774741719524055, 96.15885236338531]

    //--------------------------To Show Marker Correctly------------------------
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    //---------------------------------------------------------------------------

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: "100vh" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}@2x.png?key=YLijIEQ71HGydGXSNPxz"
            />
            <Marker position={position}>
                <Popup className='custom-popup'>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map