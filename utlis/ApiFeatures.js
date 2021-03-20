class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
     
    filter() {
      const queryObj = { ...this.queryString };  // in javascript if we set a object to a varibale then it will be a reference to that object so here we making a hardcore copy first
      // First we BUILDING a query ie not getting the result out of it
      //1A Filtering
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach(ele => delete queryObj[ele]);
      // console.log(queryObj, this.query);  now we have all query with excludedFields deleted
      
      //1B Advance Filtering
      //{difficulty: 'easy', duration: { $gte: 5 } }  command in mongoDB
      //{ difficulty: 'easy', duration: { gte: '5' } }
      
      console.log("query", this.queryString);
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, match => `$${match}`);  // replacing all the occurances of `lt|lte|gt|' using g(to all) to $ times query
      
      // If we are building an api then we should also build the documentation of it for the user
      // console.log(JSON.parse(queryStr));
      this.query = this.query.find(JSON.parse(queryStr)); //M-1 to get our required documents
      return this;
      // const query = Tour.find().where('duration').equals(5).where('difficulty').equals('easy');  // M-2 to find our required document instead of equals we have lte gt, lt
    }
  
    sort() {
      if (this.queryString.sort) {
        let sortBy = this.queryString.sort.split(',').join(' ');   // to add second parameter for time we simply need .sort(para1 para2 para3) with spaces which is what we doing first by spliting then joining
        // console.log(sortBy);  to sort in decreasing order use -sign befire the parameter
        this.query.sort(sortBy);   // mongooes will sort by sorting parameter which is nothing but sort itself
      } else {
        this.query = this.query.sort('-createdAt');
      }
      return this;
    }
    project() {
      if (this.queryString.fields) {
        let fields = this.queryString.fields.split(',').join(' ');
        console.log(fields);
        this.query = this.query.select(fields); // eg query.select('name duration price');
      } else {
        this.query = this.query.select('-__v');  // with - we can exclude that field
      }
      return this;
    }
    page() {
      const page = this.queryString.page*1 || 1;  // with || we can set the default page to 1
      const limit = this.queryString.limit * 1 || 1;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
  
      // if (req.query.page) {
      //   const totalCnt = await Tour.countDocuments();
      //   console.log(page, totalCnt);
      //   if (skip >= totalCnt) {
      //     throw new Error('This page does not exits')
      //   }
      // }
      return this;
    }
}
  
module.exports = APIFeatures;