import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import React, {useState, useEffect} from "react";
import useMapboxMap from "../hooks/useMapboxMap.js";

export default function Map(){

    const [marker, setMarker] = useState();

    useMapboxMap()


}
