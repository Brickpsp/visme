import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
var ResponsiveReactGridLayout = require('react-grid-layout').Responsive;
var ReactGridLayout = require('react-grid-layout');
test = new Mongo.Collection('test');

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class Content extends React.Component {
     
    adddata(event){
        event.preventDefault();
        console.log(this);
        var text = this.refs.testdata.input.value.trim();
        test.insert({
          test : text,
          complete : false,
          CreateAT : new Date()  
        });
       this.refs.testdata.input.value = "";
    }
    
    render(){
          var layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];
        
        return (
              <MuiThemeProvider muiTheme={getMuiTheme() }>
       
    <Tab label="Item One" >
            <div>
            
                <h2 style={styles.headline}>Tab One</h2>
                <form onSubmit={this.adddata.bind(this)}>
                   
                     <TextField
      hintText="Hint Text"
      ref="testdata"
      floatingLabelText="Floating Label Text"
    /><br />
                </form>
            </div>
            
             <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div key={'a'}>a</div>
        <div key={'b'}>b</div>
        <div key={'c'}>c</div>
      </ReactGridLayout>
            </Tab>
           
            </MuiThemeProvider>
        );
    }
}