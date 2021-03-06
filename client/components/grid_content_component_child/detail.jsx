import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import AlloyEditorComponent from './alloyeditor.js';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { Button, Checkbox, Card, CardTitle, CardActions, ProgressBar } from 'react-mdl';

export default class detail extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = { work: work.findOne(this.props.id) };
        this.state = { value: this.state.work.detail };
    }


    work_data() {
        return work.findOne(this.props.id);
    }

    togglework(data) {
        var complete = !data.complete;
        var title = data.title;
        Meteor.call("togglework", data, (error) => {
            if (error) {
                Bert.alert('Please Login', 'danger', 'fixed-top', 'fa-frown-o');
            }
            else {

                if (complete) {
                    Bert.alert('Work \"' + title + '\" is completed', 'info', 'growl-top-right');
                }
                else Bert.alert('Work \"' + title + '\" is not finish', 'info', 'growl-top-right');
            }
        });
    }


    adddetailwork(data) {
        var detail = CKEDITOR.instances['editable'].getData();
        if (detail) {
            Meteor.call("detailwork", data, detail, (error) => {
                if (error) {
                    Bert.alert('Please Login', 'danger', 'fixed-top', 'fa-frown-o');
                }
                else Bert.alert('Updated detail your work', 'info', 'growl-top-right');
            });
        }
    }

    render() {
        var work = this.work_data();
        //console.log(Meteor.user());

        handleToggle = () => {
            this.props.callback();
        }

        if (!work) {
            return (
                <div>
                    <ProgressBar style={{ width: '100%' }} indeterminate color='#FF9800'/>
                    <Button raised colored ripple style={{ marginRight: '20px' }} onClick={handleToggle}>Back</Button>
                </div>
            );
        }
        return (
            <div>

                {(() => {
                    switch (this.props.status) {
                        case "edit":
                            return (
                                <Card shadow={0} style={{ width: '100%', overflow: 'auto', boxShadow: 'none' }}>
                                    <CardTitle style={{ backgroundColor: '#d4d4d5', textTransform: 'capitalize' }}>
                                        <Button raised colored ripple style={{ width: '100px', marginLeft: '5px', marginRight: '20px' }} onClick={handleToggle.bind(this) }>Back</Button>
                                        <Button raised accent ripple style={{ width: '100px', marginRight: '15px' }} onClick={this.adddetailwork.bind(this, work) }>Save</Button>
                                        <div style={{ borderLeft: '1px solid #000', height: '30px', marginRight: '15px' }}></div>
                                        <div style={{ fontSize: '24px', fontWeight: '300', color: 'white' }}>{work.title}</div>
                                        <div style={{ borderLeft: '1px solid #000', height: '30px', marginRight: '15px', marginLeft: '15px' }}></div>
                                        <div style={{ fontSize: '24px', fontWeight: '300', color: 'white' }}>Owner: {work.username}</div>
                                        <div style={{ width: '100px', overflow: 'hidden', right: '0px', position: 'absolute', paddingTop: '8px' }}>
                                            <Checkbox ripple
                                                label="Public"
                                                onChange={this.togglework.bind(this, work) }
                                                checked={work.complete}
                                                />

                                        </div>
                                    </CardTitle>
                                    <CardActions style={{ overflowX: 'hidden', padding: '20px' }}>
                                        { canUseDOM ?
                                            <AlloyEditorComponent edit={true} text={this.state.value} container= 'editable'/>
                                            :
                                            null
                                        }
                                    </CardActions>
                                </Card>
                            )
                        case "view":
                            return (
                                <Card shadow={0} style={{ width: '100%', overflow: 'auto', boxShadow: 'none' }}>
                                    <CardTitle style={{ backgroundColor: '#d4d4d5', textTransform: 'capitalize' }}>
                                        <Button raised colored ripple style={{ width: '100px', marginLeft: '5px', marginRight: '20px' }} onClick={handleToggle}>Back</Button>
                                        <div style={{ borderLeft: '1px solid #000', height: '30px', marginRight: '15px' }}></div>
                                        <div style={{ fontSize: '24px', fontWeight: '300', color: 'white' }}>{work.title} (Read Only) </div>
                                        <div style={{ borderLeft: '1px solid #000', height: '30px', marginRight: '15px', marginLeft: '15px' }}></div>
                                        <div style={{ fontSize: '24px', fontWeight: '300', color: 'white' }}>Owner: {work.username}</div>
                                        <div style={{ width: '100px', overflow: 'hidden', right: '0px', position: 'absolute', paddingTop: '8px' }}>

                                        </div>
                                    </CardTitle>
                                    <CardActions style={{ overflowX: 'hidden', padding: '20px' }}>
                                        { canUseDOM ?
                                            <AlloyEditorComponent edit={false} text={this.state.value} container= 'editable'/>
                                            :
                                            null
                                        }
                                    </CardActions>
                                </Card>

                            )

                    }
                })() }
            </div>



        );

    }
}

