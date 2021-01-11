import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Geocode from 'react-geocode';
import axios from 'axios';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    submit: {
        '& > *': {
            float: 'right',
        },
    },
  },
}));

export default function Account() {
    const classes = useStyles();
    const [artwork, setArtwork] = useState({});

    const handleAddressGet = (event) => {
        event.preventDefault();
        Geocode.fromAddress(artwork.addresspt).then(
            response => {
              const { lat, lng } = response.results[0].geometry.location;
              const location = {"geom":{"latitude":lat, "longitude":lng}}
              setArtwork(location)
            },
            error => {
              console.error(error);
              window.alert(error);//display error to user
            }
          );
    }
  
    const handleFormSubmit = (event) => {
        event.preventDefault();
          
        console.log(JSON.stringify(artwork))
        axios.post("https://melbourneartmap.herokuapp.com/artworks/new",
        {
            body: JSON.stringify(artwork)
        },    
        {
                auth:{
                    username: "admin",
                    password: "123456"
                }
            }
         ) .then(response=>{
             console.log(response)
            //  return response.json()
            })
          .catch(console.log)
    }

    return (
        <>
        <h1>Add Artwork</h1>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <p><TextField required id="standard-required" label="Required" defaultValue="Name of artwork" onChange={event=>setArtwork({...artwork, "name": event.target.value})}/></p>
          <p><TextField required id="standard-required" label="Required" defaultValue="Address" onChange={event=>setArtwork({...artwork, "addresspt": event.target.value})}/></p>
          <Button type="submit" variant="contained" onClick={handleAddressGet}>Get address</Button>
          <p><TextField
          id="standard-required"
          label="lat, lng"
          value={artwork && artwork.geom ? `${artwork.geom.latitude}, ${artwork.geom.longitude}` : ""}
        /></p>
          <p><TextField required id="standard-required" label="Required" defaultValue="Artist" onChange={event=>setArtwork({...artwork, "artist": event.target.value})}/></p>
          <p><TextField required id="standard-required" label="Required" defaultValue="Year of construction" onChange={event=>setArtwork({...artwork, "artdate": event.target.value})}/></p>
          <p><TextField required id="standard-required" label="Required" defaultValue="Material" onChange={event=>setArtwork({...artwork, "structure_": event.target.value})}/></p>
        </div>
        <div className={classes.submit}>
        <Button type="submit" variant="contained" color="secondary" onClick={handleFormSubmit}>Submit</Button>
        </div>
      </form>
      </>
    );
  }
  