import React, { Component, PropTypes } from 'react';

// A simple javascript utility for conditionally joining classNames together.
// Reactjs: One of its primary use cases is to make dynamic and conditional
// className props simpler to work with (especially more so than
// conditional string manipulation)
import classnames from 'classnames';

import styles from './AddFriendInput.css';

// DEFAULT EXPORT:
// Default exports are not named, so you can import them as anything you like.
export default class AddFriendInput extends Component {
    static propTypes = {
        addFriend: PropTypes.func.isRequired
    }

    render () {
        // Since JSX is JavaScript, identifiers such as class and for are
        // discouraged as XML attribute names. Instead, React DOM components
        // expect DOM property names like className and htmlFor, respectively.
        return (
                <input
            type="text"
            autoFocus="true"
            className={classnames('form-control', styles.addFriendInput)}
            placeholder="Type the name of a friend"
            value={this.state.name}
            onChange={this.handleChange.bind(this)}
            onKeyDown={this.handleSubmit.bind(this)} />
        );
    }

    constructor (props, context) {
        super(props, context);
        this.state = {
            name: this.props.name || '',
        };
    }

    handleChange (e) {
        this.setState({ name: e.target.value });
    }

    handleSubmit (e) {
        const name = e.target.value.trim();
        if (e.which === 13 && name) {
            // Carriage return
            this.props.addFriend(name);
            this.setState({ name: '' });
        }
    }

}
