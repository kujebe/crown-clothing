import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleCartHidden } from "redux/cart/cart-actions";
import { selectCartItemsCount } from "redux/cart/cart-selectors";

import { ReactComponent as ShoppingIcon } from "assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

const CartIcon = ({ toggleCartHidden, itemsCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemsCount}</span>
  </div>
);

// const mapStateToProps = (state) => ({
//   itemsCount: selectCartItemsCount(state),
// });

const mapStateToProps = createStructuredSelector({
  itemsCount: selectCartItemsCount,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
