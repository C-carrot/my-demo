var Controller=require("../book/controllers/index");

module.exports=function(app){
	app.use(function(req,res,next){
		var _user=req.session._user,
			_type=req.session._type
		app.locals._user=_user;
		app.locals._type=_type;
		next();
	});	

	// 普通用户操作
	// 注册 （姓名，单位）
	// 查看所有图书的list
	// 查看图书品种，数量与存放位置，书的状态，通过书号查询
	// 选择书籍借阅（借书时间）
	// 还书
	// 普通用户登陆与退出账号
	app.post("/user/login.do",Controller.user.login);
	app.get("/user/layout.do",Controller.user.layout);
	app.post("/user/register.do",Controller.user.register);
	app.get("/user/main.do",Controller.user.isLogin,Controller.user.main);
	app.get("/user/bookList.do",Controller.user.isLogin,Controller.user.bookList);
	app.get("/user/recordList.do",Controller.user.isLogin,Controller.user.recordList);
	app.post("/user/borrowBook.do",Controller.user.isLogin,Controller.user.borrowBook);
	app.post("/user/getBook.do",Controller.user.isLogin,Controller.user.getBook);
	app.get("/user/message.do",Controller.user.isLogin,Controller.user.message);
	app.post("/user/returnBook.do",Controller.user.isLogin,Controller.user.returnBook);

	// 图书馆用户操作
	// 查询书籍借还情况（包括借书人单位、姓名、借书证号、借书时间和还书状态）
	// 处理用户借书行为，修改书籍状态
	// 处理用户还书行为，修改书籍状态
	// 向出版社增购书籍
	// 查看出版社列表
	// 查看出版社所出版的书籍,信息
	// 添加书籍
	// 图书馆管理员登陆与退出账号

	app.post("/manage/login.do",Controller.manage.login);
	app.get("/manage/layout.do",Controller.manage.layout);
	app.post("/manage/register.do",Controller.manage.register);
	app.post("/manage/addBook.do",Controller.manage.isLogin,Controller.manage.addBook);
	app.get("/manage/publishList.do",Controller.manage.isLogin,Controller.publish.list);
	app.get("/manage/publish/detail/:id.do",Controller.manage.isLogin,Controller.publish.bookListById);
	app.get("/manage/publishMessage.do",Controller.manage.isLogin,Controller.manage.publishMessage);
	app.get("/manage/userMessage.do",Controller.manage.isLogin,Controller.manage.userMessage);
	app.post("/manage/getBook.do",Controller.manage.isLogin,Controller.manage.getBook);
	app.get("/manage/bookList.do",Controller.manage.isLogin,Controller.manage.bookList);
	app.post("/manage/sendBook.do",Controller.manage.isLogin,Controller.manage.sendBook);
    app.post("/manage/telUser.do",Controller.manage.isLogin,Controller.manage.telUser);
	// app.post("/manage/returnBook.do",Controller.manage.isLogin,Controller.manage.returnBook);
	// 出版社用户操作
	// 注册（出版社名，电报编号，电话，邮编，地址）
	// 修改信息（电报编号，电话，邮编，地址）
	// 查询已出版的图书
	// 处理图书馆管理员发送的增购书籍
	// 出版社管理员登陆与退出账号

	app.post("/publish/login.do",Controller.publish.login);
	app.get("/publish/layout.do",Controller.publish.layout);
	app.post("/publish/register.do",Controller.publish.register);
	app.get("/publish/main.do",Controller.publish.isLogin,Controller.publish.main);
	app.post("/publish/addBook.do",Controller.publish.isLogin,Controller.publish.addBook);
	app.get("/publish/bookList.do",Controller.publish.isLogin,Controller.publish.bookList);
	// app.post("/publish/updateInfo.do",Controller.publish.updateInfo);
	app.get("/publish/message.do",Controller.publish.isLogin,Controller.publish.message);
	app.post("/publish/sendBook.do",Controller.publish.isLogin,Controller.publish.sendBook);
} 