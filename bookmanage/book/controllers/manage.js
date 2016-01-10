var mongoose = require('mongoose')
var Model = require("../models/index");
var Tool=require("./tool");
var __manage=Model.Manage;
var __message=Model.Message;
var __book=Model.Book;
var __record=Model.Record;
var manage={};



manage.register=function(req,res){
	var _data=req.body,_manage;
	__manage.findOne({username:_data.username},function(err,data){
		if(err){
			console.log(err);
		}
		if(!data){
			_manage=new __manage({
				username:_data.username,
				password:_data.password
			});
			_manage.save(function(err,data){
				if(err){
					console.log(err);
				}
				req.session._user=_data.username;
				req.session._type=1;
				res.json({
					"status":"ok",
					"url":"/manage/bookList.do"
				});
			});
		}
	})
}

manage.login=function(req,res){
	var _data=req.body;
	__manage.findOne({username:_data.username},function(err,data){
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
				req.session._user=data.username;
				req.session._type=1;
				res.json({
					"status":"ok",
					"url":"/manage/bookList.do"
				})
			}else{
				res.json({
					"status":"error",
					"message":1 // 密码错误
				})
			}
		}
	});
}

manage.layout=function(req,res){
	delete req.session._user;
	delete req.session._type;
	res.redirect("/");
}


manage.isLogin=function(req,res,next){
	var _user=req.session._user,_type=req.session._type;
	if(!_user || _type!==1){
		return res.redirect('/');
	}
	next();
}

manage.addBook=function(req,res){
	var _data=req.body,_message;
	_message=new __message({
		from:req.session._user,
		to:_data.book_publish,
		action:3,
		book_publish:_data.book,
		num:_data.num,
		bid:_data.bid
	});
	_message.save(function(err,data){
		if(err){
			console.log(err);
		}
		res.json({
			"status":"ok"
		});
	})
}

manage.getBook=function(req,res){
	var _data=req.body,_book;
	__book.findOne({book_id:_data._id},function(err,d){
		if(!d){			
			_book=new __book({
				book_id:_data._id,
				book_num:_data.num,
				book_remain:_data.num,
				position:_data.position
			});

			_book.save(function(err,data){
				if(err){
					console.log(err);
				}
				__message.remove({_id:_data.msg_id},function(err,data){
					if(err){
						console.log(err);
					}
					res.json({
						"status":"ok"
					});			
				});
			});
		}else{
			d.book_num=(+d.book_num)+(+_data.num);
			d.book_remain=(+d.book_remain)+(+_data.num);
			d.save(function(err,data){
				if(err){
					console.log(err);
				}
				__message.remove({_id:_data.msg_id},function(err,data){
					if(err){
						console.log(err);
					}
					res.json({
						"status":"ok"
					});			
				});
			})
		}
	});

}

manage.bookList=function(req,res){
	__book.find({})
	.populate("book_id","book_id book_name book_publish")
	.exec(function(err,data){
		if(err){
			console.log(err);
		}
		res.render("manage/bookList",{
			mode:1,
			list:data
		});
	});
}

manage.sendBook=function(req,res){
	var _data=req.body,_record,_message;
	__book.findOne({_id:_data._id},function(err,_d){
		if(_d.book_remain<=0){
			res.json({
				"status":"error",
				"message":0, //图书存量不足
				"info":{
					"to":_data.to,
					"book_admin":_data._id,
					"action":-1, //借书失败
					"from":"ADMIN",
					"num":1
				}
			});
		}else{
			_d.book_remain--;
			_d.save(function(err,d){	
				var now=new Date,
					num=+now+2592000000,
					nnow=new Date;
				nnow.setTime(num);		
				_record=new __record({
					borrow_id:_data.to,
					book_id:_data._id,
					borrow_date:Tool.formatDate(now),					
					return_date:Tool.formatDate(nnow)
				});
				_record.save(function(err,data){
					if(err){
						console.log(err);
					}
					__message.remove({_id:_data.msg_id},function(err,data){
						if(err){
							console.log(err);
						}
						res.json({
							"status":"ok"
						});
					});
				});
			});			
		}
	});
	
}

manage.publishMessage=function(req,res){
	__message.find({to:req.session._user})
	.where("action").equals(4)
	.populate("book_publish","book_id book_name")
	.exec(function(err,data){
		if(err){
			console.log(err);
		}
		console.log("boo  ",data);
		res.render("manage/message",{
			mode:4,
			type:2,
			list:data
		});
	});
}

manage.userMessage=function(req,res){
	__message.find({to:"ADMIN"})
	.where("action").equals(0)
	.populate("book_admin")
	.exec(function(err,data){
		if(err){
			console.log(err);
		}
		__message.populate(data,[{
			path:"book_admin.book_id",
			select:"book_id book_name book_publish",
			model:"PublishBook"
		}],function(err,d){			
			res.render("manage/message",{
				mode:3,
				type:0,
				list:d
			});			
		})
	});
}

manage.messageFromUser=function(req,res){
	__message.find({to:"ADMIN"})
	.populate("bookList","book_id book_name")
	.exec(function(err,data){
		res.render("manage/messageByUser",{
			list:data
		});
	});
}


manage.telUser=function(req,res){
	var _data=req.body,_message;
	_message=new __message({
		to:_data.to,
		from:_data.from,
		action:_data.action,
		num:_data.num,
		book_admin:_data.book_admin
	});
	_message.save(function(err,data){
		if(err){
			console.log(err);
		}
		__message.remove({_id:_data.msg_id},function(err,d){
			if(err){
				console.log(err);
			}
			res.json({
				"status":"ok"
			});
			
		});
	});
}

module.exports=manage;