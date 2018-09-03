import React, { Component } from 'react';
import { Grid, Icon, IconButton, InputAdornment, Paper, List, ListItem, ListItemAvatar, 
        ListItemText, TextField, Typography } from '@material-ui/core';
import { db } from '../helpers';
import withAuthorization from './withAuthorization';
import AuthUserContext from './AuthUserContext';
import Avatar from './avatar';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
            members: null,
            inputMessage: '',
            messages: [],
        };

        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        db.onceGetUsers().then(snapshot =>
            this.setState({ users: snapshot.val() })
        );
        db.onGetMessages(snapshot => {
            this.setState({ messages: snapshot.val() })
        });
    }

    sendMessage(currentUser) {
        const date = new Date();
        const dataMessage = {
            author: currentUser.uid,
            text: this.state.inputMessage,
            timestamp: date.getTime(),
            file: '',
        };
        db.doCreateMessage(dataMessage).then(response => {
            this.setState({
                inputMessage: '',
            });
        }).catch( error => {
            console.error(error);
        });
    }

    render() {
        return (
            <AuthUserContext.Consumer>
            { authUser => <Grid container spacing={24} justify="space-evenly"
                                alignItems="stretch">
                <Grid item xs={4} sm={3} md={3}>
                    {!!this.state.users && <UserList users={this.state.users} />}
                </Grid>
                <Grid item xs={8} sm={6} md={6}>
                    {(!!this.state.messages && !!this.state.users) &&
                        <MessagesBox messages={this.state.messages} users={this.state.users} />}
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                    <Paper>4</Paper>
                </Grid>
                <Grid item xs={12}>
                    { !!this.state.users && <Message { ...this.state.users[authUser.uid] }>
                        <TextField id="input-message" label="Write your message"
                            multiline margin="normal" fullWidth
                            value={this.state.inputMessage}
                            onChange={(evt) => this.setState({inputMessage: evt.target.value})}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={() => this.sendMessage(authUser)}
                                    >
                                        <Icon>send</Icon>
                                    </IconButton>
                                    </InputAdornment>
                            }} />
                    </Message>}
                </Grid>
            </Grid> }
            </AuthUserContext.Consumer >
        );
    }
}

const UserList = ({ users }) => (
    <List component={Paper}>
        {Object.keys(users).map(key =>
            <ListItem key={key}>
                <ListItemAvatar>
                    <Avatar src={users[key].avatar} width="25" height="25" color={users[key].color} />
                </ListItemAvatar>
                <ListItemText primary={users[key].username} />
            </ListItem>
        )}
    </List>
);

const MessagesBox = ({ messages, users }) => (
    <List component={Paper} className="MessagesBox">
        {Object.keys(messages).map((id) => (
            <Message { ...users[messages[id].author] } key={id}>
                <ListItemText primary={messages[id].text} secondary={new Date(messages[id].timestamp).toString()}
                    secondaryTypographyProps={{ alignItems: 'right' }}></ListItemText>
            </Message>
        ))}
    </List>
);

const Message = ({ avatar, username, color, children }) => (
    <ListItem divider={true}>
        <Paper elevation={0} style={{ textAlign: 'center', backgroundColor: "transparent" }}>
            <ListItemAvatar>
                <Avatar src={avatar} width="30" height="30" color={color} />
            </ListItemAvatar>
            <Typography variant="subheading" align="center" component="p"
                        gutterBottom={true}>
                {username}
            </Typography>
        </Paper>
        <div className="bubble">
            <div className="tail-wrap center" style={{ backgroundSize: "65px auto" }}>
                <div className="tail-mask" style={{ borderRight: "25px solid " + color + "80" }}></div>
            </div>
            <div className="body select-text" style={{ backgroundColor: color + "80" }}>
                {children}
            </div>
        </div>
    </ListItem>
);

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Chat);