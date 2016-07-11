import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { DataTable, TableHeader, Checkbox, IconButton } from 'react-mdl';

export default class list extends TrackerReact(Component) {
    constructor(props) {
        super(props);
    }

    work_data() {
        var works = work.find().fetch();
        this.setState({ works: works });
        return this.state.works;
    }

    componentWillMount() {
        this.setState({ works: work.find().fetch() });
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
        var works = this.state.works;
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
                    <TableHeader name="complete" cellFormatter={(complete, work) => <Checkbox ripple checked={complete} onChange={ this.togglework.bind(this, work) }/>} tooltip="ex3">Complete</TableHeader>
                    <TableHeader  name="CreateAT" cellFormatter={(CreateAT) => CreateAT.toLocaleDateString() } tooltip="ex4">Date Created</TableHeader>
                    <TableHeader name="command" cellFormatter={(Command, work) =>
                        <div>
                            <IconButton name="visibility" colored onClick={this.go_to_view_work.bind(this, work._id) }/>
                            <IconButton name="create" colored onClick={this.go_to_detail_work.bind(this, work._id) }/>
                            <IconButton name="delete" onClick={this.deletework.bind(this, work) } style={{ marginRight: '10px' }}/>
                        </div>
                    }  tooltip="ex5">Command</TableHeader>
                </DataTable>                                 
            </div>
        );

    }
}