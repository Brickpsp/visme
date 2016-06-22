import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentDel from 'material-ui/svg-icons/content/remove';
import Goto from 'material-ui/svg-icons/content/create';

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

        return (
            <div>
                <Table >
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Title</TableHeaderColumn>
                            <TableHeaderColumn>Description</TableHeaderColumn>
                            <TableHeaderColumn>Complete</TableHeaderColumn>
                            <TableHeaderColumn>Date Created</TableHeaderColumn>
                            <TableHeaderColumn>Command</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={false} >
                        {works.map((row, index) => (
                            <TableRow key={index} selected={true} >
                                <TableRowColumn  >{row.title}</TableRowColumn>
                                <TableRowColumn>{row.description}</TableRowColumn>
                                <TableRowColumn>
                                    <Checkbox
                                        onClick={this.togglework.bind(this, row)}                                       
                                        checked={row.complete}
                                        />
                                </TableRowColumn>
                                <TableRowColumn>{row.CreateAT.toDateString() }</TableRowColumn>
                                <TableRowColumn>
                                    <FloatingActionButton mini={true} secondary={true} style={{ marginRight: '20px' }} onClick={this.deletework.bind(this, row) }>
                                        <ContentDel />
                                    </FloatingActionButton>
                                    <FloatingActionButton mini={true} onClick={this.go_to_work.bind(this, row._id) }>
                                        <Goto />
                                    </FloatingActionButton>
                                </TableRowColumn>
                            </TableRow>
                        )) }
                    </TableBody>

                </Table>

            </div>

        );

    }
}