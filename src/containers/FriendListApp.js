import React, { Component, PropTypes } from 'react';
import styles from './FriendListApp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';

import * as FriendsActions from '../actions/FriendsActions';
import {setVisibilityFilter} from '../actions/FilterActions';
import * as types from '../constants/ActionTypes';

import { FriendList, AddFriendInput } from '../components';

const RaisedButton = require('material-ui/lib/raised-button');
const DropDownMenu = require('material-ui/lib/drop-down-menu');
const Toolbar = require('material-ui/lib/toolbar/toolbar');
const ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
const ToolbarSeparator = require('material-ui/lib/toolbar/toolbar-separator');

let filterOptions = [
    { payload: types.VisibilityFilters.SHOW_ALL, text: 'All' },
    { payload: types.VisibilityFilters.SHOW_STARRED, text: 'Started' }
];


function selectFriends(friends, filter) {
    switch (filter.payload) {
    case types.VisibilityFilters.SHOW_ALL:
        return friends;

    case types.VisibilityFilters.SHOW_STARRED:
        return friends.filter(friend => friend.starred);

    default:
        return friends;
    }
}

@connect(state => ({
    friendlist: selectFriends(state.friendlist.present, state.filter),
    undoDisabled: state.friendlist.past.length === 0,
    redoDisabled: state.friendlist.future.length === 0
}))
export default class FriendListApp extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    render () {
        // Injected by connect() call:
        const { friendlist, dispatch } = this.props;
        const friendsActions = bindActionCreators(FriendsActions, dispatch);

        return (
                <div>
                   <Toolbar className={styles.toolBar}>
                      <ToolbarGroup key={0} float="left">
                         <DropDownMenu menuItems={filterOptions}
                                       onChange={(e, index, value) => dispatch(setVisibilityFilter(value))} />
                      </ToolbarGroup>

                      <ToolbarSeparator/>

                      <ToolbarGroup key={1} float="right">
                         <RaisedButton label="Undo" primary={true}
                                       onClick={() => dispatch(ActionCreators.undo())}
                                       disabled={this.props.undoDisabled} />
                         <RaisedButton label="Redo" primary={true}
                                       onClick={() => dispatch(ActionCreators.redo())}
                                       disabled={this.props.redoDisabled} />
                      </ToolbarGroup>
                   </Toolbar>

                   <div className={styles.friendListApp}>
                      <h1>The FriendList</h1>
                      <AddFriendInput addFriend={friendsActions.addFriend} />
                      <FriendList friends={friendlist} actions={friendsActions} />
                   </div>
                </div>
        );
    }
}
