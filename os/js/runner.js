function Runner(limit){
	this.timer=null;
	this.queue=window.runQueue;
	this.limit=limit || 80;
}

Runner.prototype.start=function(){
	var process;
	var limit=this.limit;

	while(this.queue.length){
		process=this.queue.dequeue();
		console.log(process,"while");

		/*
			the error code:

			this.timer=setInterval(function(){
				if("finished"===process.callback(process.el)){
					this.remove();				
				}
			}.bind(this),this.limit);	
		*/ 
		this.timer=setInterval(function(){
			console.log(process,"bb");
				if("finished"===process.callback(process.el)){
					this.remove();				
				}
			}.bind(this),this.limit);	

	}
}

Runner.prototype.stop=function(){
	clearInterval(this.timer);
}

Runner.prototype.remove=function(){
	this.timer=null;
}

