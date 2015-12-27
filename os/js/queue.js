/*
***** 用于创建队列模块
***** By Rbin
***** -v 1.0.0
*/

;(function(w){
	var queue=function(){
		var queueList=[],
			name=arguments[0] || "rqueue",
			length=0;
	}
	queue.prototype.dequeue=function(name){
		var item,i,len;
		if(arguments.length==0){
			item=this.queueList.shift();;			
		}else{
			for(i=0,len=this.queueList.length;i<len;i++){
				if(name===this.queueList[i].name){
					item=this.queueList[i].splice(i,1)[0];
				}
			}
		}
		item.callback();
		this.queueList.length--;
		return item;
	}

	queue.prototype.enqueue=function(){
		if(arguments.length==0){
			return ;
		}
		this.queueList=this.queueList.contact(arguments);
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