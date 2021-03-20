# Rest-Architectured-Based-Tours-API
This project is self initiated project purely out of interest in NodeJS and other tec.

This API is based on Rest architecture which provides the user to perform all CRUD operations on
the tours database based on MongoDB using the mongoose library. The database includes info like the name of the
tour, price, average rating, etc. Tech: Node.Js, Express, MongoDB, Mongoose

Database Schema for Tour Models: models/tour.js
This application has the following features 
Filter - Filter the data based on the input provided. Lookup the entries only for the ones that are needed
Sort - Sort the data based on the field provided. This is designed to intake multiple sorting fields.
Pagination - paginate the application and retrieve the page number we want. By default, the limit is 1 page
Field - retrieve the selective  fields if needed based on the input
Limit - limits the entries required to visualize a more user compatible output

The following CRUD operations and API endpoints are part of the application:
GET
127.0.0.1:3000/api/v1/tours?limit=3&fields=name, price, difficulty
{
    "status": "success",
    "results": 3,
    "data": {
        "tours": [
            {
                "_id": "6053c01c1e25f54dfcba3f3e",
                "name": "The Sea Explorer 3",
                "difficulty": "medium",
                "price": 497
            },
            {
                "_id": "605105b223f3116324f7fd65",
                "name": "The Sea Explorer",
                "difficulty": "medium",
                "price": 497
            },
            {
                "_id": "605105b223f3116324f7fd64",
                "name": "The Forest Hiker",
                "difficulty": "easy",
                "price": 397
            }
        ]
    }
}


127.0.0.1:3000/api/v1/tours?page=1&limit=5&sort=price&fields=name, price
{
    "status": "success",
    "results": 5,
    "data": {
        "tours": [
            {
                "_id": "605105b223f3116324f7fd64",
                "name": "The Forest Hiker",
                "price": 397
            },
            {
                "_id": "6053c01c1e25f54dfcba3f3e",
                "name": "The Sea Explorer 3",
                "price": 497
            },
            {
                "_id": "605105b223f3116324f7fd65",
                "name": "The Sea Explorer",
                "price": 497
            },
            {
                "_id": "605105b223f3116324f7fd66",
                "name": "The Snow Adventurer",
                "price": 997
            },
            {
                "_id": "605105b223f3116324f7fd67",
                "name": "The City Wanderer",
                "price": 1197
            }
        ]
    }
}


POST
127.0.0.1:3000/api/v1/tours
{
    "id": 8,
    "name": "The Northern Lights 3",
    "duration": 3,
    "maxGroupSize": 12,
    "difficulty": "easy",
    "ratingsAverage": 4.9,
    "ratingsQuantity": 33,
    "price": 1497,
    "summary": "Enjoy the Northern Lights in one of the best places in the world",
    "description": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum!\nDolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, exercitation ullamco laboris nisi ut aliquip. Lorem ipsum dolor sit amet, consectetur adipisicing elit!",
    "imageCover": "tour-9-cover.jpg",
    "images": ["tour-9-1.jpg", "tour-9-2.jpg", "tour-9-3.jpg"],
    "startDates": ["2021-12-16,10:00", "2022-01-16,10:00", "2022-12-12,10:00"]
  }


DELETE
127.0.0.1:3000/api/v1/tours/605105b223f3116324f7fd64
Delete based on ID


Also this application utilitzes the DataBase MongoDB, Mongoose
The application is on NODE.JS , EXPRESS
