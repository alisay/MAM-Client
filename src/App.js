import './App.css';
import {BrowserRouter} from "react-router-dom";
import 'fontsource-roboto';

import NavBar from "./components/Navbar.js";
import Map from "./components/Map.js";


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Map />
      </main>
    </BrowserRouter>
  );
}

export default App;
