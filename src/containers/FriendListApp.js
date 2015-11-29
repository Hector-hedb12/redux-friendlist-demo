import React, { Component, PropTypes } from 'react';
import styles from './FriendListApp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as FriendsActions from '../actions/FriendsActions';
import { FriendList, AddFriendInput } from '../components';

const RaisedButton = require('material-ui/lib/raised-button');
const DropDownMenu = require('material-ui/lib/drop-down-menu');
const Toolbar = require('material-ui/lib/toolbar/toolbar');
const ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
const ToolbarSeparator = require('material-ui/lib/toolbar/toolbar-separator');

let filterOptions = [
    { payload: '1', text: 'All' },
    { payload: '2', text: 'Started' },
];


@connect(state => ({
    friendlist: state.friendlist
}))
export default class FriendListApp extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    render () {
        const { friendlist: { friendsById }, dispatch } = this.props;
        const actions = bindActionCreators(FriendsActions, dispatch);

        return (
                <div>
                   <Toolbar className={styles.toolBar}>
                      <ToolbarGroup key={0} float="left">
                         <DropDownMenu menuItems={filterOptions} />
                      </ToolbarGroup>

                      <ToolbarSeparator/>

                      <ToolbarGroup key={1} float="right">
                         <RaisedButton label="Delete all" primary={true} />
                      </ToolbarGroup>
                   </Toolbar>

                   <div className={styles.friendListApp}>
                      <h1>The FriendList</h1>
                      <AddFriendInput addFriend={actions.addFriend} />
                      <FriendList friends={friendsById} actions={actions} />
                   </div>
                </div>
        );
    }
}
