import { takeLatest, all, call, put } from "redux-saga/effects"

import { signInSuccess, signInFailure } from "./user-action"
import { USER_ACTION_TYPES } from "./user-types"

import {
  getCurrentUser,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase"

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    )
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (error) {
    yield put(signInFailure(error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser)
    if (!userAuth) return
    yield call(getSnapshotFromUserAuth, userAuth)
  } catch {
    yield put(signInFailure(error))
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSagas() {
  yield all([call(onCheckUserSession)])
}
