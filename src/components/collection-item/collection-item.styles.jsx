import styled from "styled-components";

import CustomButton from "components/custom-button/custom-button.component";

export const StyledCustomButton = styled(CustomButton)`
  width: 80%;
  opacity: 0.7;
  position: absolute;
  top: 255px;
  display: none;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 95%;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
  background-image: ${({ withBackgroundImage }) =>
    withBackgroundImage ? `url(${withBackgroundImage})` : ""};
`;

export const CollectionFooterContainer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const CollectionItemContainer = styled.div`
  width: 22vw;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  &:hover {
    > ${ImageContainer} {
      opacity: 0.8;
    }

    > ${StyledCustomButton} {
      opacity: 0.85;
      display: flex;
    }
  }

  ${CollectionFooterContainer} {
    .name {
      width: 90%;
      margin-bottom: 15px;
    }

    .price {
      width: 10%;
    }
  }
`;
