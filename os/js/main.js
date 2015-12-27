function main(){
	var waitQueue=window.queue("wait"),
		runQueue=window.queue("run"),
		readyQueu=window.queue("ready");
}

function PCB(name,state,super,ntime,rtime){
	this.name=name || null;
	this.state=state || "ready";
	this.super=super || 0;
	this.ntime=ntime || 0;
	this.rtime=rtime || 0;
}