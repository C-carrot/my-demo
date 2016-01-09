var mongoose=require("mongoose");
var ObjectId=mongoose.Schema.Types.ObjectId;
var recordSchema=new mongoose.Schema({
	borrow_id:{
		type:ObjectId,
		ref:"User"
	},
	book_id:{
		type:ObjectId,
		ref:"Book"
	},
	borrow_date:{
		type:String
	},
	return_date:{
		type:String
	}
});


mongoose.model("Record",recordSchema);