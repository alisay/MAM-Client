import React, { useEffect, useState, useContext } from "react";
import Account from "./Account.js";
import {TokenContext} from "./TokenContext.js";
import axios from "axios"
import { DataGrid } from '@material-ui/data-grid';
import { Grid, Button, Container, Modal } from '@material-ui/core';
import Login from "./Login.js"



export default function Dashboard ({selected, setSelected}) {
    const context = useContext(TokenContext)
    const [ artworks, setArtworks ] = useState(undefined)
    const [open, setOpen] = useState(false);

    const [, setSelection] = useState([]);


    useEffect(() => {
        axios.get("https://melbourneartmap.herokuapp.com/artworks/")
            .then((res) => {
                setArtworks(res.data)
            })
            .catch(console.log)
        }, [])

        if(!context.token) {
            return <Login setToken={context.setToken} />
          }      

        const columns = [
            { field: 'id', headerName: 'ID', width: 300 },
            { field: 'artworkName', headerName: 'Artwork Title', width: 300 },
            { field: 'artist', headerName: 'Artist', width: 300 },
          ];
          
        const rows = artworks ? artworks.map(artwork=>{
            return { id: artwork._id, artworkName: artwork.name, artist: artwork.artist }
        }) : []

        // const rows = [{id: 1, artworkName: "artwork.", artist: "artwork.artist" } ]

        const handleOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
      
              
        const handleDeleteArtwork = () => {
            const myHeaders = new Headers();
            // myHeaders.append("Authorization", context.token)
            // myHeaders.append("Cookie", "connect.sid=s%3AbvU1pAQSo4S9hUHkM8vnMk-YKiIXLg3N.U52w521hIr7RE2PcPv41UHXi%2BPQY%2Bfb6u8TmRbeVL3w");

            const requestOptions = {
            method: 'DELETE',
            // mode: "cors",
            headers: myHeaders,
            // credentials:'include',
            redirect: 'follow'
            };

            fetch(`https://melbourneartmap.herokuapp.com/artworks/${selected}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));    
            
        }

        const handleSelectionChange = (event) =>{
            const rowId = event.rowIds[0]
            console.log("rowId", rowId)
            setSelection(event.rowIds)
            const foundArtwork = artworks.find(artwork=>artwork._id===rowId)
            console.log("artworks", artworks)
            console.log("artwork", foundArtwork)
            setSelected(foundArtwork)
            console.log("selected", selected)
        }

            const showAuth = (event)=>{
                event.preventDefault();
                event.UnselectAll()
                console.log("got here")
         }

    return(
        <>
                <button onClick={(showAuth)}>Unselect all</button>
        <Container>
        <h2>Welcome {context.token && context.token.admin.username}! </h2>
            {/* <div>{artworks && artworks.map(artwork=>artwork.name)}</div> */}
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} onSelectionChange={handleSelectionChange} />
            </div>
            <p></p>
            <div>
            <Grid container spacing={2}>
                <Grid container item xs >
                    <Button variant="contained" color="secondary" onClick={handleDeleteArtwork}>Delete Selected Artwork</Button>
                </Grid>
                <Grid container item xs={9}>
                    <Button variant="contained" color="secondary" onClick={handleOpen}>Add/Edit Artwork</Button>
                </Grid>
            </Grid>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="about-title"
                aria-describedby="about-description"
            >
                <Account selectedArtwork={selected}/>
            </Modal>
        </Container>
        </>
    )
}