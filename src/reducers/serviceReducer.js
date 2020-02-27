import * as types from '../actions/ActionTypes';
import _ from 'lodash';
const initialState = {
  isFetching: false,
  failure: false,
  errMessage: '',
  data: [],
  meta: {},
};
export default type => {
  return (state = initialState, action) => {
    switch (action.type) {
      case type.REQUEST:
        return {
          ...state,
          isFetching: true,
        };
      case type.SUCCESS:
        return {
          ...state,
          failure: false,
          isFetching: false,
          errorMessage: '',
          data: action.data.data,
          meta: action.data.meta,
        };
      case type.FAILURE:
        return {
          ...state,
          data: {},
          failure: true,
          isFetching: false,
          errorMessage: action.errorMessage,
        };

      case type.ADD_OBJECT:
        const tempData = _.cloneDeep(state.data);
        let a = {...tempData, ...action.data};
        return {
          ...state,
          data: a,
        };
      default:
        return state;
    }
  };
};
