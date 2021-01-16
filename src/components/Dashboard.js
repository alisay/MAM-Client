//here you make the base dash that holds
//add, edit, delete, search artworks
import Account from "./Account.js"
import { Grid, Container } from '@material-ui/core/';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       height: 140,
//       width: 100,
//     },
//     control: {
//       padding: theme.spacing(2),
//     },
//   }));
  

export default function Dashboard () {
    // const classes = useStyles();

    return(
        <>
        {/* <Container maxWidth="sm"> */}
        <h1>Dashboard</h1>
        {/* //Have a grid of your artworks here  */}
        <Grid container spacing={2}>
            <Grid container item xs={3} spacing={1}>
                <Account />
            </Grid>
            <Grid container item xs={3} spacing={1}>
                <h1>"Hmmm</h1>
            </Grid>
            <Grid container item xs={3} spacing={1}>
                <Account />
            </Grid>
        </Grid>
        {/* </Container> */}
        </>
    )
};