import React from 'react';

import Paper from 'material-ui/Paper';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import Testmg from './insert.jsx';
import TestList from './list.jsx';
import AccountsUIWrapper from './login.jsx';

export default class Grid_content extends React.Component {
    
   
    _preventTextSelect(a, b, c, d, event) {
        event.preventDefault();
    };

    render() {


        return (

            <ResponsiveReactGridLayout
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                measureBeforeMount={true}
                onDrag={ this._preventTextSelect }
                onResize={ this._preventTextSelect }
                onResizeStop={ this._preventTextSelect }
                 
                >
                <Paper key="a" zDepth={1}  _grid={{ i: "a", x: 0, y: 0, w: 9, h: 4 }} style={{ overflow: 'auto' }}>
                    <TestList />
                </Paper>
                <Paper  key="b" _grid={{ i: "b", x: 11, y: 0, w: 2, h: 2 }} style={{ overflow: 'auto' }}>
                    <Testmg />
                </Paper>
                <Paper  key="c" _grid={{ i: "c", x: 0, y: 4, w: 3, h: 2 }} style={{ overflow: 'auto' }}>
                    <AccountsUIWrapper />
                </Paper>
            </ResponsiveReactGridLayout>

        );
    }
}