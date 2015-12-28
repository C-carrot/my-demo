(function($){
	$.fn.extend(
		{
			dragging:function(options){
				// 私有属性或者方法，外部访问不到
				var	that=this,					
					opts=$.extend(
									{
										moveArea:that
									}, 
									options
								),		
				 	mouseDownFun=function(){
						var e = window.event||arguments[0],
							Left=e.clientX-that.offset().left,
							Top=e.clientY-that.offset().top;
							// 利用闭包，将内部变量可以被外部访问得到
							that.Left=Left;
							that.Top=Top;						
						//添加移动事件
						$(document).on(
							'mousemove',
							 mouseMoveFun
						);
						// 添加鼠标弹起事件
						$(document).on(
							'mouseup',
							mouseUpFun
						);
					},
					mouseMoveFun=function(){
						var e = window.event||arguments[0],
							winW=document.documentElement.clientWidth || document.body.clientWidth,
							winH=document.documentElement.clientHeight || document.body.clientHeight,
							maxW=winW - opts.moveArea.width(),
							maxH=winH - opts.moveArea.height(),
							l=e.clientX - that.Left,
							h=e.clientY - that.Top;
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
						opts.moveArea.offset({
							top:h,
							left:l
						});		
					},
					mouseUpFun=function(){						
						$(document).off(
							'mousemove',
							 mouseMoveFun
						);
					};	
				// 添加鼠标点击事件			
				that.on(
					'mousedown',
					 mouseDownFun	
				);
			}
		}
	);	
}(jQuery));
$(document).ready(
	function(){
		$("#loginTitle").dragging({
			moveArea:$('#loginBox')
		});		
	}
);