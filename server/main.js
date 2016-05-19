import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // if there are no test available create sample data
  if (test.find().count() === 0) {

    // create sample test
    var sampletest = [
      {
        question: 'Is Meteor awesome?',
        choices: [
          { text: 'Of course!', votes: 0 },
          { text: 'Eh', votes: 0 },
          { text: 'No. I like plain JS', votes: 0 }
        ]
      },
      {
        question: 'Is CSS3 Flexbox the greatest thing since array_slice(bread)?',
        choices: [
          { text: '100% yes', votes: 0 },
          { text: '200% yes', votes: 0 },
          { text: '300% yes', votes: 0 }
        ]
      }
    ];

    // loop over each sample poll and insert into database
    _.each(sampletest, function(poll) {
      test.insert(poll);
    });

  }  
});
