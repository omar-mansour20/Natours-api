const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

// Schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 10 characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc when creating NEW document
          return val < this.price;
        },
        // VALUE = val (monogose)
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  // allows virtual properties to be shown in the output(json,object)
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// indexing
tourSchema.index({ price: 1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });
// virtual property -> a filed that is not stored in the DB, but calced using another value
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// virtual populate -> allow the parent(tour) to access the child(review)
// not stored in DB
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour', // acts as a foreign key
  localField: '_id', // acts as a primary key
  // they both have the same value
  // in review,the field name is 'tour'
  // in tour, the field name is '_id'
});

// Document Middleware runs only before .save(), .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

tourSchema.pre('save', function (next) {
  console.log('Document is being saved');
  next();
});

// Populating -> showing the refrenced users when quering the tours
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: 'name',
  });
  next();
});

tourSchema.post('save', function (doc, next) {
  // console.log(doc);
  next();
});

// Query Middleware reuns only before .find()
tourSchema.pre(/^find/, function (next) {
  // /^find/ --> regex that means all the queries that start with find (findOne,...)
  this.find({ secretTour: { $ne: true } }); // chain the queries
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  // console.log(docs);
  next();
});

// Aggregation Middleware reuns only before any aggregation
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

//   next();
// });

// Model
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
