function Runner(limit){
	this.timer=null;
	this.queue=window.runQueue;
	this.limit=limit || 40;
	this.currentPcb=null;
}

Runner.prototype.start=function(){
	var pcb;
	var limit=this.limit;
	

	/** something interesting
		这里发生了类似“死锁”的现象
		while循环一直阻塞，而setInterval试图使while循环的条件减小，
		但是setInterval必须在while循环即同步代码运行完之后才能抢到js主线程才能运行
		因此while在一直等待setInterval带来的条件减少，而setInterval却同时在等待while循环结束
		阻塞了。
		解决方法：这里应该用一个特殊的异步队列，来实现异步函数运行完了再出下一个队内元素
		1.promise
	*/ 
	// while(this.queue.length){

	// 	pcb=this.queue.getQueueHead();

	// 	(function(pcb,self){
	// 		self.timer=setInterval(function(){
	// 			if("finished"===pcb.callback(pcb.el)){
	// 				self.queue.dequeue();
	// 				self.remove();				
	// 			}
	// 		},self.limit);	

	// 	}(pcb,this));

	// }

	// the solution of Promise
	pcb=this.queue.dequeue();
	var step=Step(asncy.bind(this,pcb));
	function Step(callback){
		return new Promise(function(resolve,reject){
			callback(resolve);
		})
	}
	function asncy(pcb,resolve){
		this.timer=setInterval(function(){
			if("finished"===pcb.callback(pcb.el)){
				this.remove();
				if (this.queue.length) {
					pcb=this.queue.dequeue();
					step.then(Step.bind(this,asncy.bind(this,pcb)));
				};
				resolve();
			}
		}.bind(this),this.limit);
	}
	
}

Runner.prototype.stop=function(){
	clearInterval(this.timer);
}

Runner.prototype.remove=function(){
	this.stop();
	this.timer=null;
}

