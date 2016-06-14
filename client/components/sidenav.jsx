import React from 'react';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import MenuItem from 'material-ui/MenuItem';
import CanvasComponent from './web_net_ani';
import {Layout, Flex, Fixed} from 'react-layout-pane';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import '/public/css/sidenav.css';

const darkMuiTheme = getMuiTheme(darkBaseTheme);

export default class sidenav extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
    this.state = { open_drawer: {} };
  }

  // className += " button"
  render() {
    var open_drawer = {};
    handleToggle = () => {
      this.setState({ open: !this.state.open });
      if (!this.state.open) {
        this.setState({
          open_drawer:
          {
            width: '320px',
          }
        });

      }
      else this.setState({ open_drawer: {} });
    }
    var nav_icon = this.state.open ? "open" : "";


    return (

      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div className="site-sidenav-collapse md-sidenav-left md-whiteframe-z2" style={this.state.open_drawer}>
          <CanvasComponent/>
          <Layout type="column">

            <Fixed className="nav-header">
              <Layout type="row" className="docs-logotype md-heading">
                <Fixed>
                  <div id="nav-icon2" className = {nav_icon} onClick={ handleToggle}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </Fixed>
                <Flex>
                </Flex>
                <Fixed>
                  <ReactCSSTransitionGroup  transitionName="text_transparency" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {
                      this.state.open ?
                        <div className="menu-heading" > Menu </div>
                        :
                        null
                    }
                  </ReactCSSTransitionGroup>
                </Fixed>
              </Layout>
            </Fixed>
            <Flex className="content">
              <ReactCSSTransitionGroup  transitionName="docs-menu" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                  
                {
                  this.state.open ?
                  <ul className="docs-menu">
                    <li><MenuItem className="button" href="/">Menu Item</MenuItem></li>               
                    <li><MenuItem className="button" href="/a">Menu Item 2</MenuItem></li>
                     <li><MenuItem className="button" href="/b">Menu Item 3</MenuItem></li>
                      </ul>
                    :
                    null
                }
             </ReactCSSTransitionGroup>
            </Flex>
            <Fixed>
              <footer className="sidenav-footer">
                <Layout type="column">
                  <Flex>
                   
                      <Layout type="column" className="social-icon">
                        <Fixed style={{height:'30px'}}>
                          <a href="https://www.facebook.com/"><img src="/img/default/f.png"/></a>
                        </Fixed>
                        <Fixed style={{height:'30px'}}>
                          <a href="https://twitter.com/"><img src="/img/default/t.png"/></a>
                        </Fixed>
                        <Fixed style={{height:'30px'}}>
                          <a href="https://plus.google.com/"><img src="/img/default/g.png"/></a>
                        </Fixed>
                      </Layout>
                   
                  </Flex>
                  <Fixed>
                   <ReactCSSTransitionGroup  transitionName="footer_hide" transitionEnterTimeout={200} transitionLeaveTimeout={500}>
              
                   {
                      this.state.open ?
                        <div>This is footer</div>
                        :
                        null
                    }
                    </ReactCSSTransitionGroup>
                  </Fixed>
                </Layout>
              </footer>
            </Fixed>
          </Layout>

        </div>
      </MuiThemeProvider>
    );
  }

}
