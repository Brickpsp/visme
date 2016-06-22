import { work } from '/server/collections/work.jsx';
Meteor.methods({

    addwork(title, description) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        work.insert({
            title: title,
            description: description,
            detail:'',            
            complete: false,
            CreateAT: new Date(),
            user: Meteor.userId(),
        });
    },
    detailwork(data, text) {
        if (Meteor.userId() !== data.user) {
            throw new Meteor.Error('not-authorized');
        }
       work.update(data._id, {
            $set: { detail: text }
        });
    },
    togglework(data) {
        if (Meteor.userId() !== data.user) {
            throw new Meteor.Error('not-authorized');
        }
        work.update(data._id, {
            $set: { complete: !data.complete }
        });
    },
    deletework(data) {
        if (Meteor.userId() !== data.user) {
            throw new Meteor.Error('not-authorized');
        }
        work.remove(data._id);
    }

});

Meteor.publish("allData", function () {
    return work.find();
});

Meteor.publish("userData", function () {
    return work.find({ user: this.userId });
});