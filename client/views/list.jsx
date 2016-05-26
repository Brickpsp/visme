import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import AppBar from 'material-ui/AppBar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


export default class list extends TrackerReact(Component) {

    test_data() {
        return test.find().fetch();
    }


    render() {
        var tes = this.test_data();
        var data_test = [];
        for (var i = 0; i < tes.length; i++) {
            data_test.push(
                <TableRow key={tes[i]._id} >
                <TableRowColumn>{tes[i].test}</TableRowColumn>
                <TableRowColumn>{tes[i].complete.toString() }</TableRowColumn>
                <TableRowColumn>{tes[i].CreateAT.toString() }</TableRowColumn>
 </TableRow>
            );
        }


        return (
            <div>
                <AppBar title="Add" iconElementLeft={<a/>}/>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                       {data_test}
                    </TableBody>
                </Table>


            </div>

        );

    }
}