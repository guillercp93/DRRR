import React, { Component } from 'react';
import { db } from '../helpers';
import withAuthorization from './withAuthorization';
import Avatar from './avatar';


class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
        };
    }

    componentDidMount() {
        db.onceGetUsers().then(snapshot =>
            this.setState({ users: snapshot.val() })
        );
    }

    render() {
        return (
            <div style={{ color: 'white' }}>
                Esto es Chat
                { !!this.state.users && <UserList users={this.state.users} /> }
            </div>
        );
    }
}

const UserList = ({ users }) =>
    <div>
        <h2>List of Usernames of Users</h2>
        <p>(Saved on Sign Up in Firebase Database)</p>

        {Object.keys(users).map(key =>
            <div key={key}>
                <p>{users[key].username}</p>
                <p>{users[key].email}</p>
                <Avatar src={users[key].avatar} width={100} height={100} color={users[key].color} />
            </div>
        )}
    </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Chat);