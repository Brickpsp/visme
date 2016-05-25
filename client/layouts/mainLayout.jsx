import React from 'react';
import {Layout, Flex, Fixed} from 'react-layout-pane';

export const MainLayout = ({sidenav, content}) => (
  <div>

    <Layout type="row">
      <Fixed>
        <div>{sidenav}</div>
      </Fixed>
      <Flex>
        <div>{content}</div>
      </Flex>
    </Layout>


  </div>
);