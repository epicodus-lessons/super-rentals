import Ember from 'ember';
import FirebaseAdapter from 'emberfire/adapters/firebase';

const { inject } = Ember;

export default FirebaseAdapter.extend({
  firebase: inject.service(),
  updateRecord: function(store, type, snapshot) {
    snapshot.record.eachAttribute(function(attribute) {
      if (snapshot.record.get(attribute) === undefined) {
        snapshot.record.set(attribute, null);
      }
    });
    return this._super(store, type, snapshot);
  }
});
