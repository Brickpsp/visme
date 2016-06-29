import React from 'react';
import Sidenav from '/client/components/sidenav.jsx';
import {Layout, Flex, Fixed} from 'react-layout-pane';

import '/public/css/animation.css';
import '/public/css/sidenav.css';
import '/public/css/base.css';

import '/node_modules/react-mdl/extra/material.css';
import '/node_modules/react-mdl/extra/material.js';

DocHead.setTitle('BuildTest');
export const MainLayout = ({sidenav, content}) => (  
  <div>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
    <Layout type="row">
      <Fixed>
        <Sidenav/>
      </Fixed>
      <Flex style={{overflowX:'hidden', height:'100vh'}}>             
        <div style={{width:'calc(100vw - 80px)'}}>{content}</div>         
      </Flex>
    </Layout>
 </div>
);