import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import GridCnt from '/client/components/grid_content.jsx'
test = new Mongo.Collection('test');

export default class Mydata extends TrackerReact(React.Component) {
    constructor() {
        super();
        this.state = {
            subcription: {
                test: Meteor.subscribe("userData")
            }
        }
    }

    componentWillUnmount() {
        this.state.subscription.test.stop();
    }


    render() {
       

        return (
            <MuiThemeProvider muiTheme={getMuiTheme() }>
                <GridCnt/>
            </MuiThemeProvider>
        );
    }
}