import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import Spinner from "components/spinner/spinner-component";
import ErrorBoundary from "components/error-boundary/error-boundary.component";

import { fetchCollectionsStart } from "redux/shop/shop-actions";

const CollectionsOverviewContainer = lazy(() =>
  import("components/collections-overview/collections-overview.container")
);
const CollectionPageContainer = lazy(() =>
  import("components/collection/collection.container")
);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route
              exact
              path={`${match.path}`}
              component={CollectionsOverviewContainer}
            />
            <Route
              path={`${match.path}/:collectionId`}
              component={CollectionPageContainer}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
