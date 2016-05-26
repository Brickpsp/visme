import  { test } from '/server/collections/test.jsx';
Meteor.methods({
    adddata(data)
    {
          test.insert({
            test: data,
            complete: false,
            CreateAT: new Date()
        });
    }
    
});