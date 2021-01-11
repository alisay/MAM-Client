import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'fontsource-roboto';

import NavBar from "./components/Navbar.js";
import MapContainer from "./components/Map.js";


function App() {
  return (<BrowserRouter>
  <NavBar />
  <main>
    <Switch>
      <Route exact path="/">
        <MapContainer />
      </Route>
      <Route exact path="/account">
        <MapContainer />
      </Route>
    </Switch>
  </main>
  </BrowserRouter>
  );
}

export default App;
