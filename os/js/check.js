// 观察者模式，把事件监听绑定在父元素上，而非每一个子元素上
function proxy(){	
	var reg=/p-(name|super|rtime)/;	
	var src=arguments[0].srcElement,result;
	if(!src.id){
		return ;
	}else{
		result=reg.exec(src.id);
	}
	if(!result){
		return ;
	}
	if(result[0]){
		check(document.getElementById(src.id),arguments[1]||result[1]);
	}
}
//简单的验证函数
function check(target,type){
	if(arguments.length!=2){
		return false;
	}
	var numReg=/^\d+$/g;
	var tip=target.parentNode.getElementsByClassName("tips")[0];
	switch(type){
		case "hide":
			toggleTips(tip,false);
			break;
		case "name":
			if(target.value.length>0){
				toggleTips(tip,false);					
			}else{
				toggleTips(tip,true);
				return false;
			}
			break;
		case "super":
		case "rtime":
			if(numReg.test(target.value)){
				toggleTips(tip,false);
			}else{
				toggleTips(tip,true);
				return false;
			}
			break;
	}
	return true;
}
// 切换验证tip提示
function toggleTips(target,flag){
	if(arguments.length!=2){
		return ;
	}
	if(flag){
		target.classList.add("show");
		target.classList.remove("hide");
	}else{
		target.classList.add("hide");
		target.classList.remove("show");
	}
}