import React from "react";
import { connect } from "react-redux";

import { addItem } from "redux/cart/cart-actions";

import {
  CollectionItemContainer,
  StyledCustomButton,
  ImageContainer,
  CollectionFooterContainer,
} from "./collection-item.styles";

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;
  return (
    <CollectionItemContainer>
      <ImageContainer withBackgroundImage={imageUrl}></ImageContainer>
      <CollectionFooterContainer>
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </CollectionFooterContainer>
      <StyledCustomButton inverted onClick={() => addItem(item)}>
        Add to cart
      </StyledCustomButton>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
