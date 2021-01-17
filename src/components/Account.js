import React, { useState, useContext } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Geocode from 'react-geocode';
import Login from "./Login.js"
import {TokenContext} from "./TokenContext.js"


Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function Account() {
    const [artwork, setArtwork] = useState({});
    const [blob, setBlob] = useState(null);
    const context = useContext(TokenContext)
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
  
  
    if(!context.token) {
      return <Login setToken={context.setToken} />
    }

    const handleAddressGet = (event) => {
        event.preventDefault();
        Geocode.fromAddress(artwork.location).then(
            response => {
              const { lat, lng } = response.results[0].geometry.location;
              const geom = {"latitude":lat, "longitude":lng}
              setArtwork({...artwork, geom})
            },
            error => {
              console.error(error);
              window.alert(error);//display error to user
            }
          );
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        var myHeaders = new Headers();
        // myHeaders.append("Cookie", "connect.sid=s%3AYIuwpNjTlbv1oUs2bTeyyQfzSlVPPkQA.9y1Gr1owmqFmWnZWT%2FLEHiEfr9UWZLm9aTSu7im04sk");

        var formdata = new FormData();
        formdata.append("title", artwork.title);
        formdata.append("location", artwork.location);
        formdata.append("artist", artwork.artist);
        formdata.append("date", artwork.date);
        formdata.append("details", artwork.details);
        formdata.append("latitude", artwork.geom.latitude);
        formdata.append("longitude", artwork.geom.longitude);
        formdata.append("image", blob, artwork.title);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };

        fetch("https://melbourneartmap.herokuapp.com/artworks/new", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      
    }

  //   const showAuth = (event)=>{
  //     event.preventDefault();
  //     console.log("token", context.token)
  // }
  const isSubmitButtonDisabled = !(
    artwork.title && 
    artwork.location && 
    artwork.artist && 
    artwork.date && 
    artwork.details && 
    artwork.geom && 
    blob
  )

  console.log('isSubmitButtonDisabled', isSubmitButtonDisabled)

  console.log('artwork ', artwork)
  console.log('blob ', blob)
  
    return (
        <>
        {/* <button onClick={showAuth}>Show me</button> */}
        <div style={modalStyle} className={classes.paper}>
        <h1>Add Artwork</h1>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <p><TextField required id="standard-required" label="Name of artwork" onChange={event=>setArtwork({...artwork, "title": event.target.value})}/></p>
          <p><TextField required id="standard-required" label="Address" onChange={event=>setArtwork({...artwork, "location": event.target.value})}/></p>
          <Button type="submit" variant="contained" onClick={handleAddressGet}>Get address</Button>
          <p><TextField
          id="standard-required"
          label="lat, lng"
          value={artwork && artwork.geom ? `${artwork.geom.latitude}, ${artwork.geom.longitude}` : ""}
        /></p>
          <p><TextField required id="standard-required" label="Artist" onChange={event=>setArtwork({...artwork, "artist": event.target.value})}/></p>
          <p><TextField required id="standard-required" label="Year of construction" onChange={event=>setArtwork({...artwork, "date": event.target.value})}/></p>
          <p><TextField required id="standard-required" label="Material" onChange={event=>setArtwork({...artwork, "details": event.target.value})}/></p>
          <Button
            variant="contained"
            component="label"
          >
            Upload Image
            <input
                type="file"
                onChange={(e) => setBlob(e.target.files[0])}
            />
          </Button>
        </div>
        <div className={classes.submit}>
          {/* disable button when loading */}
        <Button type="submit" variant="contained" color="secondary" onClick={handleFormSubmit} disabled={isSubmitButtonDisabled}>Submit</Button>
        </div>
      </form>
      </div>
      </>
    );
  }
  