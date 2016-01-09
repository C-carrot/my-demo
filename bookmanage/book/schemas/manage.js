var mongoose=require("mongoose");
var manageSchema=new mongoose.Schema({	
	username:{
		type:String
	},
	password:{
		type:String
	}
});


manageSchema.methods={
	checkPassword:function(password){
		if(this.password===password){
			return true;
		}
		return false;			
	}
}

// user
// 0 用户借书

mongoose.model("Manage",manageSchema);