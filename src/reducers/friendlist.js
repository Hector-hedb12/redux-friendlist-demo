import * as types from '../constants/ActionTypes';
import omit from 'lodash/object/omit';
import assign from 'lodash/object/assign';
import mapValues from 'lodash/object/mapValues';

const initialState = {
    past: [],
    present: [
        {
            id: 1,
            name: 'Theodore Roosevelt'
        },
        {
            id: 2,
            name: 'Abraham Lincoln'
        },
        {
            id: 3,
            name: 'George Washington'
        }
    ],
    future: []
};

export default function friends(state = initialState.present, action) {
  switch (action.type) {

    case types.ADD_FRIEND:
      const newId = state.reduce((maxId, friend) => Math.max(friend.id, maxId), -1) + 1;
      return [...state, {id: newId, name: action.name}];

    case types.DELETE_FRIEND:
      return state.filter(friend => friend.id !== action.id);

    case types.STAR_FRIEND:
      return state.map(
          friend => friend.id !== action.id ? friend : Object.assign({}, friend, { starred: !friend.starred })
      );

    default:
      return state;
  }
}
