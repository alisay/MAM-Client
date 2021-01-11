import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Geocode from 'react-geocode';

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
              console.log(artwork)
            },
            error => {
              console.error(error);//display error to user
            }
          );
    }

  
    const handleFormSubmit = (event) => {
        event.preventDefault();
          
        console.log(JSON.stringify(artwork))
        fetch("https://melbourneartmap.herokuapp.com/artworks/new", {
        	method: "POST",
          	headers: {
            	"Content-Type": "application/json"
            }, 
          	body: JSON.stringify(artwork)
        })
          .then(response=>response.json())
          .then(console.log)
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
          id="standard-read-only-input"
          label="lat, lng"
          defaultValue={artwork.geom}//update by default
          InputProps={{
            readOnly: true,
          }}
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
  