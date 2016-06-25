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

    toggledata(data) {
        Meteor.call("togglework", data, (error, data) => {
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
                    <ProgressBar indeterminate color='#FF9800'/>
                    <Button raised colored ripple style={{ marginRight: '20px' }} onClick={ handleToggle}>Back</Button>
                </div>
            );
        }
        return (


            <div style={{ width: '100%', height: 'calc(100% - 64px)', overflow: 'auto' }}>
                <Card shadow={0} style={{ width: '100%' }}>
                    <CardTitle style={{backgroundColor: '#d4d4d5', textTransform: 'capitalize' }}>
                        <Button raised colored ripple style={{ width:'80px', marginLeft: '5px', marginRight: '20px' }} onClick={ handleToggle}>Back</Button>
                        <Button raised accent ripple style={{ width:'80px', marginRight: '15px' }} onClick={this.adddetailwork.bind(this, work) }>Save</Button>
                        <div style={{borderLeft:'1px solid #000',height:'30px', marginRight: '5px'}}></div>
                        <div style={{ fontSize: '24px', fontWeight: '300', color: 'white', paddingRight: 'calc(100% - 300px)' }}>{work.title}</div>
                        <Checkbox ripple
                            label="Done"                           
                            onChange={this.toggledata.bind(this, work) }
                            checked={work.complete}/>
                    </CardTitle>
                    <NoSSR  onSSR={<div>Loading</div>}>
                        <RichTextEditor
                            style={{ height: '900px' }}
                            value={this.state.value}
                            onChange={this.onChange.bind(this) }
                            />
                    </NoSSR>
                </Card>
            </div>



        );

    }
}