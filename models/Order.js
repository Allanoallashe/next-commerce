const { Schema, model, models } = require("mongoose");

const OrderSchema = new Schema({
  line_items: Object,
  name: String,
  email: String,
  city: String,
  postCode: String,
  streetAddress: String,
  country: String,
  paid: Boolean,
})
 
 export const Order = models?.Order || model('Order',OrderSchema);