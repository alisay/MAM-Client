import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TokenContext} from "./TokenContext.js"


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
      .catch(console.log)
   }
   
  
export default function Login() {
    const classes = useStyles();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();  
    const context = useContext(TokenContext)

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        context.setToken(token);
        console.log(token)
      }

  return(
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
  )
}

