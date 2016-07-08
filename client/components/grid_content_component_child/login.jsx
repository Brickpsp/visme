import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Textfield, Button} from 'react-mdl';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class AccountsUIWrapper extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            statuslogin: 'signin',
            repeatpass: false,
            editProfile: false,
        }
    }

    loginuser(event) {
        event.preventDefault();
        var user = this.refs.username.refs.input.value.trim();
        var pass = this.refs.password.refs.input.value.trim();
        if (user && pass) {
            Meteor.loginWithPassword(user, pass, (error) => {
                if (error) {
                    this.setState({ error: error.reason });
                }
                else {
                    Bert.alert('Login as ' + user + '', 'info', 'fixed-top', 'fa-frown-o');
                }
            });
        }
        else {
            this.setState({ error: "Username and password can't blank" });
        }
    }

    logoutuser(event) {
        event.preventDefault();
        Meteor.logout((error) => {
            if (error) {
                this.setState({ error: error.reason });
            }
            else {
                Bert.alert('Logout', 'danger', 'fixed-top', 'fa-frown-o');
                this.setState({ statuslogin: 'signin' });
            }
        });
    }

    signupuser(event) {
        event.preventDefault();
        var user = this.refs.username_su.refs.input.value.trim();
        var pass = this.refs.password_su.refs.input.value.trim();
        //var name = this.refs.name_su.refs.input.value.trim();
        var email = this.refs.email_su.refs.input.value.trim();
        if (user && pass && email) {
            if (this.state.repeatpass) {
                Accounts.createUser({ username: user, email: email, password: pass, profile: { name: name } }, (error) => {
                    if (error) {
                        this.setState({ error: error.reason });
                    }
                    else {
                        Bert.alert('Created user', 'info', 'fixed-top', 'fa-frown-o');
                    }
                });
            }
        }
        else {
            this.setState({ error: "Please, fill all field" });
        }
    }

    editProfile(event) {
        event.preventDefault();
        this.setState({ editProfile: true })
    }

    changeToProfileFromEdit(event) {
        event.preventDefault();
        this.setState({ editProfile: false })
    }

    changetosignin(event) {
        event.preventDefault();
        this.hideError();
        this.setState({ statuslogin: 'signin' })
    }

    changetosignup(event) {
        event.preventDefault();
        this.hideError();
        this.setState({ statuslogin: 'signup' })
    }

    hideError() {
        this.setState({ error: '' })
    }

    validateSignup() {
        this.setState({ error: '' })
        if (this.refs.repassword_su.refs.input.value.trim().length == this.refs.password_su.refs.input.value.trim().length) {
            if (this.refs.repassword_su.refs.input.value.trim() == this.refs.password_su.refs.input.value.trim()) {
                this.setState({ repeatpass: true })
            }
            else {
                this.setState({ error: 'Repeat password not same password' })
            }
        }
        else {
            this.setState({ repeatpass: false })
        }
    }


    render() {
        return (
            <div>
                {
                    (Meteor.user()) ?
                        <div>
                            {
                                this.state.editProfile ?
                                    <div>
                                        <Button raised colored ripple style={{ width: '100px', marginLeft: '10px' }} onClick={this.changeToProfileFromEdit.bind(this) }>Back</Button>
                                    </div>
                                    :
                                    <div>
                                        <h4 style={{ borderRadius: '10px', textIndent: '10px' }}>Welcome {Meteor.user().username}</h4>
                                        <br/>
                                        <Button raised colored ripple style={{ width: '100px', marginLeft: '10px' }} onClick={this.logoutuser.bind(this) }>Logout</Button>
                                        <Button raised ripple style={{ width: '200px', marginLeft: '10px' }} onClick={this.editProfile.bind(this) }>Change profile</Button>
                                    </div>
                            }
                        </div>
                        :
                        <div>
                            {(() => {
                                switch (this.state.statuslogin) {
                                    case "signin":
                                        return (
                                            <form onSubmit={this.loginuser.bind(this) }>
                                                <div>
                                                    <Textfield
                                                        label="Username"
                                                        floatingLabel
                                                        ref="username"
                                                        onChange={this.hideError.bind(this) }
                                                        /><br />
                                                    <Textfield
                                                        ref="password"
                                                        floatingLabel
                                                        label="Password"
                                                        type="password"
                                                        onChange={this.hideError.bind(this) }
                                                        /><br />
                                                    <Button raised ripple style={{ width: '100px', marginRight: '20px' }} type="submit">Login</Button>
                                                    <Button raised colored ripple style={{ width: '100px' }} onClick={this.changetosignup.bind(this) }>Register</Button>
                                                </div>
                                            </form>
                                        )
                                    case "signup":
                                        return (
                                            <div>
                                                <form onSubmit={this.signupuser.bind(this) }>
                                                    <div>
                                                        <Textfield
                                                            floatingLabel
                                                            label="Username"
                                                            ref="username_su"
                                                            onChange={this.validateSignup.bind(this) }
                                                            /><br />
                                                        <Textfield
                                                            label="Password"
                                                            floatingLabel
                                                            type="password"
                                                            ref="password_su"
                                                            onChange={this.validateSignup.bind(this) }
                                                            /><br />
                                                        <Textfield
                                                            label="Repeat password"
                                                            floatingLabel
                                                            type="repassword"
                                                            ref="repassword_su"
                                                            onChange={this.validateSignup.bind(this) }
                                                            /><br />
                                                        <Textfield
                                                            floatingLabel
                                                            label="Email"
                                                            type="email"
                                                            ref="email_su"
                                                            onChange={this.validateSignup.bind(this) }
                                                            /><br />
                                                        <Button raised colored ripple style={{ width: '200px', marginRight: '20px' }} type="submit">Create account</Button>
                                                        <Button raised ripple style={{ width: '100px' }} onClick={this.changetosignin.bind(this) }>Back</Button>
                                                    </div>
                                                </form>
                                            </div>
                                        )
                                }
                            })() }
                        </div>
                }
                <h5 style={{ fontFamily: "Helvetica", color: 'white', backgroundColor: 'red', borderRadius: '5px', textIndent: '10px' }}>{this.state.error}</h5>
            </div>

        );
    }
}