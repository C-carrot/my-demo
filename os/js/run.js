function ready(){
	var sureBtn=document.getElementById("sure-btn"),
		inputBtn=document.getElementById("input-btn");

	var selectForm=document.getElementById("select-form"),
		inputForm=document.getElementById("input-form");
	var inputList=inputForm.getElementsByTagName("input");
	var reg=/p-(name|super|rtime)/;
	var index=0;
	

	sureBtn.onclick=function(){
		algorithmType=Number(selectForm.algorithm.value);
	}

	var content=document.getElementsByClassName("content")[0];
	var infoContent=document.getElementById("info-content");
	inputBtn.onclick=function(){
		var result;
		var val=[];
		var pcb;
		for(var i=0,len=inputList.length;i<len;i++){
			result=reg.exec(inputList[i].id);
			if(!check(inputList[i],result[1]||"hide")){
				return ;
			}else{
				val.push(inputList[i].value);
			}
		}
		pcb=createPCB.apply(null,val);
		main(pcb,pcb.state);
		showProcessAnimate(content,pcb.name,index++);
		showProcessInfo(infoContent,pcb.name,pcb.super,pcb.rtime);
	}

	

	inputForm.onclick=inputForm.onfocus=function(){
		proxy(arguments[0],"hide");
	}


	inputForm.onkeyup=function(){
		proxy(arguments[0]);
	}

	// 观察者模式，把事件监听绑定在父元素上，而非每一个子元素上
	function proxy(){		
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
		var textReg=/^\w+$/g;
		var tip=target.parentNode.getElementsByClassName("tips")[0];
		switch(type){
			case "hide":
				toggleTips(tip,false);
				break;
			case "name":
				if(textReg.test(target.value)){
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
}



window.onload=ready;