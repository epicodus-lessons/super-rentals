import DS from 'ember-data';

export default DS.FirebaseSerializer.extend({
  serializeAttribute: function(snapshot, json, key, attribute) {
    let attributeKey = this.keyForAttribute(attribute.name);
    if (typeof json[attributeKey] === 'undefined') {
      json[attributeKey] = null;
    }
    this._super(snapshot, json, key, attribute);
  }
});
