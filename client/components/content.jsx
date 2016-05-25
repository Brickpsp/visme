import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Paper from 'material-ui/Paper';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import Testmg from '/client/views/testmongo.jsx';



export default class Content extends TrackerReact(React.Component) {
 

    render() {
       

        return (
              <MuiThemeProvider muiTheme={getMuiTheme() }>
           <ResponsiveReactGridLayout 
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
                <Paper key="a" zDepth={1}  _grid={{ x: 0, y: 0, w: 10, h: 5}}>
                      <Testmg />          
                </Paper>
                 <Paper  key="c" _grid={{x: 11, y: 0, w: 2, h: 2}}>
                
                 </Paper>
             </ResponsiveReactGridLayout>
              </MuiThemeProvider>
        );
    }
}