import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Card, CardTitle, CardActions, CardMenu, IconButton } from 'react-mdl';

import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import Insertwork from './grid_content_component_child/insert.jsx';
import ListWork from './grid_content_component_child/list.jsx';
import DetailWork from './grid_content_component_child/detail.jsx';
import AccountsUIWrapper from './grid_content_component_child/login.jsx';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class Grid_content extends TrackerReact(React.Component) {
    constructor(props) {
        super(props);
        if (typeof getFromLS('layouts', 'gridMain') === "undefined") {
            this.state = {
                layouts: JSON.parse(JSON.stringify({ "layouts": [{ "w": 8, "h": 6, "x": 0, "y": 0, "i": "0", "minW": 4, 'minH': 2, "moved": false, "static": false }, { "w": 4, "h": 2, "x": 9, "y": 3, "i": "1", 'minW': 3, 'minH': 2, "moved": false, "static": false }, { "w": 4, "h": 3, "x": 9, "y": 0, "i": "2", 'minW': 3, 'minH': 3, "moved": false, "static": false }] })),
                detailwork: false,
                id: {},
                full: false
            }
        }
        else {
            this.state = {
                layouts: JSON.parse(JSON.stringify({ "layouts": getFromLS('layouts', 'gridMain') })),
                detailwork: false,
                id: {},
                full: false

            };
        }
    }


    componentDidMount() {
        window.ALLOYEDITOR_BASEPATH = "/dist/alloy-editor/";
        CKEDITOR.basePath = "/dist/alloy-editor/";
    }

    _preventTextSelect(a, b, c, d, event) {
        event.preventDefault();
    };

    onLayoutChange(layouts) {
        saveToLS('layouts', layouts, 'gridMain');
        this.setState({ layouts: { "layouts": layouts } });
    }

    go_to_detail_work(_id, status) {
        this.setState({ listStatus: status });
        this.setState({ id: _id });
        this.setState({ detailwork: true });
    }

    go_to_list_work() {
        this.setState({ detailwork: false });
    }

    fullwindow(brandContent) {
        this.setState({ full: true });
        this.setState({ brandContent: brandContent });
    }

    defaultwindows(layout) {
        this.setState({ full: false });
    }

    render() {
        var contentlist = <ReactCSSTransitionGroup
            transitionName = "appear_list"
            transitionEnterTimeout = {600}
            transitionLeaveTimeout = {600}
            >
            {
                //(Meteor.user()) ?
                    <ReactCSSTransitionGroup
                        transitionName = "change_list"
                        transitionEnterTimeout = {600}
                        transitionLeaveTimeout = {600}
                        >
                        {
                            this.state.detailwork ?
                                <DetailWork  key="01" id={this.state.id} status={this.state.listStatus} callback={this.go_to_list_work.bind(this) }/>
                                :
                                <ListWork  key="02" callback={this.go_to_detail_work.bind(this) }/>
                        }
                    </ReactCSSTransitionGroup>
                    //:
                    //null
            }
        </ReactCSSTransitionGroup>;
        return (
            <div>
                {
                    this.state.full ?
                        <Card shadow={1} style={{ width: '100%', height: '100vh' }}>
                            <CardTitle className="mui-appbar-fullwindow">{this.state.brandContent}</CardTitle>
                            <CardMenu >
                                <IconButton onClick={this.defaultwindows.bind(this) } style={{ color: '#fff' }} name="tab" />
                            </CardMenu>
                            <CardActions border style={{ padding: '0px', overflow: 'auto' }}>
                                {(() => {
                                    switch (this.state.brandContent) {
                                        case "List Work":
                                            return contentlist;
                                        case "Add Work":
                                            return <div style={{ padding: '10px' }}><Insertwork /></div>;
                                        case "Login":
                                            return <div style={{ padding: '10px' }}><AccountsUIWrapper /></div>;
                                    }
                                })() }
                            </CardActions>
                        </Card>
                        :
                        <ResponsiveReactGridLayout
                            layouts={this.state.layouts}
                            onLayoutChange={this.onLayoutChange.bind(this) }
                            draggableHandle='div.mui-appbar'
                            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                            onDrag={ this._preventTextSelect }
                            onResize={ this._preventTextSelect }
                            onResizeStop={ this._preventTextSelect }
                            rowHeight={Math.floor(($(window).height() - 70) / 6) }
                            >

                            <Card shadow={1} key={'0'} data-grid={this.state.layouts.layouts[0] || { x: 0, y: 0, w: 8, h: 6, minW: 4, minH: 2 }} className='window'>
                                <CardTitle className="mui-appbar" >List Work</CardTitle>
                                <CardMenu >
                                    <IconButton onClick={this.fullwindow.bind(this, "List Work") } style={{ color: '#fff' }} name="crop_din" />
                                </CardMenu>
                                <CardActions border style={{ padding: '0px', border: '0px', overflow: 'auto' }}>
                                    {contentlist}
                                </CardActions>
                            </Card>

                            <Card shadow={1} key={'1'} data-grid={this.state.layouts.layouts[1] || { x: 8, y: 2, w: 4, h: 2, minW: 3, minH: 2 }} className='window'>
                                <CardTitle className="mui-appbar" >Add Work</CardTitle>
                                <CardMenu >
                                    <IconButton onClick={this.fullwindow.bind(this, "Add Work") } style={{ color: '#fff' }} name="crop_din" />
                                </CardMenu>
                                <CardActions border style={{ overflow: 'auto' }}>
                                    <Insertwork />
                                </CardActions>
                            </Card>

                            <Card shadow={1} key={'2'} data-grid={this.state.layouts.layouts[2] || { x: 8, y: 0, w: 4, h: 3, minW: 3, minH: 3 }}  className='window'>
                                <CardTitle className="mui-appbar" >Login</CardTitle>
                                <CardMenu >
                                    <IconButton onClick={this.fullwindow.bind(this, "Login") } style={{ color: '#fff' }} name="crop_din" />
                                </CardMenu>
                                <CardActions border style={{ overflow: 'auto' }}>
                                    <AccountsUIWrapper />
                                </CardActions>
                            </Card>

                        </ResponsiveReactGridLayout>
                }
            </div>
        );
    }
}


function getFromLS(key, container) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem(container)) || {};
        } catch (e) {/*Ignore*/ }
    }
    return ls[key];
}

function saveToLS(key, value, container) {
    if (global.localStorage) {
        global.localStorage.setItem(container, JSON.stringify({
            [key]: value
        }));
    }
}



