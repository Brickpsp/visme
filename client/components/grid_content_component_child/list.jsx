import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { DataTable, TableHeader, Checkbox, FABButton, Icon } from 'react-mdl';

export default class list extends TrackerReact(Component) {
    work_data() {
        return work.find().fetch();
    }

    togglework(data) {
        Meteor.call("togglework", data, (error, data) => {
            if (error) {
                Bert.alert('Please Login', 'danger', 'fixed-top', 'fa-frown-o');
            }
        });
    }

    deletework(data) {
        Meteor.call("deletework", data, (error, data) => {
            if (error) {
                Bert.alert('Please Login', 'danger', 'fixed-top', 'fa-frown-o');
            }
        });
    }

    go_to_work(id) {
        this.props.callback(id);
    }

    render() {
        var works = this.work_data();

        var element = {};

        return (
           
                <DataTable
                    shadow={0}
                    rows={works}
                    rowKeyColumn="_id"
                    style={{ width: '100% ' }}
                    >
                    <TableHeader name="title" tooltip="ex1">Title</TableHeader>
                    <TableHeader  name="description" tooltip="ex2">Description</TableHeader>
                    <TableHeader name="complete" cellFormatter={(complete, work) => <Checkbox ripple checked={complete} onChange={ this.togglework.bind(this, work) }/>} tooltip="ex3">Complete</TableHeader>
                    <TableHeader  name="CreateAT" cellFormatter={(CreateAT) => CreateAT.toLocaleDateString() } tooltip="ex4">Date Created</TableHeader>
                    <TableHeader name="command" cellFormatter={(Command, work) =>
                        <div>
                            <FABButton mini colored onClick={this.deletework.bind(this, work)} style={{marginRight: '10px' }}>
                                <Icon name="delete" />
                            </FABButton>
                            <FABButton mini>
                                <Icon name="create" onClick={this.go_to_work.bind(this, work._id) }/>
                            </FABButton>
                        </div>
                    }  tooltip="ex5">Command</TableHeader>
                </DataTable>
           
        );

    }
}