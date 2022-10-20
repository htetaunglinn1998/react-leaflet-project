import React, { useEffect } from 'react'
import { GeoSearchControl, OpenStreetMapProvider, MapBoxProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import "leaflet-geosearch/dist/geosearch.css"

const GeoSearch = () => {

    const provider = new MapBoxProvider({
        params: {
            access_token: "pk.eyJ1IjoibWlua2hhbnQzMDE1IiwiYSI6ImNsOWdzN2U3NjB2ZHczd28weTd2djdic3QifQ.624jN7a42dJgAFy0tu-5DQ",
        },
    });

    const SearchField = () => {
        const searchControl = new GeoSearchControl({
            provider: provider,
            style: 'bar',
            showMarker: false,
            autoComplete: true,
            searchLabel: 'Enter address',
            retainZoomLevel: false,
            updateMap: true,
        });

        const map = useMap();
        useEffect(() => {
            map.addControl(searchControl);
            return () => map.removeControl(searchControl);
        }, []);

        return null;
    };

    return (
        <div>
            <SearchField />
        </div>
    )
}

export default GeoSearch