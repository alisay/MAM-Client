import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TokenContext} from './TokenContext.js'
import { Container } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

async function loginUser(credentials) {
    return fetch('https://melbourneartmap.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
      .catch(error=>{
          console.log(error);
          window.alert("Sign in unsuccessful. Please try again.");//display error to user
          //render something to the user
        }
      )
   }
   
  
export default function Login() {
    const classes = useStyles();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();  
    const context = useContext(TokenContext)

    const handleSubmit = async e => {
        e.preventDefault();
        const loginAuth = await loginUser({
          username,
          password
        });
        context.saveToken(loginAuth)
      }


  return(
    <>
    <Container>
      <h2>Please log in</h2>
    <form className={classes.root} onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input type="text" onChange={e => setUserName(e.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)}/>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    </Container>
    </>
  )
}

