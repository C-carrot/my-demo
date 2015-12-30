// 定义一些全局变量

//表示当前使用的算法类型
var algorithmType=0;

var colors=["red","green","orange","pink","yellow"];

var algorithmTypeList=[
		"先来先服务调度算法","短进程优先调度算法",
		"优先权调度算法","高响应比优先调度算法",
		"时间片轮转法"
	]

var readyQueue=window.readyQueue={};

var dataList=window.dataList=[];