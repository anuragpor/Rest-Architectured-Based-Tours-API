const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');



const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {  // these are some option to deal with deprecation warning
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con => { // it gives us a promise which we have to take care using then method
  // console.log(con.connection);
  console.log("DB connection established");
});



// const testTour = new Tour({
//   name: 'The Park Campus 2', //Our validators will make sure of that no duplicate name occur
//   price: 200
// });

// testTour.save().then(doc => {  // it returns a promise which we handle using then and catch method
//   console.log(doc);
// }).catch(err => {
//   console.log("Some error read the error message", err);
// });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
     