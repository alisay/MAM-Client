import React, { useState, createContext } from "react";

const TokenContext = createContext();

function TokenProvider(props) {
    const [token, setToken] = useState();

    const logout = () => {
        setToken(null);
    }

    const value = {
        token: token,
        setToken: setToken,
        logout: logout
    };

    return (
        <TokenContext.Provider value={value}>
            {props.children}
        </TokenContext.Provider>
    );
};

export { TokenContext, TokenProvider };