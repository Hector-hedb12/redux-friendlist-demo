import React, { Component, PropTypes } from 'react';
import styles from './FriendListApp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as FriendsActions from '../actions/FriendsActions';
import * as FilterActions from '../actions/FilterActions';
import * as types from '../constants/ActionTypes';

import { FriendList, AddFriendInput } from '../components';

const RaisedButton = require('material-ui/lib/raised-button');
const DropDownMenu = require('material-ui/lib/drop-down-menu');
const Toolbar = require('material-ui/lib/toolbar/toolbar');
const ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
const ToolbarSeparator = require('material-ui/lib/toolbar/toolbar-separator');

let filterOptions = [
    { payload: types.VisibilityFilters.SHOW_ALL, text: 'All' },
    { payload: types.VisibilityFilters.STAR_FRIEND, text: 'Started' }
];


function selectFriends(state) {
    switch (state.visibilityFilter) {
    case types.VisibilityFilters.SHOW_ALL:
        return state;
    case types.VisibilityFilters.SHOW_STARTED:
        return state.friendsById.filter(friend => friend.starred);
    }
}

@connect(state => ({
    friendlist: selectFriends(state.friendlist)
}))
export default class FriendListApp extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    render () {
        // Injected by connect() call:
        const { friendlist: { friendsById }, dispatch } = this.props;
        const friendsActions = bindActionCreators(FriendsActions, dispatch);
        const filterActions = bindActionCreators(FilterActions, dispatch);

        return (
                <div>
                   <Toolbar className={styles.toolBar}>
                      <ToolbarGroup key={0} float="left">
                         <DropDownMenu menuItems={filterOptions}
                                       onChange={filterActions.setVisibilityFilter} />
                      </ToolbarGroup>

                      <ToolbarSeparator/>

                      <ToolbarGroup key={1} float="right">
                         <RaisedButton label="Delete all" primary={true} />
                      </ToolbarGroup>
                   </Toolbar>

                   <div className={styles.friendListApp}>
                      <h1>The FriendList</h1>
                      <AddFriendInput addFriend={friendsActions.addFriend} />
                      <FriendList friends={friendsById} actions={friendsActions} />
                   </div>
                </div>
        );
    }
}
