var mongoose=require("mongoose");
var publishSchema=new mongoose.Schema({
	publish_id:{
		type:String,
		unique:true
	},
	password:{
		type:String
	},
	tel_code:{
		type:Number
	},
	tel:{
		type:Number
	},
	zip_code:{
		type:Number
	},
	address:{
		type:String
	}
});
publishSchema.methods={
	checkPassword:function(password){
		if(this.password===password){
			return true;
		}
		return false;			
	}
}
mongoose.model("Publish",publishSchema);
