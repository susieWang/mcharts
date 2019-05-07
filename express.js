const express = require('express');
const performance = require('./lib/performance.js');
const app = express();
const router = express.Router();
const parseData = require('./parse.js');
router.get('/', function (req, res, next) {
  req.url = './index.html';
  next();
});
app.use(router);
app.use(performance({
	time: 10, // 秒为单位
	originalDir: './originalData', // 数据的目录
	errorDir: './errorData' // 报错的目录
}))
/*
// use demo  请求都会被app这个函数处理
 app.use(function(req,res,next){
	 console.log('111');
	 next();
	 console.log('222');
 });

* */
//然后把数据整理写入到csv等文件中
setInterval(function() {
	console.log("parse data ***");
	parseData(new Date().toLocaleDateString());
}, 1000 * 15);
app.use(express.static('./'));
const server = app.listen(3000)