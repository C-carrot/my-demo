function getClass(clsName,parent){
	var oParent=parent ? document.getElementById(parent) : document,
		eles=oParent.getElementsByTagName("*"),
		lis=[];
	for(var i=0,l=eles.length;i<l;i++){
		if(eles[i]==clsName){
			lis+=eles[i];
		}
	}
	return lis;
}

function allEvent(obj,events,fn){
	this.addEvent=function(){
		if(document.addEventListener){
			obj.addEventListener(events,fn,false);
		}else if(document.attachEvent){
			obj.attachEvent('on'+events,fn);
		}		
	};
	this.removeEvent=function(){
		if(document.removeEventListener){
			obj.removeEventListener(events,fn,false);
		}else if(document.detachEvent){
			obj.detachEvent('on'+events,fn);
		}
	};
}
var loginTitle=document.getElementById('loginTitle'),
	mousedownEvent=new allEvent(
							loginTitle,
							'mousedown',
							function(){
								var e = window.event||arguments[0],
									loginBox=document.getElementById('loginBox'),
									Left=e.clientX-loginBox.offsetLeft,
									Top=e.clientY-loginBox.offsetTop,
									dragDemo=new drag(Left,Top),
									mousemoveEvent=new allEvent(document,'mousemove',dragDemo.move),
									mouseupEvent=new allEvent(
														document,
														'mouseup',
														function(){
															mousemoveEvent.removeEvent();
															mouseupEvent.removeEvent();
														}
													);
								mousemoveEvent.addEvent();								
								mouseupEvent.addEvent();
							}
						);						
	mousedownEvent.addEvent();
function drag(Left,Top){
	this.move=function(){
		var e = window.event||arguments[0],
		loginBox=document.getElementById('loginBox'),
		winW=document.documentElement.clientWidth || document.body.clientWidth,
		winH=document.documentElement.clientHeight || document.body.clientHeight,
		maxW=winW - loginBox.offsetWidth,
		maxH=winH - loginBox.offsetHeight,
		l=e.clientX - Left,
		h=e.clientY - Top;
		if(l<0){
			l=0;
		}else if(l>maxW){
			l=maxW;
		}
		if(h<0){
			h=0;
		}else if(h>maxH){
			h=maxH;
		}
		loginBox.style.top = h + "px";
		loginBox.style.left = l + "px";	
	};
}