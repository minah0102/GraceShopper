import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { render } from "react-dom";

import { Header, Products } from "./components";

const App = () => {
  return (
    <div id="app">
      <Header/>
      <Products />
      <main>
      </main>
    </div>
  );
};

render(<App />, document.getElementById("main"));
