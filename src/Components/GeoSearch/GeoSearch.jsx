import React, { useEffect } from 'react'
import { GeoSearchControl, OpenStreetMapProvider, MapBoxProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import "leaflet-geosearch/dist/geosearch.css"

const GeoSearch = () => {


    const SearchField = () => {
        const searchControl = new GeoSearchControl({
            provider: new OpenStreetMapProvider(),
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