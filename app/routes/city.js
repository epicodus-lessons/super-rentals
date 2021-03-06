import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('city', params.city_id);
  },

  actions: {
    saveCity(params) {
      var newCity = this.store.createRecord('city', params);
      newCity.save();
      this.transitionTo('index');
    },

    saveRental(params) {
      var newRental = this.store.createRecord('rental', params);
      var city = params.city;
      newRental.save().then(function() {
        city.get('rentals').addObject(newRental);
        city.save();
        this.transitionTo('city', params.city);
      }).catch(function(thingy) {
        console.log(thingy.errors);
      });
    },

    destroyCity(city) {
      var rental_deletions = city.get('rentals').map(function(rental) {
        return rental.destroyRecord();
      });
      Ember.RSVP.all(rental_deletions)
         .then(function() {
         return city.destroyRecord();
      })
      this.transitionTo('index');
    }
  }
});
