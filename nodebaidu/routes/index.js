var express = require('express');
var router  = express.Router();
var mysql   = require('mysql');
var db   = require('./db');

/* 在主页获取新闻时的请求 */

router.get('/', function(req, res, next) {
	var newstype = req.query.newstype;
	var connection = mysql.createConnection(db);
	connection.connect();
	connection.query('SELECT * FROM `news` WHERE `newstype` = ? order by id desc',[newstype], function (error, results, fields) {
	  if (error) throw error;
	  // console.log('The solution is: ', results[0].solution);
	  console.log('The url is: ', connection);
	  // console.log('The solution is: ', results);
	  res.json(results);
	});
	 
	connection.end();
});

module.exports = router;
