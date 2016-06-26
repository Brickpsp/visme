import React from 'react';
import ReactDOM from 'react-dom';
import { Card, CardTitle, CardActions } from 'react-mdl';

import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import Insertwork from './grid_content_component_child/insert.jsx';
import ListWork from './grid_content_component_child/list.jsx';
import DetailWork from './grid_content_component_child/detail.jsx';
import AccountsUIWrapper from './grid_content_component_child/login.jsx';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class Grid_content extends React.Component {
    constructor(props) {
        super(props);
        this.state = { detailwork: false };
        this.state = { id: {} };
        try {
            this.state = { layouts: JSON.parse(JSON.stringify(getFromLS('layouts'))) };
        }
        catch (err) {
            this.state = { layouts: {} };
        }
    }

    _preventTextSelect(a, b, c, d, event) {
        event.preventDefault();
    };

    onLayoutChange(layouts) {
        saveToLS('layouts', layouts);
    }

    go_to_detail_work(_id) {
        this.setState({ id: _id });
        this.setState({ detailwork: true });
    }

    go_to_list_work() {

        this.setState({ detailwork: false });
    }

    render() {
        return (
            <ResponsiveReactGridLayout
                onLayoutChange={this.onLayoutChange.bind(this) }
                draggableHandle='div.mui-appbar'
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                onDrag={ this._preventTextSelect }
                onResize={ this._preventTextSelect }
                onResizeStop={ this._preventTextSelect }
                >
                <Card shadow={1} key="0" _grid={this.state.layouts[0] || { i: "a", x: 0, y: 0, w: 8, h: 6, minW: 6, minH: 2 }} style={{ overflow: 'hidden' }}>
                    <CardTitle className="mui-appbar" >List Work</CardTitle>
                    <CardActions border style={{ padding: '0px', border: '0px',  overflow: 'auto'}}>
                        <ReactCSSTransitionGroup
                            transitionName = "change_list"
                            transitionEnterTimeout = {600}
                            transitionLeaveTimeout = {600}>
                            {
                                this.state.detailwork ?
                                    <DetailWork  key="01"  id={this.state.id} callback={this.go_to_list_work.bind(this) }/>
                                    :
                                    <ListWork  key="02" callback={this.go_to_detail_work.bind(this) }/>
                            }
                        </ReactCSSTransitionGroup>
                    </CardActions>
                </Card>
                <Card shadow={1} key="1" _grid={this.state.layouts[1] || { i: "b", x: 8, y: 2, w: 4, h: 2, minW: 3, minH: 2 }} style={{ overflow: 'hidden' }}>
                    <CardTitle className="mui-appbar" >Add Work</CardTitle>
                    <CardActions border>
                        <Insertwork />
                    </CardActions>
                </Card>
                <Card shadow={1} key="2" _grid={this.state.layouts[2] || { i: "c", x: 8, y: 0, w: 4, h: 3, minW: 3, minH: 2 }} style={{ overflow: 'hidden' }}>
                    <CardTitle className="mui-appbar" >Login</CardTitle>
                    <CardActions border>
                        <AccountsUIWrapper />
                    </CardActions>
                </Card>
            </ResponsiveReactGridLayout>

        );
    }
}


function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
        } catch (e) {/*Ignore*/ }
    }
    return ls[key];
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem('rgl-8', JSON.stringify({
            [key]: value
        }));
    }
}