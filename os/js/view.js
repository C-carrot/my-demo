/*
@params target: DOM对象，要插入动画条的dom节点
@params name:   进程名称
@params colorNumb: 第几个生成的进程，函数内部将其转换不同的颜色以区分不同的进度动画条
*/

var content=document.getElementsByClassName("content")[0];
var infoContent=document.getElementById("info-content");
function showProcessAnimate(name,colorNum,callback){
	var html,node,color;
	var target=content;
	if(!target){
		return ;
	}
	color=colors[colorNum%colors.length];
	html='<span class="p-title">' + name + '</span>' +
		 '<div class="line">' +
		 '<div class="cover '+color+'" style="width:0px"></div>' +
		 '</div>';
	node=document.createElement("div");
	node.classList.add("row");
	node.innerHTML=html;
	target.appendChild(node);
	callback(node.getElementsByClassName('cover')[0]);
}

function showProcessInfo(name,sup,rtime){
	var html,node;
	var target=infoContent;
	html='<td class="i-name">'+name+'</td>'+
		'<td class="i-super">'+sup+'</td>'+
		'<td class="i-rtime">'+rtime+'</td>';
	node=document.createElement("tr");
	node.innerHTML=html;
	target.appendChild(node);						
}


/*
*@params target: DOM对象，即动画条
*@params w: Number 每次动画条要移动的长度
*@return "finished" 表示该动画已经完成
*/ 

var lineW=0;
function animate(target,w){
	// lineW 表示进度完成的总长度
	if(lineW==0){
		lineW=parseInt(document.getElementsByClassName("line")[0].offsetWidth,10);
	}
	var oldW=parseInt(target.style.width,10),
		newW=0;
	if(!target){
		return ;
	}
	w=w||10;
	newW=oldW+w;
	target.style.width=newW+"px";
	if(newW >= lineW){
		target.style.width=lineW+"px";
		return "finished";
	}
}

function changeTitle(title){
	var target=document.getElementById("os_title");
	target.innerHTML=title;
}

function resetProcess(target){
	target.style.width="0px";
}