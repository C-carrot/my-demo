var express=require("express"),
	mongoose=require("mongoose"),
	ejs=require('ejs'),
	Session = require('express-session'),
	mongoStore=require('connect-mongo')(Session),
	bodyParser=require("body-parser"),
	cookieParser=require("cookie-parser"),
	methodOverride = require('method-override'),
	router=require("./config/router"),
	app=express(),
	dbUrl='mongodb://localhost/book',
	db,server;


mongoose.connect(dbUrl);
db=mongoose.connection;

server=app.listen(8000);



app.set('views',__dirname+'/book/views');
app.engine('.html',ejs.__express);
app.set('view engine','.html');
app.set("view options",{
	layout:false
});
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());	
app.use(Session({
	secret:["_user","_type"],
	resave: false,//重新保存：强制会话保存即使是未修改的。(默认值ture)
   	saveUninitialized: true,
   	store: new mongoStore({
   		url: dbUrl
   	}),
   	cookie:{
   		maxAge:300000
   	}
}));
app.use(express.static(__dirname+'/public'));


db.on('error',function(err){
	console.log("link to database error!");
	console.log(err);	
});
db.once('open',function(){
	router(app);
});
