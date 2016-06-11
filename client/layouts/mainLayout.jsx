import React from 'react';
import Sidenav from '/client/components/sidenav.jsx';
import {Layout, Flex, Fixed} from 'react-layout-pane';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const MainLayout = ({sidenav, content}) => (
   <MuiThemeProvider muiTheme={getMuiTheme() }>

    <Layout type="row">
      <Fixed>
        <Sidenav/>
      </Fixed>
      <Flex style={{overflowX:'hidden'}}>
       
        <div style={{width:'calc(100vw - 80px)'}}>{content}</div>
         
      </Flex>
    </Layout>


 </MuiThemeProvider>
);