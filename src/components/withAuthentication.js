import React from "react";
import { auth, firebase, db } from '../helpers';
import AuthUserContext from "./AuthUserContext";

/**
 * A higher-order component that abstracts the logic of session management,
 * making it available for the App component. In addition, it uses a
 * supplier component that gives access to all App components, the state of
 * the authenticated user
 * @param {React.Component} Component 
 */
const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                authUser: null,
            }
        }

        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                const value = authUser ? authUser : null;
                this.setState({
                    authUser: value,
                });
            });
            window.onbeforeunload = (evt) => {
                if(!!this.state.authUser) {
                    db.createMembersActives(this.state.authUser.uid, false);
                    auth.doSignOut();
                }
            };
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component />
                </AuthUserContext.Provider>
            );
        }
    }

    return WithAuthentication;
}

export default withAuthentication;