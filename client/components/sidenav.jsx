import React from 'react';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var onClickOutside = require('react-onclickoutside');
import CanvasComponent from './sidenav_component_child/web_net_ani';
import {Layout, Flex, Fixed} from 'react-layout-pane';
import { Button } from 'react-mdl';


export class sidenav extends React.Component {
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
 <ReactCSSTransitionGroup               
                transitionName="sidenav-begin"
                transitionEnterTimeout={800}
                transitionLeaveTimeout={800}
                transitionAppearTimeout={800}
                transitionAppear={true}
                >
      
        <div className="site-sidenav-collapse md-sidenav-left md-whiteframe-z2 helvetica" style={this.state.open_drawer}>
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
              <ReactCSSTransitionGroup  transitionName="docs-menu" transitionEnterTimeout={500} transitionLeaveTimeout={200}>
                  
                {
                  this.state.open ?
                  <ul className="docs-menu">
                    <li><Button className="button" ripple href="/">HOME</Button></li>               
                    <li><Button className="button" ripple href="/about">About</Button></li>                  
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
      </ReactCSSTransitionGroup>
    );
  }
handleClickOutside(event) {
       this.setState({ open: false });
       this.setState({ open_drawer: {} });
    }
}

export default onClickOutside(sidenav);