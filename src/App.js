import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { auth } from "firebase/firebase.utils";

import "./App.css";

import HomePage from "pages/homepage/homepage.component";
import ShopPage from "pages/shop/shop.component";
import SignInAndSignUpPage from "pages/sign-in-and-sign-out/sign-in-and-sign-out.component";
import Header from "components/header/header.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });

      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
