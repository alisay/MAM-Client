import React, {useLayoutEffect} from "react";
import mapboxgl from "mapbox-gl";


export default function useMapboxMap(options){

    const defaultOptions = {
        container: "map",
        style: 'mapbox://styles/mapbox/dark-v10',
        center:  [ 144.9631, -37.8136 ],
        zoom: 13
    };

    useLayoutEffect(() => {
        const map = new mapboxgl.Map({
            ...defaultOptions,
            ...options
        });
    }, []);
}
