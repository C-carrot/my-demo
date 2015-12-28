function main(pcb,state){
	var waitQueue=window.queue("wait"),
		runQueue=window.queue("run"),
		readyQueu=window.queue("ready");
}

// 生成一个进程控制块实例
// @name  进程名称
// @state 进程状态
// @super 进程优先级
// @rtime 进程运行时间
// @ntime 进程已经运行过的时间
function createPCB(name,sup,rtime,state,ntime){
	function pcb(){		
		this.name=name || null;
		this.super=sup || 0;
		this.rtime=rtime || 0;
		this.state=state || "wait";
		this.ntime=ntime || 0;
	}
	return new pcb();
}

var algorithmTxt=[
	"先来先服务调度算法","短进程优先调度算法",
	"优先权调度算法","高响应比优先调度算法",
	"时间片轮转法","多级反馈队列调度算法"];

