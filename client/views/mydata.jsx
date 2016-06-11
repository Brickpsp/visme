import React from 'react';


import GridCnt from '/client/components/grid_content.jsx';

test = new Mongo.Collection('test');

export default class Mydata extends React.Component {
    constructor() {
        super();        
        this.state = {
            subscription: {
                test: Meteor.subscribe("userData"),
               
            },            
        }
    }

    componentWillUnmount() {       
        this.state.subscription.test.stop();
    }



    render() {
       

        return (
           
           
                        
      
                <GridCnt />
                
            
           
        );
    }
}