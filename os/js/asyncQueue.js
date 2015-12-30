/*
*** 使用Promise来实现一个异步队列
*** By Rbin
*/ 

/*
***@params list: Array
*** {
		callback: Function
		args: String
	}

	eg: 
		
		var list=[
			{
				callback:function(resolve,reject,args1,lastPromiseVal){
					var index = args;
					var timer=setInterval(function(){
						index++;
						if(index>=20){
							console.log(index);
							clearInterval(timer);
							timer=null;
							resolve(index);
						}
					},10);
				},
				args:10
			},
			{
				callback:function(resolve,reject,args){
					console.log("bb",arguments);
				},
				args:123
			}
		];

		var asncyQueue=new AsncyQueue(list);
		asncyQueue.start();
*/
function AsncyQueue(list){

	var callbacks=[];
	var isStart=false;

	list.forEach(function(obj){		
		callbacks.push(pInstance.bind(null,obj));
	});

	function pInstance(obj){
		var args,pargs;
			pargs=[].slice.call(arguments,1);
		// pargs为pInstance除了第一个参数外的参数，该参数是上一个promise传递过来的
		return new Promise(function(resolve,reject){
			// args为参数列表，类似于[resolve,reject,"obj自身带的参数","上一个promise传递过来的值"]
			if(obj.args){
				args=[].concat.call([resolve,reject],obj.args);
			}else{
				args=[].concat.call([resolve,reject]);
			}
			if(pargs){
				args=[].concat.call(args,pargs);
			}
			obj.callback.apply(obj.context||null,args);
		});
	}

	function start(val){
		var p,i,len;
		if(isStart){
			return ;
		}
		isStart=true;
		p=Promise.resolve(val);
		for(i=0,len=callbacks.length;i<len;i++){
			p=p.then(callbacks[i]);
		}
	}

	return {
		start:start
	}
}
