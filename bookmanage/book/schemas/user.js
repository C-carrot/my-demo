var mongoose=require("mongoose");
var userSchema=new mongoose.Schema({
	// U+new Date
	borrow_id:{
		type:String,
		unique:true
	},
	password:{
		type:String
	},
	username:{
		type:String
	},
	company:{
		type:String
	}
});

userSchema.methods={
	checkPassword:function(password){
		if(this.password===password){
			return true;
		}
		return false;			
	}
}


mongoose.model("User",userSchema);