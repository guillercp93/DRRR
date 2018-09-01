import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './signIn';
import SignUp from './signUp';
import Chat from './chat';
import './App.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import withAuthentication from './withAuthentication';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <MuiThemeProvider theme={theme}>
            <Route exact path="/" component={SignIn}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/chat" component={Chat}></Route>
          </MuiThemeProvider>
        </Router>
      </div>
    );
  }
}

export default withAuthentication(App);
