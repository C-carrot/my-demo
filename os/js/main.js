
function pushQueue(pcb,state){
	if(!pcb){
		return ;
	}
	state=state||"ready";
	if(state==="ready"){
		readyQueue.enqueue(pcb)
	}
}

function CPU(algorithmType){
	var readyQ=window.readyQueue;
	var runner=new Runner();
	if(algorithmType===4){
		// 时间片轮转算法设置时间片
		runner.setTime(400);
	}
	runner.start(algorithmType);
}


// 生成一个进程控制块实例
// @name  进程名称
// @state 进程状态
// @super 进程优先级
// @rtime 进程运行时间
function createPCB(name,sup,rtime,state){
	/*
		ntime : 进程已经运行过的时间
		callback : 进程运行时调用的函数，这里是一个动画来模拟进程的运行效果
		el : 进程动画在页面上的元素
	*/ 
	function PCB(){		
		this.name=name || null;
		this.super=sup || 0;
		this.rtime=rtime || 0;
		this.state=state || "ready";
		this.callback=null;
		this.ntime=0;
		this.el=null;
	}
	PCB.prototype.setCallback=function(callback){
		this.callback=callback;
	}
	PCB.prototype.setEl=function(el){
		this.el=el;
	}
	return new PCB();
}





