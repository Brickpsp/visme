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
                showWindows: [true, true, true],
                id: {},
            }
        }
        else {
            this.state = {
                layouts: JSON.parse(JSON.stringify({ "layouts": getFromLS('layouts', 'gridMain') })),
                detailwork: false,
                showWindows: [true, true, true],
                id: {},

            };
        }
    }

 

    _preventTextSelect(a, b, c, d, event) {
        event.preventDefault();
    };

    onLayoutChange(layouts) {
        saveToLS('layouts', layouts, 'gridMain');
        this.setState({ layouts: { "layouts": layouts } });
    }

    go_to_detail_work(_id, status) {
        this.setState({ listStatus : status});
        this.setState({ id: _id });
        this.setState({ detailwork: true });
    }

    go_to_list_work() {
        this.setState({ detailwork: false });
    }


    fullwindow(layout) {
        var layouts = this.state.layouts;
        saveToLS('layout', layout, 'restore');
        layout.x = 0;
        layout.y = 0;
        layout.w = 12;
        layout.h = 6;
        layout.static = true;
        layouts.layouts[parseInt(layout.i)] = layout;
        var showWindows = this.state.showWindows;
        for (var i = 0; i < layouts.layouts.length; i++) {
            if (parseInt(layout.i) != i) {
                showWindows[i] = false;
            }
        }
        this.setState({ showWindows: showWindows });
        this.setState({ layouts: layouts });
    }

    defaultwindows(layout) {
        var restore = getFromLS('layout', 'restore');
        //console.log(getFromLS('layout','restore'));
        var layouts = this.state.layouts;
        layouts.layouts[parseInt(layout.i)].w = restore.w;
        layouts.layouts[parseInt(layout.i)].h = restore.h;
        layouts.layouts[parseInt(layout.i)].x = restore.x;
        layouts.layouts[parseInt(layout.i)].y = restore.y;
        layout.static = false;
        this.setState({ showWindows: [true, true, true] });
        this.setState({ layouts: layouts });
    }

    render() {

        return (
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
                {
                    this.state.showWindows[0] ?
                        <Card shadow={1} key={'0'} _grid={this.state.layouts.layouts[0] || { x: 0, y: 0, w: 8, h: 6, minW: 4, minH: 2 }} className='window'>
                            <CardTitle className="mui-appbar" >List Work</CardTitle>
                            <CardMenu >
                                {
                                    this.state.showWindows[1] ?
                                        <IconButton onClick={this.fullwindow.bind(this, this.state.layouts.layouts[0]) } style={{ color: '#fff' }} name="crop_din" />
                                        :
                                        <IconButton onClick={this.defaultwindows.bind(this, this.state.layouts.layouts[0]) } style={{ color: '#fff' }} name="tab" />
                                }
                            </CardMenu>
                            <CardActions border style={{ padding: '0px', border: '0px', overflow: 'auto' }}>
                            <ReactCSSTransitionGroup
                                            transitionName = "appear_list"
                                            transitionEnterTimeout = {600}
                                            transitionLeaveTimeout = {600}                                           
                                            >                                           
                                {
                                    (Meteor.user()) ?
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
                                        :
                                        null
                                }                               
                                 </ReactCSSTransitionGroup>
                               
                            </CardActions>

                        </Card>
                        :
                        <div  key={'0'}  style={{ display: 'none' }}/>
                }
                {
                    this.state.showWindows[1] ?
                        <Card shadow={1} key={'1'} _grid={this.state.layouts.layouts[1] || { x: 8, y: 2, w: 4, h: 2, minW: 3, minH: 2 }} className='window'>
                            <CardTitle className="mui-appbar" >Add Work</CardTitle>
                            <CardMenu >
                                {
                                    this.state.showWindows[2] ?
                                        <IconButton onClick={this.fullwindow.bind(this, this.state.layouts.layouts[1]) } style={{ color: '#fff' }} name="crop_din" />
                                        :
                                        <IconButton onClick={this.defaultwindows.bind(this, this.state.layouts.layouts[1]) } style={{ color: '#fff' }} name="tab" />
                                }
                            </CardMenu>
                            <CardActions border style={{overflow: 'auto' }}>
                                <Insertwork />
                            </CardActions>
                        </Card>
                        :
                        <div  key={'1'} style={{ display: 'none' }}/>
                }
                {
                    this.state.showWindows[2] ?
                        <Card shadow={1} key={'2'} _grid={this.state.layouts.layouts[2] || { x: 8, y: 0, w: 4, h: 3, minW: 3, minH: 3 }}  className='window'>
                            <CardTitle className="mui-appbar" >Login</CardTitle>
                            <CardMenu >
                                {
                                    this.state.showWindows[0] ?
                                        <IconButton onClick={this.fullwindow.bind(this, this.state.layouts.layouts[2]) } style={{ color: '#fff' }} name="crop_din" />
                                        :
                                        <IconButton onClick={this.defaultwindows.bind(this, this.state.layouts.layouts[2]) } style={{ color: '#fff' }} name="tab" />
                                }
                            </CardMenu>
                            <CardActions border style={{overflow: 'auto' }}>
                                <AccountsUIWrapper />
                            </CardActions>
                        </Card>
                        :
                        <div  key={'2'} style={{ display: 'none' }}/>
                }

            </ResponsiveReactGridLayout>
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

