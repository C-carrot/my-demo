var mongoose=require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var messageSchema=new mongoose.Schema({	
	from:{
		type:String
	},
	to:{
		type:String
	},
	action:{
		type:Number 
		//0 用户借书  1 用户还书 
		//2 图书馆借书给用户  3 图书馆向出版社增购书  
		//4 出版社出货给图书馆
	},
	book_publish:{
		type:ObjectId,
		ref:"PublishBook"
	},
	book_admin:{
		type:ObjectId,
		ref:"Book"
	},
	bid:{
		type:String
	},
	num:{
		type:Number,
		default:0
	}
});

// user
// 0 用户借书

mongoose.model("Message",messageSchema);

