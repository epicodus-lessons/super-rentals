import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),

  actions: {
    showMap(rental) {
      var container = this.$('.map-canvas')[0];
      var options = {
        center: this.get('map').center(rental.get('latitude'), rental.get('longitude')),
        zoom: 15
      };
      this.get('map').findMap(container, options);
    }
  }
});

// (45.521838, -122.675646)