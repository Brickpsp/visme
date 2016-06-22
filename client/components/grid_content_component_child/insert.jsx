import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export default class Insertwork extends Component {

    addwork(event) {
        event.preventDefault();
        var title = this.refs.title.input.value.trim();
        var description = this.refs.description.input.value.trim();
        if (title && description) {
            Meteor.call("addwork", title, description, (error, data) => {
                if (error) {
                    Bert.alert('Please Login', 'danger', 'fixed-top', 'fa-frown-o');
                }
                else {
                    this.refs.title.input.value = "";
                    this.refs.description.input.value = "";
                }
            });
        }
    }

    render() {

        return (
            <div>
                <form onSubmit={this.addwork.bind(this) }>
                    <div style={{ width: '80%', paddingLeft: '5%' }}>
                        <TextField
                            hintText="Title of Work"
                            ref="title"
                            floatingLabelText="Title"
                            /><br />
                        <TextField
                            hintText="Description of work"
                            ref="description"
                            floatingLabelText="Description"
                            /><br />
                        <RaisedButton label="Add" primary={true} type="submit" />
                    </div>
                </form>
                <div>

                </div>
            </div>

        );

    }
}

//<RaisedButton label="Add" secondary={true} onClick={this.adddata.bind(this) }/>
