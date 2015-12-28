function start(){
	var data=this,
		startArea=document.getElementById('start-area'),
		suspendArea=document.getElementById('suspend-area'),
		endArea=document.getElementById('end-area'),
		startBtn=document.getElementById('start-btn'),
		continueBtn=document.getElementById('continue-btn'),
		restartBtn=document.getElementById('restart-btn'),
		againBtn=document.getElementById('again-btn'),
		scoreTxt=document.getElementById('score-text'),
		coverArea=document.getElementById('cover-area'),
		planeScore=document.getElementById('planes-score');
	data.move=function(obj){
		var mousedownEvt=new allEvent(
				mainDiv,
				'mousedown',
				function(){
					var mousemoveEvt=new allEvent(
							document,
							'mousemove',
							function(){
									var e=window.event||arguments[0],
										X=e.clientX-mainDiv.offsetLeft,
										Y=e.clientY;
									if(e.clientX<=mainDiv.offsetLeft+obj.width/2){
										X=obj.width/2;
									}
									if(e.clientX>=(mainDiv.offsetLeft+320-obj.width/2)){
										X=320-obj.width/2;
									}
									if(e.clientY<obj.height/2){
										Y=obj.height/2;
									}
									if(e.clientY>(568-obj.height/2)){
										Y=568-obj.height/2;
									}
									obj.div.style.left=X-obj.width/2+'px';
									obj.div.style.top=Y-obj.height/2+'px';
							}),
						mouseupEvt=new allEvent(
							mainDiv,
							'mouseup',
							function(){
								mousemoveEvt.removeEvent();
								mouseupEvt.removeEvent();
							});
					mousemoveEvt.addEvent();
					mouseupEvt.addEvent();
				}
			),
			keydownEvt=new allEvent(
				document,
				'keydown',
				function(){
					var e=window.event||arguments[0];
					switch(e.keyCode||e.which){
						case 37:
								obj.div.style.left=obj.div.offsetLeft-15+'px';
								if(parseInt(obj.div.style.left)<=0){
									obj.div.style.left=0+'px';
								}
								break;
						case 39:
								obj.div.style.left=obj.div.offsetLeft+15+'px';
								if(parseInt(obj.div.style.left)>=(320-parseInt(obj.div.offsetWidth))){
									obj.div.style.left=320-parseInt(obj.div.offsetWidth)+'px';
								}
								break;
						case 38:
								obj.div.style.top=obj.div.offsetTop-15+'px';
								if(parseInt(obj.div.style.top)<=0){
									obj.div.style.top=0+'px';
								}
								break;
						case 40:
								obj.div.style.top=obj.div.offsetTop+15+'px';
								if(parseInt(obj.div.style.top)>=(568-parseInt(obj.div.offsetHeight))){
									obj.div.style.top=568-parseInt(obj.div.offsetHeight)+'px';
								}
								break;
						default:break;			
					}	
				}	
			);	
			this.add=function(){
				mousedownEvt.addEvent();
				keydownEvt.addEvent();
			}	
			this.remove=function(){
				mousedownEvt.removeEvent();
				keydownEvt.removeEvent();
			}						
	};
	data.crash=function(enemy,obj){
		if(obj){
			var wing=0;
			if(obj.type=='myplane'){
				wing=20;
			}
			if(((enemy.div.offsetLeft+enemy.width)>=(obj.div.offsetLeft+wing)) && ((obj.div.offsetLeft+obj.width-wing)>=enemy.div.offsetLeft)){	
				if(((enemy.div.offsetTop+enemy.height)>=obj.div.offsetTop) && ((obj.div.offsetTop+obj.height)>=enemy.div.offsetTop)){
					return true;
				}
			}else{
				return false;
			}
		}
	};
	data.boundary=function(obj){
		if((parseInt(obj.style.top)+parseInt(obj.style.height))<=0||parseInt(obj.style.top)>568){
			return true;
		}else{
			return false;
		}
	};
	data.demo=function(){
		var	mark=0,
			mark1=0,
			timer=null,
			positionY=0,
			enemys=[],
			bullets=[],
			startEvt=this,
			flag=true,
			ourplane=new Plane(myplane),
			suspendEvt=new allEvent(
				document,
				'keydown',
				function(){
					var e=window.event||arguments[0];
					if(e.keyCode==32||e.which==32){
						if(flag){
							ourplane.suspend=true;
							suspendArea.style.display='block';	
							clearInterval(timer);					
							coverArea.style.display="block";
							flag=false;
						}else{
							suspendArea.style.display='none';
							coverArea.style.display='none';					
							ourplane.suspend=false;
							timer=setInterval(startEvt.loop,20);
							flag=true;
						}
					}					
				}),
			continueEvt=new allEvent(
				continueBtn,
				'click',
				function(){
					suspendArea.style.display='none';
					coverArea.style.display='none';					
					ourplane.suspend=false;
					timer=setInterval(startEvt.loop,20);
				}
			);
			suspendEvt.addEvent();
			continueEvt.addEvent();	
		var moveEvt=new data.move(ourplane);
		startArea.style.display='none';
		mainDiv.style.display='block';		
		setInterval(
			function(){
				if(ourplane&&!ourplane.suspend){
					moveEvt.add();
				}else{
					moveEvt.remove();
				}
			},
			20
			);
		startEvt.loop=function(){					
				//计算分数
				scoreTxt.innerHTML=scores;
				planeScore.innerHTML=scores;
				//背景图自动往下移动
				mainDiv.style.backgroundPositionY=positionY+'px';
				positionY+=0.5;
				if(positionY>=568){
					positionY=0;
				}
				if(ourplane&&ourplane.state=='active'){					
					mark++;
					//生成小、中、大敌机
					if(mark==30){
						enemys.push(new Plane(enemyS));
						mark1++;
						if(mark1%5==0){
							enemys.push(new Plane(enemyM));
						}
						if(mark1==20){
							enemys.push(new Plane(enemyL));
							mark1=0;
						}						
						mark=0;
					}
					// 生成子弹
					if(mark%8==0){
						bullets.push(new oddbullet(parseInt(ourplane.div.style.left)+31,parseInt(ourplane.div.style.top)-10));
					}
				}else{
					endArea.style.display="block";
					if(ourplane){
						ourplane.dieTimes+=20;
						if(ourplane.dieTimes>=ourplane.totalTime){
							mainDiv.removeChild(ourplane.div);
							ourplane=null;							
						}
					}
					var enemysLength=enemys.length;
					if(enemysLength<=0){
						clearInterval(timer);
					}
				}
				// 移动敌机
				var enemysLength=enemys.length;
				for(var i=0;i<enemysLength;i++){
					if(enemys[i].state=='active' && !enemys[i].outside){
						enemys[i].autoMove();
						enemys[i].outside=boundary(enemys[i].div);
					}				
					if(enemys[i].outside){					
						mainDiv.removeChild(enemys[i].div);
						enemys.splice(i,1);
						enemysLength--;
					}		
					if(enemys[i]&&enemys[i].state=='dead'){
						enemys[i].dieTimes+=20;
						if(enemys[i].dieTimes>=enemys[i].totalTime){
							mainDiv.removeChild(enemys[i].div);
							enemys.splice(i,1);				
							enemysLength--;
						}
					}			
				}			
				// 移动子弹
				var bulletsLength=bullets.length;
				for(var i=0;i<bulletsLength;i++){
					if(bullets[i].state=='active' && !bullets[i].outside){
						bullets[i].autoMove();
						bullets[i].outside=boundary(bullets[i].div);
					}
					if(bullets[i].state=='dead' || bullets[i].outside){
						mainDiv.removeChild(bullets[i].div);
						bullets.splice(i,1);
						bulletsLength--;
					}
				}
				//判断是否发生碰撞
				//判断子弹击中敌机
				for(var i=0;i<enemysLength;i++){
					for(var j=0;j<bulletsLength;j++){
						if(enemys[i].state=='active'){
							if(enemys[i].health==0){
								enemys[i].div.style.background="";
								enemys[i].div.style.background="url('"+enemys[i].boomImage+"')";
								enemys[i].state='dead';
								scores+=enemys[i].score;	
							}
							if(data.crash(enemys[i],bullets[j])){		
								enemys[i].health--;					
								bullets[j].state='dead';
							}		
						// 判断敌机与本方飞机相碰撞					
							if(data.crash(enemys[i],ourplane)){
								ourplane.div.style.background="";
								ourplane.div.style.background="url('"+ourplane.boomImage+"')";
								ourplane.state='dead';						
							}
						}
					}
				}
			}	
		timer=setInterval(startEvt.loop,20);
	};
	data.controller=function(){
		startBtn.onclick=function(){
			data.demo();
		}
		restartBtn.onclick=function(){
			location.reload(true);
		}
		againBtn.onclick=function(){
			location.reload(true);
		}
	};
	data.controller();	
}
window.onload=start;