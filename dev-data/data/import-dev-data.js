const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {  // these are some option to deal with deprecation warning
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con => { // it gives us a promise which we have to take care using then method
  // console.log(con.connection);
  console.log("DB connection established");
});

// read json files

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));
console.log(process.argv);
// Import data in database
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('data successfully loaded');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

// Delete all data from data base
const deleteData = async () => {
    try {
        await Tour.deleteMany(); // deletes all data from data base
        console.log('data successfully deleted');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}
if (process.argv[2] === '--import') { // process.argv is basically a array which contains the node command, location of current directory, our defined string like import or delete
    console.log('1');
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
console.log("sfaf", process.argv);