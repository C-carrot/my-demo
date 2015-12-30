/*
**轮播图插件
**autor by 小滨滨
**@param showContainer为图片展示的容器（必需），container为所有图片放置的容器（必需），checkContainer为底部小按钮的容器（必需）
**		 imgScale为图片宽高比（缩放比例），runTime为滑动的间隔时间，suspendTime为滑动完一张图片的间隔时间
**@return start为启动轮播图的方法，toLeft为控制轮播图向左滑动的方法，toRight为控制轮播图向右滑动的方法
*/
function lunbotu(showContainer,container,checkContainer,imgScale,runTime,suspendTime){
	var autoRunning=false,		
		showContainer=showContainer,
		container=container,
		checkContainer=checkContainer,
		imgLis=container.getElementsByTagName('img'),
		btnLis=checkContainer.getElementsByTagName('li'),
		index=1,//index的值为当前图片对应的序号
		imgNum=imgLis.length,
		timer,
		clientW=getClass('width',container),
		imgScale=imgScale||0.5,		
		runTime=runTime||40,
		clock=clock||1000,
		suspendTime=suspendTime||2000;

	// 初始化轮播图
	showContainer.style.width=clientW+'px';
	showContainer.style.height=clientW*imgScale+'px';
	container.style.width=clientW*imgNum+'px';
	container.style.height=clientW*imgScale+'px';
	container.style.left=(-1)*clientW+'px';
	//创建一个文档片段，性能优化
	var frag=document.createDocumentFragment();
	for(var i=1;i<=(imgNum-2);i++){
		var li=document.createElement('li');
		li.setAttribute('index',i);
		frag.appendChild(li);
	}
	checkContainer.appendChild(frag);


	//私有方法，动画运行函数，参数signed的值为-1或者1，-1表示向左滑动，1表示向右滑动
	var running=function(signed){
		var	clock=1000,//一个时钟周期，一般为1秒 
			speed=signed*clientW/(clock/runTime),//滑动的速度
			newBorder;
		newBorder=(speed<0)?(((-1)*index-1)*clientW):(((-1)*index+1)*clientW);//滑动一张图片经过的总距离
		//将自动滑动设置为真
		autoRunning=true;	
		// 判断是否滑动完一张图片
		if((parseInt(container.style.left)>newBorder&&speed<0)||(parseInt(container.style.left)<newBorder&&speed>0)){
			container.style.left=parseInt(container.style.left)+speed+'px';
			//反复调用自身，显示动画效果
			setTimeout(function(){
				running(signed);
			},runTime);
		}else{
			// 将自动播放设置为假
			autoRunning=false;	
			// 设置index的值
			if(speed<0){
				if(index==6){
					index=1;
				}else{
					index++;
				}
			}else{
				if(index==1){
					index=6;
				}else{
					index--;
				}
			}
			//底部按钮显示当前张数
			for(var i=0,len=btnLis.length;i<len;i++){
				if(i==(index-1)){
					btnLis[i].className='focus';
				}else{
					btnLis[i].className='';
				}
			}			
			//判断是否超出边界
			if(parseInt(container.style.left) <= (-1)*clientW*(imgNum-1)){
				container.style.left=(-1)*clientW+'px';
			}else if(parseInt(container.style.left) >= 0){
				container.style.left=(-1)*clientW*(imgNum-2)+'px';
			}
		}
	};

	// 向右滑动
	var toRight=function(){
		if(!autoRunning){
			running(1);
		}
	};

	// 向左滑动
	var toLeft=function(){
		if(!autoRunning){
			running(-1);
		}
	};

	// 加载计时器循环动画
	var start=function(){
		timer=setInterval(function(){
			if(!autoRunning){
				running(-1);			
			}
		},suspendTime);
	};
	
	// 暴露公有方法
	return {
		start:start,
		toLeft:toLeft,
		toRight:toRight
	}
}


/********************************\
** to get class object
** first argument is class name
** second argument is the father element of what you want to get
** and this function return a array object
\********************************/
function getClass(clsName,oParent){
	var oParent=oParent || document,
		oStr=oParent.getElementsByTagName('*'),
		lis=[];
	for(var i=0;i<oStr.length;i++){
		if(oStr[i].className==clsName){
			lis.push(oStr[i]);
		}
	}
	return lis;
}