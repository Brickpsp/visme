import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import RichTextEditor from 'react-rte';
import NoSSR from 'react-no-ssr';
import { Button, Checkbox, Card, CardTitle, CardActions } from 'react-mdl';

export default class detail extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = { works: work.findOne(props.id) }
        this.state = { value: RichTextEditor.createValueFromString(this.state.works.detail, 'html') }


    }

    findwork() {
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
        var detail = this.state.value.toString('html');
        if (detail) {
            Meteor.call("detailwork", data, detail, (error) => {
                if (error) {
                    Bert.alert('Please Login', 'danger', 'fixed-top', 'fa-frown-o');
                }
                else Bert.alert('Updated detail your work', 'info', 'growl-top-right');
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
                    <ProgressBar indeterminate color='#FF9800'/>
                    <Button raised colored ripple style={{ marginRight: '20px' }} onClick={ handleToggle}>Back</Button>
                </div>
            );
        }
        return (
            <div>
                <Card shadow={0} style={{ width: '100%', overflow: 'auto', boxShadow: 'none' }}>
                    <CardTitle style={{ backgroundColor: '#d4d4d5', textTransform: 'capitalize' }}>
                        <Button raised colored ripple style={{ width: '100px', marginLeft: '5px', marginRight: '20px' }} onClick={ handleToggle}>Back</Button>
                        <Button raised accent ripple style={{ width: '100px', marginRight: '15px' }} onClick={this.adddetailwork.bind(this, work) }>Save</Button>
                        <div style={{ borderLeft: '1px solid #000', height: '30px', marginRight: '15px' }}></div>
                        <div style={{ fontSize: '24px', fontWeight: '300', color: 'white' }}>{work.title}</div>
                        <div style={{ width: '100px', overflow: 'hidden', right: '0px', position: 'absolute', paddingTop: '8px' }}>
                            <Checkbox ripple
                                label="Done"
                                onChange={this.togglework.bind(this, work) }
                                checked={work.complete}
                                />
                        </div>
                    </CardTitle>
                    <CardActions>
                        <NoSSR  onSSR={<div>Loading</div>}>
                            <RichTextEditor
                                value={this.state.value}
                                onChange={this.onChange.bind(this) }
                                />
                        </NoSSR>
                    </CardActions>
                </Card>
            </div>



        );

    }
}