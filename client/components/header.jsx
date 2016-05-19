import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from './drawer';
import CanvasComponent from './web_net_ani';


const header = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Drawer />
  </MuiThemeProvider>
);

export default header;