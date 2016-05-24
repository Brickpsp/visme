import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-transition-group';
import MenuItem from 'material-ui/MenuItem';
import CanvasComponent from './web_net_ani';
import footer from '/client/components/footer.jsx';
import {Layout, Flex, Fixed} from 'react-layout-pane';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import './main.css';

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
    handleToggle = () => 
    {
      this.setState({ open: !this.state.open });
      if(!this.state.open)
      {
       this.setState({open_drawer : 
      {
        width:'320px',
      }
       });
      
      }
      else this.setState({open_drawer : {} });
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
                <ReactCSSTransitionGroup transitionName="text_transparency">
                {
                  
		         this.state.open ? 
           <div className="menu_text" > Menu </div>
            : 
            null
           
        
        }
                  </ReactCSSTransitionGroup>
                </Fixed>
              </Layout>
            </Fixed>
            <Flex className="content">
              <ul className="docs-menu">
                <MenuItem >Menu Item</MenuItem>
                <MenuItem >Menu Item 2</MenuItem>
              </ul>
            </Flex>
            <Fixed>
              <footer className="sidenav-footer">
                <Layout type="column">
                  <Flex>
                    <div className="social-icon" >
                      <Layout type="column">
                        <Fixed>
                          <a href="https://www.facebook.com/"><img src="/img/default/f.png"/></a>
                        </Fixed>
                        <Fixed>
                          <a href="https://twitter.com/"><img src="/img/default/t.png"/></a>
                        </Fixed>
                        <Fixed>
                          <a href="https://plus.google.com/"><img src="/img/default/g.png"/></a>
                        </Fixed>
                      </Layout>
                    </div>
                  </Flex>
                  <Fixed>
                    <div>This is footer</div>
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
