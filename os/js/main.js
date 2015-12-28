//全局变量，表示当前使用的算法类型
var algorithmType=0;

var colors=["red","green","orange","pink","yellow"];

function pushQueue(pcb,state){
	var readyQueue=window.readyQueue=window.queue("ready"),
		runQueue=window.runQueue=window.queue("run");
	if(!pcb){
		return ;
	}
	state=state||"ready";
	if(state==="ready"){
		readyQueue.enqueue(pcb)
	}
}

function CPU(algorithmType){
	var runQ=window.runQueue;
	var algorithm=new Alogrithm();
	var runner=new Runner();
	switch(algorithmType){
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 0:
		default:
			algorithm.method0();
			runner.start();
			break;
	}
}


function Alogrithm(){
	this.type=[
		"先来先服务调度算法","短进程优先调度算法",
		"优先权调度算法","高响应比优先调度算法",
		"时间片轮转法","多级反馈队列调度算法"
	];
	this.currentType="";
}

// 先来先服务调度算法
Alogrithm.prototype.method0=function(){
	var	readyQ=window.readyQueue,
		runQ=window.runQueue,
		pcb;

	this.currentType=this.type[0];
	// 将就绪队列里面的进程放入运行队列
	while(readyQ.length){
		pcb=readyQ.dequeue();
		runQ.enqueue(pcb);
	}
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
		console.log("el",el);
		this.el=el;
		console.log("this",this);
		console.log("this.el",this.el);
	}
	return new PCB();
}





