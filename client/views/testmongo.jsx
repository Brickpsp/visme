import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
test = new Mongo.Collection('test');

export default class testmongo extends Component {

   test_data(){
        return test.find().fetch();
    }

    adddata(event) {
        event.preventDefault();

        var text = this.refs.testdata.input.value.trim();
        test.insert({
            test: text,
            complete: false,
            CreateAT: new Date()
        });
        this.refs.testdata.input.value = "";
    }

    render() {
        console.log("asdsad");
         var tes = this.test_data();
        return (            
            <div>
            <AppBar title="Title" iconElementLeft={<a/>}/>
                <form onSubmit={this.adddata.bind(this) }>
                    <TextField
                        hintText="Hint Text"
                        ref="testdata"
                        floatingLabelText="Floating Label Text"
                        /><br />
                </form>
                 {tes[0].test}
            </div>  
            
        );
        
    }
}