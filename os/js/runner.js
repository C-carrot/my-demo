function Runner(limit){
	this.queue=window.readyQueue;
	this.limit=limit || 40;
	this.timeout=null;
}

Runner.prototype.setTime=function(time){
	this.timeout=time;
}


Runner.prototype.start=function(flag){
	var p;
	var limit=this.limit;
	var callbacksList=[];
	var asncyQueue;
	
	flag=Number(flag)||0;
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

	// the solution of Promise , define a async dequeue in asyncQueue.js which based on Promise

	
	
	if(flag<=2){
		if(flag===1){
			//flag===1 短进程优先，根据rtime来对就绪队列进行排序
			this.queue.sort(function(a,b){
				return a.rtime-b.rtime;
			});
		}else if(flag===2){
			// flag===2 优先级优先，根据super来排序
			this.queue.sort(function(a,b){
				return a.super-b.super;
			});
		}
		// flag===0 则是先来先服务，在之前队列已经按照进程入队的顺序排好序了，因此不用再排
		while(this.queue.getLength()){
			p=this.queue.dequeue();
			callbacksList.push({
				callback:function(resolve,reject,pcb){
					var timer=null;
					timer=setInterval(function(){
						if("finished"===pcb.callback(pcb.el)){
							clearInterval(timer);
							timer=null;
							resolve();
						}
					},limit);
				},
				args:p
			});
		}
		asyncQueue=new AsncyQueue(callbacksList);
		asyncQueue.start();
	}
	//高响应比优先调度算法 
	if(flag===3){
		// 先按照运行时间对就绪队列中的进程进行排序
		this.queue.sort(function(a,b){
			return a.rtime-b.rtime;
		});
		while(this.queue.getLength()){
			p=this.queue.dequeue();
			callbacksList.push({
				callback:function(resolve,reject,pcb,queue){
					var timer=null;
					timer=setInterval(function(){
						if("finished"===pcb.callback(pcb.el)){
							queue.queueList.forEach(function(p){
								p.ntime+=pcb.rtime;
							});
							queue.sort(function(a,b){
								return (a.rtime+a.ntime)/a.rtime - (b.rtime+b.ntime)/b.rtime;
							});
							clearInterval(timer);
							timer=null;
							resolve();
						}
					},limit);
				},
				args:[p,this.queue]
			})
		}
		asyncQueue=new AsncyQueue(callbacksList);
		asyncQueue.start();
	}
	// 时间片轮转算法
	if(flag===4){
		var num=10;
		var self=this;
		limit=this.timeout/num;
		function turn(){
			var pcbNum=self.queue.getLength();
			callbacksList=[];
			asyncQueue=null;
			while(self.queue.getLength()){
				p=self.queue.dequeue();
				callbacksList.push({
					callback:function(resolve,reject,pcb,queue,pnum){
						var timer=null;
						var index=0;
						timer=setInterval(function(){
							index++;
							if("finished"===pcb.callback(pcb.el)){
								clearInterval(timer);
								timer=null;
								pnum++;
								resolve(pnum);
							}else if(index>=num){
								queue.enqueue(pcb);
								clearInterval(timer)
								timer=null;
								pnum++;
								resolve(pnum);
							}
						},limit);
					},
					args:[p,self.queue]					
				});
			}
			callbacksList.push({
				callback:function(resolve,reject,num){
					if(!!pcbNum&&num===pcbNum){
						turn();
					}
				}
			})
			asyncQueue=new AsncyQueue(callbacksList);
			asyncQueue.start(0);
		};
		turn();
	} 
}