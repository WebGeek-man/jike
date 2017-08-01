var express = require('express');
var router  = express.Router();
var mysql   = require('mysql');
var db   = require('./db');

//创建一个链接池
var connection = mysql.createPool(db)
// var connection = mysql.createPool({ 
// 	  host     : 'localhost',
// 	  port	   : 3306,
// 	  user     : 'root',
// 	  password : '',
// 	  database : 'baidunews'
// 	});

/* 在主页获取新闻时的请求 */

router.get('/', function(req, res, next) {
	var newstype = req.query.newstype;
	connection.query('SELECT * FROM `news` WHERE `newstype` = ?',[newstype], function (error, results, fields) {
	  if (error) throw error;
	  // console.log('The solution is: ', results[0].solution);
	  console.log('The url is: ', connection);
	  // console.log('The solution is: ', results);
	  res.json(results);
	});
	 
});

module.exports = router;