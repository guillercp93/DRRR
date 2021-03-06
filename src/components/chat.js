import React, { Component } from 'react';
import {
    Button, Grid, Icon, IconButton, InputAdornment, Paper, List, ListItem,
    ListItemAvatar, ListItemText, TextField, Typography, Dialog, DialogContent,
    DialogContentText, DialogTitle, DialogActions, CircularProgress
} from '@material-ui/core';
import moment from 'moment';
import { db, auth } from '../helpers';
import withAuthorization from './withAuthorization';
import AuthUserContext from './AuthUserContext';
import Avatar from './avatar';
import FileUploader from './FileUploader';
import Multimedia from './Multimedia';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
            members: null,
            inputMessage: '',
            inputFile: null,
            openModal: false,
            messages: [],
            loading: false,
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.handleModal = this.handleModal.bind(this);
    }

    componentDidMount() {
        db.onGetMembersActives(members => {
            const newMembers = members.val();
            this.setState({ members: newMembers });
        });
        db.onceGetUsers().then(users => {
            const registeredUsers = users.val();
            this.setState({ users: registeredUsers });
        });
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
            file: this.state.inputFile,
        };
        this.setState({ loading: true });
        db.doCreateMessage(dataMessage).then(response => {
            this.setState({
                inputMessage: '',
                inputFile: null,
                loading: false,
            });
        }).catch(error => {
            console.error(error);
        });
    }

    logout(currentUser) {
        db.createMembersActives(currentUser.uid, false);
        auth.doSignOut();
    }

    handleModal() {
        this.setState({
            openModal: !this.state.openModal,
        });
    }

    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser => <Grid container spacing={24} justify="space-evenly"
                    alignItems="stretch">
                    <Grid item xs={12} sm={12} md={12} style={{ 'textAlign': 'center' }}>
                        <img src="/images/logo.jpg" alt="dollars" className="secundary-logo" />
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        {(!!this.state.users && !!this.state.members) &&
                            <UserList users={this.state.users} members={this.state.members} />}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        {(!!this.state.messages && !!this.state.users) ?
                            <MessagesBox messages={this.state.messages} users={this.state.users} /> :
                            <h3 style={{ color: "white" }}>No messages yet</h3>}
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <Button type="button" variant="outlined" color="default"
                                onClick={this.handleModal}>
                                <Icon>list_alt</Icon>
                                Chat rules
                            </Button>
                            <Button type="button" variant="outlined" color="default"
                                onClick={() => this.logout(authUser)}>
                                <Icon>exit_to_app</Icon>Log out
                            </Button>
                            <Grid item xs={6}>
                                <Avatar src="images/firma_light.svg" alt="By Guiller"
                                    width="100%" color="black" />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {!!this.state.users && <Message {...this.state.users[authUser.uid]}>
                            <TextField id="input-message" label="Write your message"
                                multiline margin="normal" fullWidth
                                value={this.state.inputMessage}
                                helperText={this.state.inputFile ? this.state.inputFile.name : null}
                                onChange={(evt) => this.setState({ inputMessage: evt.target.value })}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => this.sendMessage(authUser)}
                                                disabled={this.state.loading}
                                            >
                                                {this.state.loading ?
                                                    <CircularProgress /> :
                                                    <Icon>send</Icon>}
                                            </IconButton>
                                            <FileUploader onChange={(inputFile) => this.setState({ inputFile })} />
                                        </InputAdornment>
                                }} />
                        </Message>}
                    </Grid>
                    <Dialog open={this.state.openModal} onClose={this.handleModal}>
                        <DialogTitle>Chat rules</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <h3>Prohibited Acts</h3>
                                <List component={Paper}>
                                    <ListItem>Advertising</ListItem>
                                    <ListItem>Acts violating public order/customs
                                        (Racism, bigotry, harassment etc.)</ListItem>
                                    <ListItem>Acts that violate the rights of other users.</ListItem>
                                    <ListItem>Acting in violation of the common
                                        laws and regulations of government.</ListItem>
                                    <ListItem>Criminal acts and conduct leading to criminal acts.</ListItem>
                                    <ListItem>Acts which transmit (harmful) false information
                                        (Especially posing as or lying to the site staff)</ListItem>
                                    <ListItem>Posting personal information that may be
                                        an invasion of privacy.</ListItem>
                                </List>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleModal}>Agree</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>}
            </AuthUserContext.Consumer >
        );
    }
}

const UserList = ({ users, members }) => (
    <List component={Paper}>
        <Typography variant="display1" align="center" component="h1"
            paragraph={true}>
            <Icon fontSize="inherit">account_circle</Icon>
            Online users
        </Typography>
        {Object.keys(users).map(key =>
            members[key] && <ListItem key={key}>
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
            <Message {...users[messages[id].author]} key={id}>
                {messages[id].file &&
                    <Multimedia file={messages[id].file} text={messages[id].text} id={`media_${id}`} />}
                <ListItemText primary={messages[id].text} secondary={moment(messages[id].timestamp).format('LT')}
                    secondaryTypographyProps={{ align: 'right' }}>
                </ListItemText>
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