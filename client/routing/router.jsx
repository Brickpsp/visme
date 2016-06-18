import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from '/client/layouts/mainLayout.jsx';
import '/public/css/animation.css';
import Mydata from '/client/views/mydata.jsx';


FlowRouter.route("/", {
  action () {
    mount(MainLayout, {           
      content:
      
       <Mydata/>
      
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