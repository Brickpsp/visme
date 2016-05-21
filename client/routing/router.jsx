import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from '/client/layouts/mainLayout.jsx';
import Content from '/client/components/content.jsx';
import Sidenav from '/client/components/sidenav.jsx';

FlowRouter.route("/", {
  action () {
    mount(MainLayout, {
      sidenav: <Sidenav/>,
      content: <Content/>
    });
  }
});