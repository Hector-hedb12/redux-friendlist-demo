import React, { Component, PropTypes } from 'react';

import styles from './FriendList.css';
import FriendListItem from './FriendListItem';

export default class FriendList extends Component {
    static propTypes = {
        friends: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    };

    render () {
        return (
            <ul className={styles.friendList}>
                {
                    this.props.friends.map(
                        friend => <FriendListItem
                                      key={friend.id}
                                      id={friend.id}
                                      name={friend.name}
                                      starred={friend.starred}
                                      {...this.props.actions} />
                    )
                }
            </ul>
        );
    }
}
