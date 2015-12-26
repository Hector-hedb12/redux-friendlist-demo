import * as types from '../constants/ActionTypes';

const initialState = types.VisibilityFilters.SHOW_ALL;

export default function visibilityFilter(state = initialState, action) {
    switch (action.type) {
    case types.SET_VISIBILITY_FILTER:
        return action.filter;
    default:
        return state;
    }
}
