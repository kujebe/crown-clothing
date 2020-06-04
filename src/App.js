import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "pages/homepage/homepage.component";
import ShopPage from "pages/shop/shop.component";
import SignInAndSignUpPage from "pages/sign-in-and-sign-out/sign-in-and-sign-out.component";
import CheckoutPage from "pages/checkout/checkout.component";

import Header from "components/header/header.component";
import { auth, createUserProfileDocument } from "firebase/firebase.utils";
import { setCurrentUser } from "redux/user/user-action";
import { selectCurrentUser } from "redux/user/user-selectors";

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props; // destructure redux action to set user
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // if auth returned with a user object
      if (userAuth) {
        // Save user in DB if it does not exist. If user exists, return user from db
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
          // console.log(this.state);
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
