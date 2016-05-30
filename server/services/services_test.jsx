import { test } from '/server/collections/test.jsx';
Meteor.methods({

    adddata(data) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        test.insert({
            test: data,
            complete: false,
            CreateAT: new Date(),
            user: Meteor.userId(),
        });
    },
    toggledata(data) {
        if (Meteor.userId() !== data.user) {
            throw new Meteor.Error('not-authorized');
        }
        test.update(data._id, {
            $set: { complete: !data.complete }
        });
    },
    deletedata(data) {
        if (Meteor.userId() !== data.user) {
            throw new Meteor.Error('not-authorized');
        }
        test.remove(data._id);
    }

});

Meteor.publish("allData", function () {
    return test.find();
});

Meteor.publish("userData", function () {
    return test.find({ user: this.userId });
});