import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import CanvasComponent from './web_net_ani';
import footer from '/client/components/footer.jsx';
import {Layout, Flex, Fixed} from 'react-layout-pane';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './main.css';


export default class sidenav extends React.Component {

 constructor(props) {
    super(props);
    this.state = {open: false};
  }

  

 
       // className += " button"
         render() {
           handleToggle = () => this.setState({open: !this.state.open});
           var nav_icon = this.state.open ? "open" : "";
return (
  
<MuiThemeProvider muiTheme={getMuiTheme()}>
  <div className="site-sidenav-collapse md-sidenav-left md-whiteframe-z2">
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
        <div> Menu </div>
        </Fixed>
        </Layout>
      </Fixed>
      <Flex className="content">
        <ul className="docs-menu">
          <MenuItem style={{color: 'white'}} className="button">Menu Item</MenuItem>
         <MenuItem style={{color: 'white'}} className="button">Menu Item 2</MenuItem>
        </ul>
      </Flex>
      <Fixed>
        <footer className="sidenav-footer">
          <Layout type="column">
            <Flex>
              <div className="social-icon" >
               <Layout type="column">
                <Fixed>
                <a href="https://www.facebook.com/"><img src="./public/img/default/f.png"/></a>
                 </Fixed>
                  <Fixed>
                <a href="https://twitter.com/"><img src="./public/img/default/t.png"/></a>
                 </Fixed>
                  <Fixed>
                <a href="https://plus.google.com/"><img src="./public/img/default/g.png"/></a>
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
