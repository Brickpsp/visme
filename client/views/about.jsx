import React from 'react';
import { Card, CardTitle, CardActions } from 'react-mdl';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class about extends React.Component {
    render() {
        return (
             <ReactCSSTransitionGroup
                className="animation-change-view"
                transitionName="animation-change-view"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                transitionAppearTimeout={800}
                transitionAppear={true}
                >
            <div>
                <Card shadow={1} className='about-head'>
                    <CardTitle expand />
                    <CardActions className='about-action'>
                        <span className='about-text'>
                            thhoang99 @gmail.com
                            <br />
                            Use React and Meteor
                        </span>
                    </CardActions>
                </Card>
            </div>
             </ReactCSSTransitionGroup>
        );
    }
}