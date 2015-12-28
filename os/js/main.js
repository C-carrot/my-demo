//全局变量，表示当前使用的算法类型
var algorithmType=0;
var algorithmTxt=[
	"先来先服务调度算法","短进程优先调度算法",
	"优先权调度算法","高响应比优先调度算法",
	"时间片轮转法","多级反馈队列调度算法"];

var colors=["red","green","orange","pink","yellow"];

function main(pcb,state){
	var waitQueue=window.queue("wait"),
		runQueue=window.queue("run"),
		readyQueu=window.queue("ready");
	if(!pcb){
		return ;
	}
	state=state||"wait";
	if(state==="ready"){
		readyQueue.enqueue({
			name:pcb.name,
			pcb:pcb,
			callback:pcb.callback
		})
	}
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
	pcb.prototype.setCallback=function(callback){
		this.callback=callback;
	}
	return new pcb();
}



/*
*@params target: DOM对象，即动画条
*@params w: Number 每次动画条要移动的长度
*@return "finished" 表示该动画已经完成
*/ 
function animate(target,w){
	var oldW=parseInt(target.style.width,10),
		newW=0;
	if(!target){
		return ;
	}
	w=w||"2px";
	newW=oldW+w;
	target.style.width=newW+"px";
	if(newW >= lineW){
		return "finished";
	}
}

/*
@params target: DOM对象，要插入动画条的dom节点
@params name:   进程名称
@params colorNumb: 第几个生成的进程，函数内部将其转换不同的颜色以区分不同的进度动画条
*/
function showProcessAnimate(target,name,colorNum){
	var html,node,color;
	if(!target){
		return ;
	}
	color=colors[colorNum%colors.length];
	html='<span class="p-title">' + name + '</span>' +
		 '<div class="line">' +
		 '<div class="cover '+color+'"></div>' +
		 '</div>';
	node=document.createElement("div");
	node.classList.add("row");
	node.innerHTML=html;
	target.appendChild(node);
}

function showProcessInfo(target,name,sup,rtime){
	var html,node;
	html='<td class="i-name">'+name+'</td>'+
		'<td class="i-super">'+sup+'</td>'+
		'<td class="i-rtime">'+rtime+'</td>';
	node=document.createElement("tr");
	node.innerHTML=html;
	target.appendChild(node);						
}