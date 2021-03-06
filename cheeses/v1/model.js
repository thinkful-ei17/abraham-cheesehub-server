const mongoose = require('mongoose');

const cheeseSchema= new mongoose.Schema({
  'name':{type: String, required: true}
});

cheeseSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name
  };
};


const Cheese = mongoose.model('Cheese', cheeseSchema);

module.exports = {Cheese};