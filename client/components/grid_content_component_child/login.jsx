import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Accounts,STATES } from 'meteor/std:accounts-material';

export default class AccountsUIWrapper extends TrackerReact(Component) {
    render() {
        Accounts.ui.config({
            passwordSignupFields: 'USERNAME_AND_EMAIL',                         
        });
        // Just render a placeholder container that will be filled in
        return (
            <div>
                <Accounts.ui.LoginForm  formState={ STATES.PROFILE }/>
            </div>
        );
    }
}