import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from '/client/layouts/mainLayout.jsx';
import Content from '/client/components/content.jsx';


import Mydata from '/client/views/mydata.jsx';
FlowRouter.route("/", {
  action () {
    mount(MainLayout, {     
      content: <Mydata/>
    });
  }
});