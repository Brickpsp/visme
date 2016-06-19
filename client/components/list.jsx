import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentDel from 'material-ui/svg-icons/content/remove';

export default class list extends TrackerReact(Component) {
    test_data() {
        return test.find().fetch();
    }



    toggledata(data) {
         Meteor.call("toggledata", data, (error,data) =>{
            if(error)
            {
               Bert.alert('Please Login','danger','fixed-top', 'fa-frown-o' );
            }          
        });
        //console.log(data);
        //Meteor.call('toggledata', data);
    }

    deletedata(data) {
         Meteor.call("deletedata", data, (error,data) =>{
            if(error)
            {
               Bert.alert('Please Login','danger','fixed-top', 'fa-frown-o' );
            }          
        });
        //console.log(data);
        //Meteor.call('deletedata', data);
    }


    render() {
        var tes = this.test_data();



        return (
            <div>
                
                <Table>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Date</TableHeaderColumn>
                            <TableHeaderColumn>Command</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={false} >
                        {tes.map((row, index) => (
                            <TableRow key={index}  >
                                <TableRowColumn>{row.test}</TableRowColumn>
                                <TableRowColumn>
                                    <Checkbox
                                        onClick={this.toggledata.bind(this, row) }
                                        label={row.complete.toString() }
                                        checked={row.complete}
                                        />
                                </TableRowColumn>
                                <TableRowColumn>{row.CreateAT.toString() }</TableRowColumn>
                                <TableRowColumn>
                                    <FloatingActionButton mini={true} secondary={true} onClick={this.deletedata.bind(this, row) }>
                                        <ContentDel />
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