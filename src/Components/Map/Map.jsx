import React, { useState, useRef, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, ZoomControl, Polyline, LayersControl, LayerGroup } from 'react-leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from "leaflet";
import "leaflet/dist/leaflet.css"
import "./Map.css"
import GeoSearch from '../GeoSearch/GeoSearch';


const Map = () => {
    const { BaseLayer } = LayersControl;

    const [position, setPosition] = useState([16.774474543879833, 96.15880187732388])
    const [alert, setAlert] = useState(false)

    const polyline = [
        [16.774474543879833, 96.15880187732388],
        [16.774494546, 96.15580189],
        [16.779294546, 96.15380189],
    ]

    const limeOptions = { color: "#000" }

    //-----------------Draggable Marker-------------------
    const markerRef = useRef(null)
    const circleRef = useRef(null)
    const [circleColor, setCircleColor] = useState("#2B82CB")

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                const circle = circleRef.current
                if (marker != null) {
                    let markerPos = marker.getLatLng()
                    let circlePos = circle.getLatLng()
                    if (circlePos.distanceTo(markerPos) < circle.getRadius()) {
                        console.log("Yayyy you are inside circle.")
                        window.alert("Yayyy you are inside circle.")
                        setCircleColor("#2B82CB")
                    } else {
                        console.log("Oops you are out of circle.")
                        window.alert("Oops you are out of circle.")
                        setCircleColor("#CF0A0A")
                    }
                }
            },
        }),
        [],
    )

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
        <>
            <MapContainer center={position} zoomControl={false} zoom={18} scrollWheelZoom={true} style={{ height: "100vh" }}>
                <LayersControl position="topright">
                    <BaseLayer checked name="OpenStreetMap">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}@2x.png?key=YLijIEQ71HGydGXSNPxz"
                        />
                    </BaseLayer>
                    <BaseLayer name="New Map">
                        <TileLayer
                            url="https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}@2x.jpg?key=YLijIEQ71HGydGXSNPxz"
                            attribution="&copy; NASA Blue Marble, image service by OpenGeo"
                        />
                    </BaseLayer>
                    <LayersControl.Overlay checked name="Marker with popup">
                        <Marker position={position} draggable={true} eventHandlers={eventHandlers} ref={markerRef}>
                            <Popup className='custom-popup' offset={[6, -18]}>
                                Welcome to "Mapify" App! We are here for you.
                            </Popup>
                        </Marker>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay checked name="Marker Circle">
                        <Circle center={position} radius={50} ref={circleRef} color={circleColor}></Circle>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Circles">
                        <LayerGroup>
                            <Circle center={[16.774494546, 96.15580189]} color={"grey"} radius={5} />
                            <Circle center={[16.779294546, 96.15380189]} pathOptions={{ color: "grey" }} radius={5} />
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Polyline">
                        <Polyline pathOptions={limeOptions} positions={polyline} />
                    </LayersControl.Overlay>
                </LayersControl>

                <ZoomControl position="bottomright" />
                <GeoSearch />
            </MapContainer>
        </>
    )
}

export default Map