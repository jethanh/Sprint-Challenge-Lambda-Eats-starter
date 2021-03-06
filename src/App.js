import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/pizza">
        <Form/>
      </Route>
    </div>
  );
}

export default App;
