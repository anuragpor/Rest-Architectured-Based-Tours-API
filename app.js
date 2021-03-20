const express = require('express');


const morgan = require('morgan');
const app = express();
// console.log(app.get('env'));

// console.log(process.env);
const tourRoute = require('./../starter/routes/tourRoutes');
const userRoute = require('./../starter/routes/userRoutes');
//1) middlewares
// app.use(morgan('dev')); //(tiny) it will basically show the http request, path, statuscode, timeof compleation, size in bytes of response.
app.use(express.json()); // middleware(because it stands between request and response)

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); // adding new property to res object
  req.name = 'anurag porwal';
  next();
});

app.use(express.static(`${__dirname}/public`));

// 2 route handlers





//3) routes


app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);

module.exports = app;
// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side', app: 'Natours' });
// });

// app.post('\n', (req, res) => {
//   res.send('You can post to this input....');
// });

// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getTour);

// app.post('/api/v1/tours', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);
