import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from '/client/layouts/mainLayout.jsx';
import Work from '/client/views/work.jsx';
import DetailWork from '/client/components/grid_content_component_child/detail.jsx';

FlowRouter.route("/", {
  action () {
    mount(MainLayout, {           
      content:      
       <Work/>      
    });
  }
});

FlowRouter.route("/a", {
  action () {
    mount(MainLayout, {           
      content:      
      <div style={{backgroundColor:'black',height:'100vh'}}>asdsa</div>      
    });
  }
});