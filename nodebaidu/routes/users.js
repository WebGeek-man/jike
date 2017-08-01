var express = require('express');
var router = express.Router();
var mysql   = require('mysql');
var db   = require('./db');

//创建一个链接池
var connection = mysql.createPool(db);
	
/* 百度后台管理系统路由 */
//获取所有新闻列表
router.get('/getNews', function(req, res, next) {
  	
	connection.query('SELECT * FROM `news` order by id desc',function (error, results) {
	  if (error) throw error;
	  // console.log('The solution is: ', results[0].solution);
	  // console.log('The solution is: ', results);
	  res.json(results);

	});
});


//点击确认更新
router.post('/updata',function(req,res){
	var newsid = req.body.newsid;
	var	newstype = req.body.newstype;
	var	newstitle = req.body.newstitle;
	var	newstime = req.body.newstime;
	var	newsimg = req.body.newsimg;
	var	newssrc = req.body.newssrc;
	connection.query("UPDATE `news` SET `newstype`= ?,`newstitle` = ?,`newsimg` = ?,`newstime`= ?,`newssrc`= ? WHERE `id`= ?",[newstype,newstitle,newsimg,newstime,newssrc,newsid],function(error,rows){
		if (error) throw error;
		console.log(rows);
		res.json(rows.affectedRows)
	})	
})

//模态框取值
router.get('/curnews',function(req,res,next){
	var newsid = req.query.newsid;
	connection.query("SELECT * FROM `news` WHERE `id` = ?",[newsid],function(error,rows){
	if (error) throw error;
		res.json(rows);
	})
});

 

//删除新闻 delete
router.post('/delete' ,function(req,res){
	var newsid = req.body.newsid;
	connection.query("DELETE FROM `news` WHERE `news`.`id` = ?",[newsid],function(error,rows){
		if (error) throw error;
		console.log('新闻删除成功');
		res.json(rows);
	})
})

//插入新闻  insert
router.post('/insert1',function(req,res){
	var newsid = req.body.id,
		newstype = req.body.newstype,
		newstitle = req.body.newstitle,
		newstime = req.body.newstime,
		newsimg = req.body.newsimg,
		newssrc = req.body.newssrc;
	connection.query("INSERT INTO `news`(`newstype`, `newstitle`, `newsimg`, `newstime`, `newssrc`) VALUES (?,?,?,?,?)",[newstype,newstitle,newsimg,newstime,newssrc],function(error,rows){
	if (error) throw error;
		console.log("插入成功")
		res.json(rows.changedRows)
	})
})

module.exports = router;














































/*   疑问已解决
1. admin.js 文件里面,每个请求路径(例如:url:'/admin/getNews'),  为什么要拼上 admin ?
2. baiduNews.js 文件里面,因为只有一个请求(url:'/news',),为什么这个跟的是 news ? 是不是由于直接在 app.js 里面配
	置app.use('/news', index); app.use('/admin', users);有关

3. 接第二个问题,baiduNews.js如果有多个请求的话,是需要像
	admin.js那样自定义一个二级目录么(例如:url:'/news/getdata')?
4. routes文件目录默认有 index.js 与 user.js ,视频中老师直接在index.js里面写请求客户端数据接口,在user.js写管理平台接口,
	这个有什么讲究没?
5. routes文件目录默认有 index.js 与 user.js 两个文件,我可以新建一个 test.js ,
	然后在 app.js配置(var addtest = require('./routes/test');)  ,方式继续添加可以么?
6.	routes/users.js  (router.get('/getNews', function(req, res, next) )  有个参数 next,
	我看文档说 没有这个参数下面的请求不会调用,但是老师视频并没有把这个参数写上,这个next参数用法有啥讲究?


*/










