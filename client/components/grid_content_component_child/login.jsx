import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Textfield, Button} from 'react-mdl';

export default class AccountsUIWrapper extends TrackerReact(Component) {
    constructor(props) {
        super(props);
                
            this.state = { statuslogin: 'signin' }
        
       
    }

       componentWillMount() {      
        if (Meteor.user()) {            
            this.state = { statuslogin: 'profile' }
             this.setState({ user:  Meteor.user().username });
        }        

    }

    loginuser(event) {
        event.preventDefault();
        var user = this.refs.username.refs.input.value.trim();
        var pass = this.refs.password.refs.input.value.trim();
        if (user && pass) {
            Meteor.loginWithPassword(user, pass, (error) => {
                if (error) {
                    Bert.alert('Wrong user or pass', 'danger', 'fixed-top', 'fa-frown-o');
                }
                else {
                    Bert.alert('Login as ' + user + '', 'info', 'fixed-top', 'fa-frown-o');
                    this.setState({ user: user });
                    setTimeout(() => {
                        this.setState({ statuslogin: 'profile' });
                    }, 200);
                }
            });

        }
    }

    logoutuser(event) {
        event.preventDefault();
        Meteor.logout((error) => {
            Bert.alert('Logout', 'danger', 'fixed-top', 'fa-frown-o');
            setTimeout(() => {
                this.setState({ statuslogin: 'signin' });
            }, 200);
        });
    }

    changetosignin(event) {
        event.preventDefault();
        setTimeout(() => {
            this.setState({ statuslogin: 'signin' })
        }, 200);
    }

    changetosignup(event) {
        event.preventDefault();
        setTimeout(() => {
            this.setState({ statuslogin: 'signup' })
        }, 200);
    }

    signupuser(event) {
        event.preventDefault();
        var user = this.refs.username_su.refs.input.value.trim();
        var pass = this.refs.password_su.refs.input.value.trim();
        var name = this.refs.name_su.refs.input.value.trim();
        var email = this.refs.email_su.refs.input.value.trim();
        Accounts.createUser({ username: user, email: email, password: pass, profile: { name: name } }, (error) => {
            Bert.alert('ok', 'danger', 'fixed-top', 'fa-frown-o');

        });
    }

    render() {
        let loginStatus = Meteor.user();

        return (
            <div>
                {(() => {
                    switch (this.state.statuslogin) {
                        case "signin":
                            return (
                                <div>
                                    <form onSubmit={this.loginuser.bind(this) }>
                                        <div>
                                            <Textfield
                                                label="Username"
                                                floatingLabel
                                                ref="username"
                                                /><br />
                                            <Textfield
                                                ref="password"
                                                floatingLabel
                                                label="Password"
                                                type="password"
                                                /><br />
                                            <Button raised ripple style={{ width: '100px', marginRight: '20px' }} type="submit">Login</Button>
                                            <Button raised colored ripple style={{ width: '100px' }} onClick={this.changetosignup.bind(this) }>Sign Up</Button>
                                        </div>
                                    </form>
                                </div>
                            )
                        case "profile":
                            return (
                                <div>
                                    <a>Welcome {this.state.user}</a>
                                    <br/>
                                    <Button raised colored ripple style={{ width: '100px' }} onClick={this.logoutuser.bind(this) }>Logout</Button>

                                </div>
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
                                                /><br />
                                            <Textfield
                                                label="Password"
                                                floatingLabel
                                                type="password"
                                                ref="password_su"
                                                /><br />
                                            <Textfield
                                                floatingLabel
                                                label="Name"
                                                ref="name_su"
                                                /><br />
                                            <Textfield
                                                floatingLabel
                                                label="Email"
                                                type="email"
                                                ref="email_su"
                                                /><br />
                                            <Button raised colored ripple  style={{ width: '100px', marginRight: '20px' }} type="submit">Sign Up</Button>
                                            <Button raised colored ripple  style={{ width: '100px' }} onClick={this.changetosignin.bind(this) }>Back</Button>
                                        </div>
                                    </form>
                                </div>
                            )
                    }
                })() }
            </div>

        );
    }
}