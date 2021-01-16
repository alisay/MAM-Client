import React, { useState, createContext } from "react";

const TokenContext = createContext();

function TokenProvider(props) {
    const getToken = () =>{
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
      }    

    const logout = () => {
        setToken();
        localStorage.clear();
    }

    const value = {
        token: token,
        setToken: setToken,
        saveToken: saveToken,
        logout: logout
    };

    return (
        <TokenContext.Provider value={value}>
            {props.children}
        </TokenContext.Provider>
    );
};

export { TokenContext, TokenProvider };