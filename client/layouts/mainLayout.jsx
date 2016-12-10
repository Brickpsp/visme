import React from 'react';
import is from 'is_js';
//Perf = require('react-addons-perf');
import Sidenav from '/client/components/sidenav.jsx';
import {Layout, Flex, Fixed} from 'react-layout-pane';

import '/public/css/animation.css';
import '/public/css/sidenav.css';
import '/public/css/base.css';

import '/node_modules/react-mdl/extra/material.css';
import '/node_modules/react-mdl/extra/material.js';
import '/public/dist/alloy-editor/assets/alloy-editor-ocean-min.css';


DocHead.setTitle('BuildTest');

export const MainLayout = ({content,admin}) => (
  <div>
    {
	(admin) ?
	    <div>
		  {admin}
		</div>
	:
    <div>
      {
        (is.desktop()) ?
          <Layout type="row">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <Fixed>
              <Sidenav/>
            </Fixed>
            <Flex style={{ overflowX: 'hidden', height: '100vh' }}>
              <div style={{ width: 'calc(100vw - 80px)' }}>{content}</div>
            </Flex>
          </Layout>
          :
          <div>this is for phone</div>
      }
	</div>
    }
  </div>
);
