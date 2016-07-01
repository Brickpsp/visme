import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Accounts,STATES } from 'meteor/std:accounts-material';

export default class AccountsUIWrapper extends TrackerReact(Component) {
     constructor(props) {
        super(props);
        this.state = { login: STATES.SIGN_IN }        
 STATES.PROFILE
    }
    render() {
        Accounts.ui.config({
            passwordSignupFields: 'USERNAME_AND_EMAIL',                              
        });
        // Just render a placeholder container that will be filled in
        return (
            <div>
                <Accounts.ui.LoginForm  
                formState={this.state.login}
                onSignedInHook={ () => this.setState({ login: STATES.PROFILE }) } 
                />
            </div>
        );
    }
}