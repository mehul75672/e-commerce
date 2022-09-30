const router = require("express").Router();
const user = require('../controller/user');
const Users = require('../model/User');
//pagination
function paginatedResults() {
    return async (req, res, next) => {
      
      const page = parseInt(req.query.page)||1;
      const limit = parseInt(req.query.limit)||10;
      const skipIndex = (page - 1) * limit; 
      const results = {};
      try {
        results.results = await Users.find()
          .limit(limit)
          .skip(skipIndex);
        res.paginatedResults = results;
        next();
      } catch (e) {
        res.status(500).json({ message: "Error Occured" });
      }
    };
  }
router.get('/p',paginatedResults(),(req,res)=>{

    
    res.json(res.paginatedResults);
});
router.post('/registr', user.adduser);
router.post("/login", user.loginuser);
router.get("/",user.all_user)
module.exports = router
