import React from 'react';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class admin extends React.Component {
  componentDidMount() {	        
    this.view = Blaze.render(Template.adminlte,
     this.refs.container);
  }
  componentWillUnmount() {
    Blaze.remove(this.view);
  }
    
    render() {
        return(
	    <div>
	   
	    <span ref="container" />
	</div>
);
    }
}
