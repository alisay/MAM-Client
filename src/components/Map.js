import React, {useState, useEffect, useRef} from "react";
import mapboxgl from "mapbox-gl"
import useMapboxMap from "../hooks/useMapbox.js";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    map: {
        height: '100vh',
        width: '100vw'
    }
}))

const Map = () => {

    // const [marker, setMarker] = useState();
    const mapRef = useRef()
    const classes = useStyles();
    
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

    useMapboxMap(mapRef)


    return (
        <div ref={mapRef} id="map" className={classes.map}>
        </div>
    )

}

export default Map;