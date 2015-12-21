import * as types from '../constants/ActionTypes';

export function setVisibilityFilter(filter) {
    return {
        type: types.SET_VISIBILITY_FILTER,
        filter
    };
}
