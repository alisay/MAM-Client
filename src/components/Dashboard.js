//here you make the base dash that holds
//add, edit, delete, search artworks
import Account from "./Account.js"
import { Grid, Container, Button } from '@material-ui/core/';  

export default function Dashboard () {

    return(
        <>
        <Container maxWidth="sm">
        <h1>Dashboard</h1>
        <div>
            Artworks go here
        </div>
        <div>
            <Button> Add New Artwork </Button>
        </div>
        {/* //Have a grid of your artworks here  */}
        {/* <Grid container spacing={2}>
            <Grid container item xs={3} spacing={1}>
                <Account />
            </Grid>
            <Grid container item xs={3} spacing={1}>
                <h1>"Hmmm</h1>
            </Grid>
            <Grid container item xs={3} spacing={1}>
                <Account />
            </Grid>
        </Grid> */}
        </Container>
        </>
    )
};