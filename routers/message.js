const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require("mongoose");

router.post('/', function(req, res) {

	var Message = mongoose.model('message');

	
	Message.create({
		name: req.body.name,
		surname: req.body.surname,
		message: req.body.message
	}, function(err, subject) {
		if(err) {
			console.log(err);
			return res.json({status: "Ошибка записи"})
		}

		Message
  	.find({})
  	.then(function(items) {
    	//если такой пользователь не найден - сообщаем об этом
    	res.json(res.json({status: "Сообщение успешно записано", items: items}))
   	});

		}
	);



});


module.exports = router;