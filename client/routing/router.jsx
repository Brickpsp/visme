import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from '/client/layouts/mainLayout.jsx';
import Work from '/client/views/work.jsx';
import About from '/client/views/about.jsx';
//work = new Mongo.Collection('work');

FlowRouter.route("/", {
   /*subscriptions: function() {
        this.register(work, Meteor.subscribe("userData"));
    },*/
  action () {
    mount(MainLayout, {           
      content:      
       <Work/>   
    });
  }
});

FlowRouter.route("/about", {
  action () {
    mount(MainLayout, {         
      content:      
      <About />      
    });
  }
});


FlowRouter.notFound = {
    action: function() {
 <div>Where Do You Go ?</div>      
    }
};