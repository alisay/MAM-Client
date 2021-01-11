import './App.css';
import {BrowserRouter} from "react-router-dom";
import 'fontsource-roboto';

import NavBar from "./components/Navbar.js";


function App() {
  return (<BrowserRouter>
  <NavBar />
  <main>

  </main>
  </BrowserRouter>
  );
}

export default App;
