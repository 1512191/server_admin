var express = require('express');
var router = express.Router();
var login = require('../controller/login')
/* GET home page. */
router.post('/', login.Login);
router.get('/test', (req, res)=>{
  return res.status(200).json({mess:"haha"})
})
//router.get('/test', function(res, req))
module.exports = router;
