import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../helpers';
import { Grid, FormControl, InputLabel, Input, Button, Snackbar } from '@material-ui/core';
import { SignUpLink } from './signUp';

const defaultState = {
    email: '',
    password: '',
    error: '',
}

const SignIn = ({ history }) => (
    <Grid container direction="column" justify="space-between" alignItems="stretch" spacing={16}>
        <Grid item xs={12} sm={12} md={12} style={{ 'textAlign': 'center' }}>
            <img src="/images/logo.jpg" alt="dollars" />
        </Grid>
        <Grid container direction="row" justify="space-between" alignItems="stretch" spacing={16}>
            <Grid item xs={12} sm={12} md={12} style={{ 'textAlign': 'center' }}>
                <SignInForm history={history} />
            </Grid>
        </Grid>
    </Grid>
);

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...defaultState };

        this.checkField = this.checkField.bind(this);
        this.setField = this.setField.bind(this);
        this.onSubmitEvent = this.onSubmitEvent.bind(this);
    }

    onSubmitEvent(evt) {
        evt.preventDefault();
        const { history } = this.props;
        const { email, password } = this.state;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...defaultState });
                history.push('/chat');
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                });
            });
    }

    checkField(evt) {
        evt.preventDefault();

        this.setState({
            [evt.target.name]: false,
        });
    }

    setField(evt) {
        evt.preventDefault();

        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    render() {
        const messageError = (
            <span id="message-id">
                {this.state.error}
            </span>
        );
        return (
            <form className="signInForm" onSubmit={this.onSubmitEvent} style={{ 'margin': 'auto 30%', 'textAlign': "center" }}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email" margin="dense" style={{ 'color': 'white !important' }}>Email Address</InputLabel>
                    <Input type="email" id="email" name="email" autoComplete="email" autoFocus
                        onChange={this.setField} onInvalid={this.checkField} error={!this.state.email} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password (from 6 to 15 characters)</InputLabel>
                    <Input type="password" id="password" name="password" autoComplete="current-password"
                        inputProps={{ minLength: 6, maxLength: 15 }}
                        onChange={this.setField} onInvalid={this.checkField} error={!this.state.password} />
                </FormControl>
                <Button type="submit" variant="outlined" color="default">
                    Sign in
                </Button>
                <br />
                <SignUpLink />
                <Snackbar name="error" open={this.state.error !== ''} autoHideDuration={9000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    onClose={() => this.setState({ error: '' })} message={messageError} />
            </form>
        );
    }
}

export default withRouter(SignIn);