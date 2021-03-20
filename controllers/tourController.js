const express = require('express');
const Tour = require('./../models/tourModel');
const fs = require('fs');
const APIFeatures = require('./../utlis/ApiFeatures');
/*
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );
 console.log('432423');
exports.checkID = (req, res, next, val) => {  // instead of making a function to check valid id it is a good practice to mantain a tunnel like sysytem of middle ware 
    
    // console.log('132323');
    console.log(`Tour id is: ${val}`);

    if (req.params.id * 1 > tours.length) {
      return res.status(404).json({  // here only the cycle ends otherwise it will go to next
        status: 'fail',
        message: 'Invalid ID',
      });
    }
    next();
}

exports.checkBody = (req, res, next) => {
  // console.log(req.body, "afigeg\n");
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status : 'fail',
      message: 'missing name or price or both'
    });
  }
  // conole.log(req)
  next();
}
*/
exports.changeQueryString = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = 'price,-ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage,summary,description';
  console.log(req.query);
  next();
}

exports.getAllTours = async (req, res) => {
  try {
    // THIS WE MADE IN FORM OF CLASS AND STORE IN SEPARATE MODULE
    // const queryObj = { ...req.query };  // in javascript if we set a object to a varibale then it will be a reference to that object so here we making a hardcore copy first
    // // First we BUILDING a query ie not getting the result out of it
    // //1A Filtering
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach(ele => delete queryObj[ele]);
    // // console.log(queryObj, req.query);  now we have all query with excludedFields deleted
    
    // //1B Advance Filtering
    // //{difficulty: 'easy', duration: { $gte: 5 } }  command in mongoDB
    // //{ difficulty: 'easy', duration: { gte: '5' } }
    
    // console.log("query", req.query);
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, match => `$${match}`);  // replacing all the occurances of `lt|lte|gt|' using g(to all) to $ times query
    
    // // If we are building an api then we should also build the documentation of it for the user
    // // console.log(JSON.parse(queryStr));
    // const query = Tour.find(JSON.parse(queryStr)); //M-1 to get our required documents

    // // const query = Tour.find().where('duration').equals(5).where('difficulty').equals('easy');  // M-2 to find our required document instead of equals we have lte gt, lt
    
    //2 Sorting
    // if (req.query.sort) {
    //   let sortBy = req.query.sort.split(',').join(' ');   // to add second parameter for time we simply need .sort(para1 para2 para3) with spaces which is what we doing first by spliting then joining
    //   // console.log(sortBy);  to sort in decreasing order use -sign befire the parameter
    //   query.sort(sortBy);   // mongooes will sort by sorting parameter which is nothing but sort itself
    // } else {
    //   query.sort('-createdAt');
    // }

    // 3 Projecting
    // if (req.query.fields) {
    //   let fields = req.query.fields.split(',').join(' ');
    //   console.log(fields);
    //   query.select(fields); // eg query.select('name duration price');
    // } else {
    //   query.select('-__v');  // with - we can exclude that field
    // }

    // Pagination
    // const page = req.query.page*1 || 1;  // with || we can set the default page to 1
    // const limit = req.query.limit * 1 || 1;
    // const skip = (page - 1) * limit;

    // query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const totalCnt = await Tour.countDocuments();
    //   console.log(page, totalCnt);
    //   if (skip >= totalCnt) {
    //     throw new Error('This page does not exits')
    //   }
    // }

    // EXECUTE THE QUERY

    const query = new APIFeatures(Tour.find(), req.query).filter().project().sort().page();
    const tours = await query.query;
    // SEND THE RESPONSE
    res.status(200).json({
      status: 'success',
      // requestTime: req.requestTime,
      // name: req.name,
      results: tours.length,
      data: {
        tours, // tours: tours
      },
    });
  } catch(err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
    } 
  };
  
  exports.getTour = async (req, res) => {
    // we use : to declare variable in routes
    // to define optional parameter we can have /:id/:x?/:y? here x and y will become optional parameter.
    try {
      const tour = await Tour.findById(req.params.id);  // short hand to Tour.findOne({_id : req.params.id})
      res.status(200).json({
        status: 'success',
        data: {
          tour
        },
      });
    } catch(err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
      }
    
    /*
    console.log(req.params);
    const id = req.params.id * 1; // by multiplying with a number string changes to number in javascript
    const tour = tours.find((el) => el.id === id); // find method will iterate over the tours array to find the element with required id.
    // if (id > tours.length) {
  
    if (tour)
      res.status(200).json({
        status: 'success',
        data: {
          tour
        },
      });
    */
  };
  
  exports.createTour = async (req, res) => {
    // // console.log(req.body);
    // const newId = tours[tours.length - 1].id + 1;
    // const newTour = Object.assign({ id: newId }, req.body); // object.assign will combine two objects and returns a new object.
  
    // tours.push(newTour);
  
    // fs.writeFile(
    //   `${__dirname}/dev-data/data/tours-simple.json`,
    //   JSON.stringify(tours),
    //   (err) => {
    //     res.status(201).json({
    //       status: 'success',
    //       data: {
    //         tour: newTour,
    //       },
    //     });
    //   }
    // );

    // const newTour = new Tour({});  using old technique we can do even better
    // newTour.save();
    try {
      // every thing in req.body which is not in our scheme is simply ignored
      console.log(req.body);
      const newTour = await Tour.create(req.body);  // if we have a rejeted promise then it will go to catch block
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
          
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: 'failed',
        // message: err
        message: 'Invalid data sent' //dont do it like this in real production will later see in section of error handling
      });
    }
  };
  
exports.updateTour = async (req, res) => {
  try {
    tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,  // because we want updated document to be retured thats why new property should be true
      runvalidators: true // it will check the body to be updated wheter it matches with the schema like datatype 
    });
      res.status(200).json({
        status: 'success',
        data: {
          tour // when property name has same name as key value
        },
      });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err
    })
  }
  };
  
exports.deleteTour = async (req, res) => {
  // console.log(req.params.id);
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      // code 204 for delete
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err
    });
    }
  };