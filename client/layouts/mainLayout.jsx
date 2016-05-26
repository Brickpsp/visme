import React from 'react';
import Sidenav from '/client/components/sidenav.jsx';
import {Layout, Flex, Fixed} from 'react-layout-pane';

export const MainLayout = ({sidenav, content}) => (
  <div>

    <Layout type="row">
      <Fixed>
        <Sidenav/>
      </Fixed>
      <Flex>
        <div>{content}</div>
      </Flex>
    </Layout>


  </div>
);