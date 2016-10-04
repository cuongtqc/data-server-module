var express = require('express');
var fs = require('fs');
var cors = require('cors');
var router = express.Router();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

var HOST = "112.137.141.10:3000";
var DIRPATH = __dirname.substring(0, __dirname.length - 7)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/uploadFile', cors(corsOptions), function(req, res){
	var data = req.body;
	var content = data.content;
	var id = data.id;
	fs.writeFile(DIRPATH + '/public/temp/' + id, content, function(err){
		if (err) console.log(JSON.stringify(err));
		var url = "https://"+ HOST +"/temp/" + id;
		return res.send(url);
	});
});

router.post('/deleteFile', cors(corsOptions), function(req,res){
	var data = req.body;
	var id = data.id;
	fs.unlinkSync(DIRPATH + '/public/temp/' + id);
	return res.send("Deleted temp Okay!");
})

module.exports = router;
