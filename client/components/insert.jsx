import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export default class testmongo extends Component {

    adddata(event) {
        event.preventDefault();

        var text = this.refs.testdata.input.value.trim();
        if(text)
        {
        Meteor.call("adddata", text, (error,data) =>{
            if(error)
            {
               Bert.alert('Please Login','danger','fixed-top', 'fa-frown-o' );
            }
            else
              this.refs.testdata.input.value = "";
        });
        }
    }

    render() {
         
        return (            
            <div>
            <AppBar title="Add Data" iconElementLeft={<a/>}/>
                <form onSubmit={this.adddata.bind(this) }>
                    <TextField
                        hintText="Hint Text"
                        ref="testdata"
                        floatingLabelText="Floating Label Text"
                        style={{width: '80%',}}
                        /><br />
                        </form>
                <div>
                               
                 </div>
            </div>  
            
        );
        
    }
}

//<RaisedButton label="Add" secondary={true} onClick={this.adddata.bind(this) }/>
                