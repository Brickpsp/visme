import React from 'react';
import SplitPane from 'react-split-pane';
import {Layout, Flex, Fixed} from 'react-layout-pane';

export const MainLayout = ({sidenav, content}) => (
  <div>

    <Layout type="row">
      <Fixed className="sidebar">
        <div>{sidenav}</div>
      </Fixed>
      <Flex>
        <div>{content}</div>
      </Flex>
    </Layout>


  </div>
);