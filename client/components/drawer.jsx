import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const drawer = () => (
 
  
    <Drawer className="site-sidenav-collapse md-sidenav-left md-whiteframe-z2" open={true}>
    <canvas id="canvas"></canvas>
      <MenuItem>Menu Item</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
    </Drawer>
 
);



export default drawer;