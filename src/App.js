import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'fontsource-roboto';

import NavBar from "./components/Navbar.js";
import MapContainer from "./components/Map.js";
import Account from "./components/Account.js";


function App() {
  const [search, setSearch] = useState("");
  const [ selected, setSelected ] = useState({});


  function handleSearch(event) {
    setSearch(event.target.value);
}

  return (<BrowserRouter>
  <NavBar search={search} onSearch={handleSearch} selected={selected} setSelected={setSelected} />
  <main>
    <Switch>
      <Route exact path="/">
        <MapContainer selected={selected} setSelected={setSelected} />
      </Route>
      <Route exact path="/account">
        <Account />
      </Route>
    </Switch>
  </main>
  </BrowserRouter>
  );
}

export default App;
