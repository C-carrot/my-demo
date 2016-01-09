var mongoose = require('mongoose');
var Model = require("../models/index");
var Tool=require("./tool");
var __user=Model.User;
var __message=Model.Message;
var __manage=Model.Manage;
var __record=Model.Record;
var __book=Model.Book;
var user={};

user.login=function(req,res){
	var _data=req.body;
	__user.findOne({borrow_id:_data.borrow_id},function(err,data){
		if(err){
			console.log(err);
		}else{
			if(data===null){
				res.json({
					"status":"error",
					"message":0 //用户不存在
				})
			}else{
				if(data.checkPassword(_data.password)){
					req.session._user=data._id;
					req.session._type=0;
					res.json({
						"status":"ok",
						"url":"/user/main.do"
					});
				}else{
					res.json({
						"status":"error",
						"message":1 // 密码错误
					});
				}
			}
		}
	});
}

user.layout=function(req,res){
	delete req.session._user;
	delete req.session._type;
	res.redirect("/");
}

user.register=function(req,res){
	var _data=req.body,_user;
	_user=new __user({
		borrow_id:"S"+(+new Date),
		password:_data.password,
		username:_data.username,
		company:_data.company
	});
	_user.save(function(err,data){
		if(err){
			console.log(err);
		}
		req.session._user=data._id;
		req.session._type=0;
		res.json({
			"status":"ok",
			"url":"/user/main.do"
		});
	});
}

user.main=function(req,res){
	__user.findOne({_id:req.session._user},function(err,data){
		if(err){
			console.log(err);
		}
		res.render("user/main",{
			type:"info",
			mode:1,
			borrow_id:data.borrow_id,
			username:data.username,
			company:data.company
		})
	});
}
// 借书的行为
user.borrowBook=function(req,res){
	var _data=req.body,_message;
	__user.findOne({_id:req.session._user},function(err,_u){
		if(err){
			console.log(err);
		}
		_message=new __message({
			from:req.session._user,
			to:"ADMIN",
			action:0,
			book_admin:_data._id,
			book_publish:null,
			num:1,
			bid:_u.borrow_id
		});
		_message.save(function(err,data){
			if(err){
				console.log(err);
			}
			res.json({
				"status":"ok"
			})
		})
		
	})
}
// 还书的行为
user.returnBook=function(req,res){
	var _data=req.body;
	__record.remove({_id:_data.record_id},function(err,data){
		if(err){
			console.log(err);
		}
		__book.findOne({_id:_data.book_id},function(err,d){
			if(err){
				console.log(err);
			}
			if(d.book_remain<d.book_num){
				d.book_remain++;
				d.save(function(err,data){
					if(err){
						console.log(err);
					}
					res.json({
						"status":"ok"
					});					
				})
			}else{
				res.json({
					"status":"error"
				})
			}
		})
	});
}
 
user.isLogin=function(req,res,next){
	var _user=req.session._user,_type=req.session._type;
	if(!_user || _type!==0){
		return res.redirect('/');
	}
	next();
}

user.bookList=function(req,res){
	__book.find({})
	.populate("book_id","book_id book_name book_publish")
	.exec(function(err,data){
		if(err){
			console.log(err);
		}
		res.render("user/bookList",{
			mode:2,
			list:data
		});
	});
}


user.message=function(req,res){
	__message.find({to:req.session._user})
	.where("action").equals(2)
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
			res.render("user/message",{
				mode:3,
				list:d
			});			
		})
	});
}

user.getBook=function(req,res){
	var _data=req.body,_record;	
	__book.findOne({_id:_data.book_id},function(err,_d){
		if(_d.book_remain<=0){
			res.json({
				"status":"error",
				"message":0 //图书存量不足
			})
		}else{
			_d.book_remain--;
			_d.save(function(err,d){	
				var now=new Date,
					num=+now+2592000000,
					nnow=new Date;
				nnow.setTime(num);		
				_record=new __record({
					borrow_id:req.session._user,
					book_id:_data.book_id,
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
	})
}

user.recordList=function(req,res){
	__record.find({borrow_id:req.session._user})
	.populate("book_id")
	.populate("borrow_id","borrow_id")
	.exec(function(err,data){
		if(err){
			console.log(err);
		}
		__book.populate(data,[{
			model:"PublishBook",
			path:"book_id.book_id",
			select:"book_id book_name"
		}],function(err,d){
			if(err){
				console.log(err);
			}
			res.render("user/recordList",{
				mode:4,
				list:d
			});
		})
		
	})
}


module.exports=user;
