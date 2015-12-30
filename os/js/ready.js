function ready(){
	var sureBtn=document.getElementById("sure-btn"),
		inputBtn=document.getElementById("input-btn");

	var selectForm=document.getElementById("select-form"),
		inputForm=document.getElementById("input-form");
	var inputList=inputForm.getElementsByTagName("input");	

	readyQueue=window.queue("ready");
	
	sureBtn.onclick=function(){
		// 更改全局变量
		algorithmType=Number(selectForm.algorithm.value);
		// 调用CPU函数启动进程调度
		changeTitle(algorithmTypeList[algorithmType]);

		readyQueue.empty();
		for(var i=0,len=dataList.length;i<len;i++){
			resetProcess(dataList[i].el);
			pushQueue(dataList[i],dataList[i].state);
		}



		CPU(algorithmType);
	}

	var index=0;
	inputBtn.onclick=function(){
		var result;
		var val=[];
		var reg=/p-(name|super|rtime)/;	
		var pcb;
		// 输入验证
		for(var i=0,len=inputList.length;i<len;i++){

			result=reg.exec(inputList[i].id);
			if(!check(inputList[i],result[1]||"hide")){
				// 验证失败直接返回，不处理
				return ;
			}else{
				// 将输入框的值保存到一个数组里面
				val.push(inputList[i].value);
			}
		}
		// 生成一个pcb进程控制块实例
		pcb=createPCB.apply(null,val);
		// 进程pcb保存到一个全局数组中
		dataList.push(pcb);
		// 给进程设置动画函数
		pcb.setCallback(animate);
		// 在页面显示进程信息
		showProcessInfo(pcb.name,pcb.super,pcb.rtime);
		// 在页面显示动画条,同时将页面中的动画容器传递给pcb的el属性
		// 这里要将pcb硬绑定到回调函数，因为会隐式丢失this
		showProcessAnimate(pcb.name,index++,pcb.setEl.bind(pcb));
		
	}	

	inputForm.onclick=inputForm.onfocus=function(){
		proxy(arguments[0],"hide");
	}

	inputForm.onkeyup=function(){
		proxy(arguments[0]);
	}	
}




window.onload=ready;