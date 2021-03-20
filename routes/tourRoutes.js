
const express = require('express');
const router = express.Router(); // this is called mounting the routers.

const tourController = require('./../controllers/tourController');  // we can even use destruction

// router.param('id', tourController.checkID);

// router.route('/').get(tourController.getAllTours).post(tourController.checkBody,tourController.createTour);
router.route('/top-5-cheap').get(tourController.changeQueryString, tourController.getAllTours);
router.route('/').get(tourController.getAllTours).post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
  