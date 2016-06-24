import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import LinearProgress from 'material-ui/LinearProgress';
import Checkbox from 'material-ui/Checkbox';
import RichTextEditor from 'react-rte';
import NoSSR from 'react-no-ssr';

export default class detail extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = { works: work.findOne(props.id) }
        this.state = { value: RichTextEditor.createValueFromString(this.state.works.detail, 'html') }


    }

    findwork() {
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
        var detail = this.state.value.toString('html');
        if (detail) {
            Meteor.call("detailwork", data, detail, (error, data) => {
                if (error) {
                    Bert.alert('Please Login', 'danger', 'fixed-top', 'fa-frown-o');
                }
            });
        }
    }

    onChange(value) {
        this.setState({ value });
    };

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


            <div style={{ width: '100%', height: 'calc(100% - 64px)', overflow: 'auto' }}>
                <Toolbar>
                    <ToolbarGroup>
                        <RaisedButton label="Back" primary={true} style={{ marginRight: '20px' }} onClick={ handleToggle} />
                        <RaisedButton label="Save" secondary={true}  onClick={this.adddetailwork.bind(this, work) } />
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
                <NoSSR  onSSR={<div>Loading</div>}>
                    <RichTextEditor
                        style={{ height: '100%' }}
                        value={this.state.value}
                        onChange={this.onChange.bind(this) }
                        />
                </NoSSR>
            </div>



        );

    }
}