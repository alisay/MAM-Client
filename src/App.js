import './App.css';
import {BrowserRouter} from "react-router-dom";
import 'fontsource-roboto';

import NavBar from "./components/navbar";


function App() {
  return (<BrowserRouter>
  <NavBar />
  <main>

  </main>
  </BrowserRouter>
  );
}

export default App;
