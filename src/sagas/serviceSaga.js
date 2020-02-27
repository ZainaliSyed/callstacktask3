import {put, call, takeEvery, take} from 'redux-saga/effects';
import {success, failure, requestAction} from '../actions/ServiceAction';
import HttpServiceManager from '../services/HttpServiceManager';
import {GENERAL_ACTION} from '../actions/ActionTypes';

//SECTION Normal request
function callRequest({url, method, data, showHud}) {
  return HttpServiceManager.getInstance().request(url, data, method, showHud);
}

function* watchRequest(action) {
  const {successCB, failureCB, actionType} = action;

  try {
    yield put(requestAction(actionType));
    const response = yield call(callRequest, action);
    successCB(response);
    if (actionType) yield put(success(actionType, response));
  } catch (err) {
    failureCB(err);
    if (actionType) yield put(failure(actionType, err));
  }
}

//SECTION End

export default function* root() {
  yield takeEvery(GENERAL_ACTION, watchRequest);
}
