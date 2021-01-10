import './App.css';
import {BrowserRouter, Link, Route} from "react-router-dom";
import Nav from "./components/nav.js"

function App() {
  return (
    <BrowserRouter>
    <Nav />
    
    <main>
      <Route exact path="/">
        
      </Route>
    
    </main>
    </BrowserRouter>
  );
}

export default App;
