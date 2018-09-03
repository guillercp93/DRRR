import React from 'react';
import { withRouter } from 'react-router-dom';
import { firebase } from '../helpers';
import AuthUserContext from './AuthUserContext';

const withAuthorization = (authCondition) => (Component) => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                if (!authCondition(authUser)) {
                    this.props.history.push('/');
                }
            });
        }

        render() {
            return (<AuthUserContext.Consumer >
                {authUser => authUser ? <Component /> : null}
            </AuthUserContext.Consumer>);
        }
    }

    return withRouter(WithAuthorization);
}

export default withAuthorization;