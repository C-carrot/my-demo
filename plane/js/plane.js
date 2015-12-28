var mainDiv=document.getElementById('main-area'),
	scores=0;
function Plane(planeData){	
	var plane=this;		
	for(var i in planeData){
		plane[i]=planeData[i];
	}
	if(plane.type!="myplane"){
		plane.x=random(plane.width,(320-plane.width));
	}
	if(plane.type=='enemy_s'){
		plane.speed=random(1,4);
	}
	if(plane.type=='enemy_m'){
		plane.speed=random(1,3);
	}
	plane.div=null;
	plane.div=document.createElement('div');	
	plane.div.style.position='absolute';
	plane.div.style.top=plane.y+'px';
	plane.div.style.left=plane.x+'px';
	plane.div.style.width=plane.width+'px';
	plane.div.style.height=plane.height+'px';
	plane.div.style.zIndex=2;
	plane.div.style.backgroundImage="url('"+plane.image+"')";
	mainDiv.appendChild(plane.div);
	plane.autoMove=function(){
		if(plane.type!='myplane'){
			if(scores<=50000){
				plane.div.style.top=plane.div.offsetTop+plane.speed+"px";
			}
			else if(scores>50000&&scores<=100000){
           		plane.div.style.top=plane.div.offsetTop+plane.speed+1+"px";
     		}
      		else if(scores>100000&&scores<=150000){
            	plane.div.style.top=plane.div.offsetTop+plane.speed+2+"px";
      		}
     	   	else if(scores>150000&&scores<=200000){
            	plane.div.style.top=plane.div.offsetTop+plane.speed+3+"px";
        	}
        	else if(scores>200000&&scores<=300000){
        	    plane.div.style.top=plane.div.offsetTop+plane.speed+4+"px";
        	}
        	else{
        	    plane.div.style.top=plane.div.offsetTop+plane.speed+5+"px";
        	}        	
		}
	}
}
//创建子弹类
function bullet(X,Y,width,height,image){
	this.width=width;
	this.height=height;
	this.state='active';
	this.outside=false;
	this.div=document.createElement("div");
	this.div.style.position='absolute';
	this.div.style.zIndex=2;
	this.div.style.left=X+'px';
	this.div.style.top=Y+'px';	
	this.div.style.width=this.width+'px';
	this.div.style.height=this.height+'px';
	this.div.style.backgroundImage="url('"+image+"')";
	mainDiv.appendChild(this.div);
	this.autoMove=function(){
		this.div.style.top=this.div.offsetTop-20+'px';
		this.outside=boundary(this.div);
	}
}
//创建单行子弹类
function oddbullet(X,Y){
	// bullet.call(this,X,Y,6,14,"image/bullet.png");
	bullet.apply(this,[X,Y,6,14,"image/bullet.png"]);
}

//产生随机数
function random(a,b){
	return Math.floor(a+Math.random()*(b-a));
}
//自定义事件
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