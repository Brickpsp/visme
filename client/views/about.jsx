import React from 'react';
import ReactDOM from 'react-dom';
import { Card, CardTitle, CardActions } from 'react-mdl';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class about extends React.Component {
    componentDidMount() {
	
        
    this.view = Blaze.render(Template.adminlte,
     this.refs.container);
  }
  componentWillUnmount() {
    Blaze.remove(this.view);
  }
    
    render() {
        return <span ref="container" />;
    }
}
