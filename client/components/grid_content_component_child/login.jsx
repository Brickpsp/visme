import React, { Component } from 'react';
import { Accounts } from 'meteor/std:accounts-material';

export default class AccountsUIWrapper extends Component {
    render() {
        Accounts.ui.config({
            passwordSignupFields: 'USERNAME_AND_EMAIL'
        });
        // Just render a placeholder container that will be filled in
        return (
            <div>
                <Accounts.ui.LoginForm />
            </div>
        );
    }
}