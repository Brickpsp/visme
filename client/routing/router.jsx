import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from '/client/layouts/mainLayout.jsx';


import Mydata from '/client/views/mydata.jsx';
FlowRouter.route("/", {
  action () {
    mount(MainLayout, {     
      content: <Mydata/>
    });
  }
});