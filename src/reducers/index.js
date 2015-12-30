import { combineReducers } from 'redux';
import undoable, { distinctState } from 'redux-undo';

import { default as friendlist } from './friendlist';
import { default as filter } from './filter';

const reducer = combineReducers({
    filter,
    friendlist: undoable(friendlist, { filter: distinctState() })
});

export default reducer;
