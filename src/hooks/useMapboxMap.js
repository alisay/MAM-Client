import {useLayoutEffect} from "react";

export default function useMapboxMap(options){
    mapboxgl.accessToken = "";

    const defaultOptions = {
        container: "map",
        style: 'mapbox://styles/mapbox/dark-v10',
        center:  [ 12.567898, 55.67583 ],
        zoom: 9
    };

    useLayoutEffect(() => {
        const map = new mapboxgl.Map({
            ...defaultOptions,
            ...options
        });
    }, []);
}