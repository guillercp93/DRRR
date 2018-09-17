import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { HuePicker } from 'react-color';
import { Grid, Button, FormControl, InputLabel, Input, Snackbar, InputAdornment, Icon } from '@material-ui/core';
import Avatar from './avatar';
import { auth, db } from '../helpers';

const defaultState = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    avatar: '/images/avatars/1.png',
    color: '#b000ff',
    error: null,
};

/**
 * Component to render the sign up page of the app.
 * @param {Object} props props from function withRouter
 */
const SignUp = ({ history }) => (
    <Grid container direction="column" justify="space-between" alignItems="stretch">
        <Grid item xs={12} sm={12} md={12} margin="normal">
            <SignUpForm history={history} />
        </Grid>
    </Grid>
);

/**
 * Component to redirect a Sign up page
 */
const SignUpLink = () => (
    <Link to="/signup">
        <Button type="button" variant="outlined" color="default">
            Sign up
        </Button>
    </Link>
);

/**
 * Component to render the sign up form, also it send the data to Firebase.
 */
class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...defaultState };

        this.onSubmitEvent = this.onSubmitEvent.bind(this);
        this.setField = this.setField.bind(this);
    }

    onSubmitEvent(evt) {
        evt.preventDefault();
        const { history } = this.props;
        const { email, passwordOne, username, avatar, color } = this.state;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then((dataUser) => {
                return db.doCreateUser(dataUser.user.uid, {
                    username,
                    avatar,
                    color,
                    email
                });
            })
            .then(() => {
                this.setState({ ...defaultState });
                // redirect to login page
                history.push('/');
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                });
            });
    }

    setField(evt) {
        evt.preventDefault();
        let value = evt.target.checkValidity() ? evt.target.value : false;

        if (evt.target.name === 'passswordTwo') {
            if (!value && (evt.target.value !== this.state.passwordOne)) {
                value = false;
            }
        }

        this.setState({
            [evt.target.name]: value,
        });
    }

    render() {
        const messageError = (
            <span id="message-id">
                {this.state.error}
            </span>
        );

        const disabled = !this.state.username || this.state.passwordOne !==
                        this.state.passwordTwo || !this.state.email ||
                        !this.state.passwordOne;

        return (
            <form className="signUpForm" onSubmit={this.onSubmitEvent} style={{ padding: '5% 10%' }}>
                <Grid container direction="row" justify="center" alignItems="center" spacing={24}>
                    <Grid item xs={6} sm={6} md={6} margin="normal">
                        <Grid container direction="row" justify="center" alignItems="center" spacing={24}>
                            <Grid item xs={12} sm={12} md={12} margin="normal" style={{textAlign: "center"}}>
                                <Avatar src={this.state.avatar} width="150" 
                                        height="150" color={this.state.color} />
                            </Grid>
                            {
                                [...Array(14).keys()].map(number => {
                                    return (
                                        <Grid item xs={2} sm={2} md={2} margin="normal" key={number}>
                                            <Avatar src={`/images/avatars/${number + 1}.png`} width="50"
                                                    color={this.state.color} height="50"
                                                    onClick={() => this.setState({avatar: `/images/avatars/${number + 1}.png`})} />
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} margin="normal">
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username" margin="dense" style={{ 'color': 'white !important' }}>
                                Username (from 3 to 10 characters)
                            </InputLabel>
                            <Input type="username" id="username" name="username" autoComplete="username" autoFocus
                                startAdornment={<InputAdornment position="start"><Icon>person</Icon></InputAdornment>}
                                inputProps={{ pattern: "([A-Za-z0-9_]+){3,10}", 
                                title: 'The username must have from 3 to 10 characters, uppercase and lowercase, underscore character.' }}
                                onChange={this.setField} onInvalid={this.setInvalidField} error={!this.state.username} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email" margin="dense" style={{ 'color': 'white !important' }}>
                                Email Address
                            </InputLabel>
                            <Input type="email" id="email" name="email" autoComplete="email"
                                startAdornment={<InputAdornment position="start"><Icon>email</Icon></InputAdornment>}
                                onChange={this.setField} onInvalid={this.setInvalidField} error={!this.state.email} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="passwordOne">Password (from 6 to 15 characters)</InputLabel>
                            <Input type="password" id="passwordOne" name="passwordOne" autoComplete="current-password"
                                startAdornment={<InputAdornment position="start"><Icon>lock</Icon></InputAdornment>}
                                inputProps={{ minLength: 6, maxLength: 15 }}
                                onChange={this.setField} onInvalid={this.setInvalidField} error={!this.state.passwordOne} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="passwordTwo">Repeat password</InputLabel>
                            <Input type="password" id="passwordTwo" name="passwordTwo" autoComplete="current-password"
                                startAdornment={<InputAdornment position="start"><Icon>lock</Icon></InputAdornment>}
                                inputProps={{ minLength: 6, maxLength: 15 }}
                                onChange={this.setField} onInvalid={this.setInvalidField} error={!this.state.passwordTwo} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="color">Color</InputLabel>
                            <HuePicker name="color" color={this.state.color}
                                onChangeComplete={(color, evt) => this.setState({ color: color.hex })} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <Button type="submit" variant="outlined" color="default" disabled={disabled}>
                                Sign up
                            </Button>
                        </FormControl>
                        <Snackbar name="error" open={this.state.error !== ''} autoHideDuration={9000}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            onClose={() => this.setState({ error: '' })} message={messageError} />
                    </Grid>
                </Grid>
            </form>
        );
    }
}


export default withRouter(SignUp);

export {
    SignUpLink,
};