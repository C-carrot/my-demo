var mongoose=require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var bookSchema=new mongoose.Schema({
	// B+new Date
	book_id:{
		type:ObjectId,
		ref:"PublishBook"
	},
	book_num:{
		type:Number,
		default:0
	},
	book_remain:{
		type:Number,
		default:0
	},
	position:{
		type:String
	}
});

mongoose.model("Book",bookSchema);

