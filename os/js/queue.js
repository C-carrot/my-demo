/*
***** 用于创建队列模块
***** By Rbin
***** -v 1.0.0
*/

;(function(w){
	var queue=function(){
		this.queueList=[];
		this.length=0;
		this.name=arguments[0] || "rqueue";
	}
	queue.prototype.dequeue=function(bool){
		var item,i,len;
		if(arguments.length==0){
			item=this.queueList.shift();;			
		}
		if(bool){
			item.callback();
		}
		this.length--;
		return item;
	}

	/*
		@params *Object: args1,args2,args3 ...
		@args1: {
			name: String,
			pcb: Object,
			callback:Function
		}
	*/ 
	queue.prototype.enqueue=function(){
		if(arguments.length==0){
			return ;
		}
		arguments.length==1 ?
			this.queueList.push(arguments[0]):
			this.queueList=this.queueList.contact.apply(null,arguments);
		this.length+=arguments.length;
	}
	queue.prototype.remove=function(){
		delete this.queueList;
		delete this.rid;
		delete this.length;
	}
	queue.prototype.getLength=function(){
		return this.length;
	}

	function initQueue(name){
		var obj=new queue(name);
		return obj;
	}

	w.queue=initQueue;


	
})(window);