import React from "react";
import { render } from "react-dom";

import { Header } from "./components";

const App = () => {
  return (
    <div id="app">
      <Header/>
      <main>
      </main>
    </div>
  );
};

render(<App />, document.getElementById("main"));
