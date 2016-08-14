import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { DataTable, TableHeader, Checkbox, IconButton } from 'react-mdl';

export default class list extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = { works: work.find({}, {sort: {date_created: -1}}).fetch() };
    }

    works_data() {
        var works = work.find({}, {sort: {date_created: -1}}).fetch();
        return works;
    }



    togglework(data) {        
        if (Meteor.user()) {
            if (Meteor.userId() == data.user) {
                var public_work = !data.public_work;
                var title = data.title;
                Meteor.call("togglework", data, (error) => {
                    if (error) {
                        Bert.alert('Please Login', 'danger', 'fixed-top', 'fa-frown-o');
                    }
                    else {

                        if (public_work) {
                            Bert.alert('Work \"' + title + '\" is public', 'info', 'growl-top-right');
                        }
                        else Bert.alert('Work \"' + title + '\" is private', 'info', 'growl-top-right');
                    }
                });
            }
            else {
                Bert.alert('You not owner of this work', 'danger', 'fixed-top', 'fa-frown-o');
            }
        }
        else {
            Bert.alert('Guest not allow edit', 'danger', 'fixed-top', 'fa-frown-o');
        }

    }

    deletework(data) {
        var title = data.title;
        Meteor.call("deletework", data, (error) => {
            if (error) {
                Bert.alert('Please Login', 'danger', 'fixed-top', 'fa-frown-o');
            }
            else Bert.alert('You deleted work \"' + title + '\"', 'danger', 'growl-top-right');
        });
    }

    go_to_detail_work(id) {
        this.props.callback(id, 'edit');
    }

    go_to_view_work(id) {
        this.props.callback(id, 'view');
    }

    render() {
        //console.log(work.find().fetch());
        var works = this.works_data();
        return (
            <div>
                <DataTable
                    shadow={0}
                    rows={works}
                    rowKeyColumn="_id"
                    style={{ width: '100%', flexShrink: '0', boxShadow: 'none' }}
                    >
                    <TableHeader name="title" tooltip="ex1">Title</TableHeader>
                    <TableHeader  name="description" tooltip="ex2">Description</TableHeader>
                    <TableHeader name="public_work" cellFormatter={(public_work, work) => <Checkbox ripple checked={public_work} onChange={ this.togglework.bind(this, work) }/>} tooltip="ex3">Public</TableHeader>
                    <TableHeader  name="CreateAT" cellFormatter={(CreateAT) => CreateAT.toLocaleDateString() } tooltip="ex4">Date Created</TableHeader>
                    <TableHeader name="command" cellFormatter={(Command, work) =>
                        <div>
                            <IconButton name="visibility" colored onClick={this.go_to_view_work.bind(this, work._id) }/>
                            {
                                (Meteor.userId() == work.user) ?
                                    <IconButton name="create" colored onClick={this.go_to_detail_work.bind(this, work._id) }/>
                                    :
                                    null
                            }
                            {
                                (Meteor.userId() == work.user) ?
                                    <IconButton name="delete" onClick={this.deletework.bind(this, work) } style={{ marginRight: '10px' }}/>
                                    :
                                    null
                            }
                        </div>
                    }  tooltip="ex5">Command</TableHeader>
                </DataTable>
            </div>
        );

    }
}