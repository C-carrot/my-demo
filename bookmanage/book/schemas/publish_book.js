var mongoose=require("mongoose");
var pbookSchema=new mongoose.Schema({
	book_id:{
		type:String,
		unique:true
	},
	book_name:{
		type:String
	},
	book_publish:{
		type:String
	}
});

mongoose.model("PublishBook",pbookSchema);