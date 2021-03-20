const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a name'], //also called as validator, required property with error is not present in
    unique: true,
    trim: true, //removes unnecessary white spaces
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a maxGroupSize'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    required: [true, 'A tour must have a Summary'],
    trim: true, // removes unnecessary white spaces
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description description'],
  },
  imageCover: { 
    // saving reference of the image instead of full image
    type: String,
    required: [true, 'A tour must have cover image'],
  },
  images: [String], // array of string
  createdAt: {
    type: Date, // is a js build in datatype
    default: Date.now(), //gives date in milisecond but in mongooe it converted to date format
    select: false // makes sure client will not get exposed to this property
  },
  startDates: [Date],
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
