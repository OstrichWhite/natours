const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    // console.log(req.query);

    const queryObject = { ...req.query }; //variable is a reference, if it is modified a real object is modified so that we use obj destructuring and create a new object and save it in queryObject

    //req.query filter here it just delete the query object data from the query object which are mentioned
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObject[el]);

    //Advance filter for convert query string to mongoose query with operators eg. { duration: { gte: '5' }, difficulty: 'easy' } ---> { duration: { $gte: '5' }, difficulty: 'easy' } ?operators are gte,lte,gt,lt by using regex
    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gte|lte|gt|lt)\b/g,
      (match) => `$${match}`
    );
    // console.log(JSON.parse(queryString));

    //Query Build Here
    // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');
    // const tours = await Tour.find({ duration: 5, difficulty: 'easy' });
    // const tours = await Tour.find(queryObject);
    let query = Tour.find(JSON.parse(queryString));

    // Sort Query Here mongoose sort is sort('price ratingsAverage etc') now in url we split that by ',' so we can replace this comma here
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' '); // console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt'); //defaulet ordering / sorting
    }

    // Field Limiting  / select('name duration price') --> its called projecting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //Query Execute Here
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours, //tours:tours Obj //ES6 consider if obj has single value then key and value are the same name
      },
    });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: 'No tours found' });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id); //Tour.findOne({ _id: req.params.id });
    if (!tour) {
      return res.status(404).json({ status: 'fail', message: 'No tour found' });
    }
    res.status(200).json({ status: 'success', data: { tour } });
  } catch (error) {
    res
      .status(404)
      .json({ status: 'fail', message: 'Have Some Error In Server' });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ status: 'success', data: { tour: newTour } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: 'Invalid Data Sent!' });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).exec();
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: 'No tour found' });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: 'No tour found' });
  }
};
