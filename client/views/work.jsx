import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import GridCnt from '/client/components/grid_content.jsx';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


work = new Mongo.Collection('work');

export default class Mydata extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        this.state = {
            subscription: {
                work: Meteor.subscribe("userData"),
            },
        }

    }

    componentWillUnmount() {
        this.state.subscription.work.stop();
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                className="animation-change-view"
                transitionName="animation-change-view"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                transitionAppearTimeout={500}
                transitionAppear={true}
                >
                <GridCnt key='G'/>
            </ReactCSSTransitionGroup>
        );
    }
}