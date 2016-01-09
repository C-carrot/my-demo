var mongoose = require('mongoose')
var Model = require("../models/index");
var __publish=Model.Publish;
var __publishBook=Model.PublishBook;
var __message=Model.Message;
var publish={};

publish.register=function(req,res){
	var _data=req.body,_publish;
	
	__publish.findOne({publish_id:_data.publish_id},function(err,data){
		if(err){
			console.log(err);
		}
		if(!data){
			_publish=new __publish({
				publish_id:_data.publish_id,
				password:_data.password,
				tel_code:_data.tel_code,
				tel:_data.tel,
				zip_code:_data.zip_code,
				address:_data.address
			});
			_publish.save(function(err,data){
				if(err){
					console.log(err);
				}
				req.session._user=data.publish_id;
				req.session._type=2;
				res.json({
					"status":"ok",
					"url":"/publish/main.do"
				});
			});
		}else{
			res.json({
				"status":"error",
				"message":-1 //已存在该出版社了
			})
		}
	});
}

publish.login=function(req,res){
	var _data=req.body;
	__publish.findOne({publish_id:_data.publish_id},function(err,data){
		if(err){
			console.log(err);
		}
		if(!data){
			res.json({
				"status":"error",
				"message":0 //用户不存在
			});
		}else{
			if(data.checkPassword(_data.password)){
				req.session._user=data.publish_id;
				req.session._type=2;
				res.json({
					"status":"ok",
					"url":"/publish/main.do"
				});
			}else{
				res.json({
					"status":"error",
					"message":1 // 密码错误
				});
			}
		}
	});
}

publish.isLogin=function(req,res,next){
	var _user=req.session._user,_type=req.session._type;
	if(!_user || _type!==2){
		return res.redirect('/');
	}
	next();
}

publish.layout=function(req,res){
	delete req.session._user;
	delete req.session._type;
	res.redirect("/");
}

publish.addBook=function(req,res){
	var _data=req.body,book;	
	__publishBook.findOne({book_id:_data.book_id},function(err,data){
		if(err){
			console.log(err);
		}
		if(!data){
			book=new __publishBook({
				book_name:_data.book_name,
				book_id:_data.book_id,
				book_publish:req.session._user
			});
			book.save(function(err,b){
				if(err){
					console.log(err);
				}		
				res.json({
					"status":"ok"
				});
			});		
		}else{
			res.json({
				"status":"error",
				"message":1 //已存在该书了
			});
		}
	});	
}

publish.main=function(req,res){
	__publish.findOne({publish_id:req.session._user},function(err,data){
		if(err){
			console.log(err);
		}
		res.render("publish/main",{
			data:data,
			mode:1
		});
	});
}

publish.bookList=function(req,res){
	__publishBook.find({book_publish:req.session._user},function(err,data){
		res.render("publish/bookList",{
			mode:2,
			list:data
		});
	});
}

publish.message=function(req,res){
	__message.find({to:req.session._user})
	.where("action").equals(3)
	.populate("book_publish","book_id book_name")
	.exec(function(err,data){
		if(err){
			console.log(err);
		}
		res.render("publish/message",{
			mode:3,
			list:data
		});
	});
}

publish.list=function(req,res){
	__publish.find({},function(err,data){
		if(err){
			console.log(err);
		}

		res.render("manage/publishList",{
			mode:2,
			list:data
		});
	})
}
publish.bookListById=function(req,res){
	var _id=req.params.id;
	__publishBook.find({book_publish:_id},function(err,data){
		res.render("manage/publish_book",{
			mode:2,
			list:data
		});
	})
}

publish.sendBook=function(req,res){
	var _data=req.body,_message;
	_message=new __message({
		to:_data.to,
		from:req.session._user,
		book_publish:_data.book,
		num:_data.num,
		action:4
	});
	_message.save(function(err,data){
		if(err){
			console.log(err);
		}
		__message.remove({_id:_data.msg_id},function(err){
			if(err){
				console.log(err);
			}
			res.json({
				"status":"ok"
			});
		});		
	});
}
module.exports=publish;