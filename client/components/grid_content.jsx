import React from 'react';

import Paper from 'material-ui/Paper';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import Testmg from './insert.jsx';
import TestList from './list.jsx';
import AccountsUIWrapper from './login.jsx';
var mouseX = -1e9, mouseY = -1e9;

export default class Grid_content extends React.Component {
    constructor(props) {
        super(props);
       try {
        this.state = {layouts:JSON.parse(JSON.stringify(getFromLS('layouts')))};
       }
       catch(err)
       {
            this.state = {layouts:{}};
       }
    }

    _preventTextSelect(a, b, c, d, event) {
        event.preventDefault();

    };

    onLayoutChange(layouts) {
        saveToLS('layouts', layouts);
    }
    
    
    onDragStart(){
        document.addEventListener('mousemove', function (event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });
    //console.log(Math.hypot(0 - mouseX, 0 - mouseY));
    
    }

    render() {

        return (

            <ResponsiveReactGridLayout
                onLayoutChange={this.onLayoutChange.bind(this) }
                onDragStart={this.onDragStart.bind(this) }
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                onDrag={ this._preventTextSelect }
                onResize={ this._preventTextSelect }
                onResizeStop={ this._preventTextSelect }               
                >
                <Paper key="0" _grid={this.state.layouts[0] || { i: "a", x: 0, y: 0, w: 9, h: 4 }} style={{ overflow: 'auto' }}  zDepth={1}  >
                    <TestList />
                </Paper>
                <Paper  key="1"  _grid={this.state.layouts[1] || { i: "b", x: 11, y: 0, w: 2, h: 2 }} style={{ overflow: 'auto' }}>
                    <Testmg />
                </Paper>
                <Paper  key="2"  _grid={this.state.layouts[2] || { i: "c", x: 0, y: 4, w: 3, h: 2 }} style={{ overflow: 'auto' }}>
                    <AccountsUIWrapper />
                </Paper>
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