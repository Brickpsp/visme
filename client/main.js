import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

if (Meteor.isClient)
{
    Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
}
