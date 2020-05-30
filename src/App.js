import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "pages/homepage/homepage.component";

import "./App.css";

const Shop = () => <h1>Shop Page</h1>;

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={Shop} />
      </Switch>
    </div>
  );
}

export default App;
