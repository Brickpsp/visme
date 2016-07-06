import React, {Component} from 'react';
import {Textfield, Button} from 'react-mdl';


export default class Insertwork extends Component {
    addwork(event) {
        event.preventDefault();
        var title = this.refs.title.refs.input.value.trim();
        var description = this.refs.description.refs.input.value.trim();
        if (title && description) {
            Meteor.call("addwork", title, description, (error) => {
                if (error) {
                    Bert.alert('Please Login', 'danger', 'fixed-top', 'fa-frown-o');
                }
                else {
                    Bert.alert('You created new work \"' + title + '\"', 'info', 'growl-top-right');
                    this.refs.title.refs.input.value = "";
                    this.refs.description.refs.input.value = "";
                }
            });
        }
    }

    render() {

        return (
            <div>
                <form onSubmit={this.addwork.bind(this) }>
                    <div>
                        <Textfield
                            label='Title'
                            floatingLabel
                            ref="title"                            
                            /><br />
                        <Textfield
                            label="Description"
                            floatingLabel
                            ref="description"                           
                            /><br />
                        <Button raised ripple style={{ width: '100px' }} type="submit">Add</Button>
                    </div>
                </form>
                <div>

                </div>
            </div>

        );

    }
}

//<RaisedButton label="Add" secondary={true} onClick={this.adddata.bind(this) }/>
