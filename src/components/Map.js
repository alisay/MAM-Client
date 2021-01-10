import React, {useState, useLayoutEffect, useRef} from "react";
import mapboxgl from "mapbox-gl"
// import useMapboxMap from "../hooks/useMapbox.js";
import axios from "axios"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    map: {
        height: '100vh',
        width: '100vw'
    },
}))

const Map = () => {
    
    // const [marker, setMarker] = useState();
    // const mapRef = useRef()
    const classes = useStyles();
    
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY
    
    useLayoutEffect(() => {
        console.log('in layout effect')

        const map = new mapboxgl.Map({
            container: "mapId",
            style: 'mapbox://styles/mapbox/streets-v11',
            center:  [ 144.9631, -37.8136 ],
            zoom: 13
        });
        
        const marker = new mapboxgl.Marker({
            color: "#FFFFFF"
        }).setLngLat([144.974167165492, -37.8186738864394])
          .addTo(map);
      
        console.log('marker created ', marker)

        console.log('marker added to this map ', map)
        // setMarker(marker);
              
    }, []);

    // marker.setLngLat([12.567, 55.67583])

    // axios.get("data.json")//update to be actual endpoint once backend api working
    // .then(res=>createMarkers(res.data))
    // .catch(console.log)

    // const createMarkers = (data)=>{
    //     const parsedData = JSON.parse(data)
    //     parsedData.map((artwork)=>{
    //         const marker = new mapboxgl.Marker()
    //         .setLngLat([artwork.geom.longitude, artwork.geom.latitude])
    //         .addTo(map)
    //     })
    // }

    return (
        <div id="mapId" className={classes.map}>
        </div>
    )

}

export default Map;