import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import LinearProgress from 'material-ui/LinearProgress';
import Checkbox from 'material-ui/Checkbox';

export default class detail extends TrackerReact(Component) {
    findwork(id) {
        return work.findOne(this.props.id);
    }

    toggledata(data) {
        Meteor.call("toggledata", data, (error, data) => {
            if (error) {
                Bert.alert('Please Login', 'danger', 'fixed-top', 'fa-frown-o');
            }
        });
    }

    adddetailwork(data) {        
        var detail = this.refs.detail.getValue().trim();        
        if (detail) {
            Meteor.call("detailwork", data,  detail, (error, data) => {
                if (error) {
                    Bert.alert('Please Login', 'danger', 'fixed-top', 'fa-frown-o');
                }
            });
        }
    }

    render() {
        var work = this.findwork();
        handleToggle = () => {
            this.props.callback();
        }

        if (!work) {
            return (
                <div>
                    <LinearProgress mode="indeterminate" color='#FF9800'/>
                    <RaisedButton label="Back" primary={true} style={{ marginRight: '20px' }} onClick={ handleToggle} />
                </div>
            );
        }
        return (

            
                <div style={{ width: '100%' }}>
                    <Toolbar>
                        <ToolbarGroup>
                            <RaisedButton label="Back" primary={true} style={{ marginRight: '20px' }} onClick={ handleToggle} />
                            <RaisedButton label="Save" secondary={true}  onClick={this.adddetailwork.bind(this, work)} />
                            <ToolbarSeparator />
                            <ToolbarTitle style={{ textAlign: 'center', textTransform: 'uppercase', fontSize: '30px', paddingLeft: '30px' }} text={work.title} />
                        </ToolbarGroup>
                        <ToolbarGroup lastChild={true}>
                            <div style={{ marginTop: 16, paddingRight: 8 }}>
                                <Checkbox label="Done"
                                    onClick={this.toggledata.bind(this, work) }
                                    checked={work.complete}/>
                            </div>
                        </ToolbarGroup>
                    </Toolbar>
                    <TextField
                        hintText="About work"
                        ref="detail"
                        defaultValue={work.detail}
                        floatingLabelText="Detail work"
                        multiLine={true}
                        fullWidth={true}
                        rows={1} />
                    <br />
                </div>
           


        );

    }
}