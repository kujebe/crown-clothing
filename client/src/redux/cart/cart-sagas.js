import { all, call, takeLatest, put } from "redux-saga/effects";

import { emptyCart } from "./cart-actions";
import userActionTypes from "redux/user/user-types";

export function* clearCartOnSignOut() {
  yield put(emptyCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
