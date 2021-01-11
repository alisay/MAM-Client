import './App.css';
import {BrowserRouter} from "react-router-dom";
import 'fontsource-roboto';

import NavBar from "./components/Navbar.js";
import MapContainer from "./components/Map.js";


function App() {
  return (<BrowserRouter>
  <NavBar />
  <main>
    <MapContainer />
  </main>
  </BrowserRouter>
  );
}

export default App;
