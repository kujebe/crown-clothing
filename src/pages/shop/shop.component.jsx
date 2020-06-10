import React from "react";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { fetchColletionStartAsync } from "redux/shop/shop-actions";
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from "redux/shop/shop-selector";

import WithSpinner from "components/with-spinner/with-spinner.component";

import CollectionsOverview from "components/collections-overview/collections-overview.component";
import CollectionPage from "pages/collection/collection.component";

const CollectionsOverviewWithSpnner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchColletionStartAsync } = this.props;
    fetchColletionStartAsync();
  }

  render() {
    const { match, isCollectionFetching, isCollectionLoaded } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpnner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionLoaded}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionLoaded: selectIsCollectionsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchColletionStartAsync: () => dispatch(fetchColletionStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
