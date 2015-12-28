var markerArr = [
	{
	    point_x: 113.369462,
	    point_y: 23.04591,
	    address: " 番禺区 大学城西六路168号(近广州大学)",
	    title: "大学城科学中心",
	    phone: "020-39348080"
	},
	{
	    point_x: 113.391176,
	    point_y: 23.060267,
	    address: "广东省广州市番禺区广州大学城外环西路378号",
	    title: "华南师范大学大学城校区学生公寓",
	    phone: "----------"
	},
	{
	    point_x: 113.383332,
	    point_y: 23.045341,
	    address: "广东省广州市番禺区中环西路",
	    title: "广大公寓",
	    phone: "----------"
	},
	{
	    point_x: 113.406579,
	    point_y: 23.067457,
	    address: "大学城北四路附近",
	    title: "广东外语外贸大学大学城校区学术交流中心",
	    phone: "39328328"
	},
	{
	    point_x: 113.412688,
	    point_y: 23.04581,
	    address: "广州大学城小谷围街立德街66号",
	    title: "广州大学城雅乐轩酒店",
	    phone: "(020)31000888"
	},
	{
	    point_x: 113.398245,
	    point_y: 23.067832,
	    address: "广州市番禺区大学城中二横路1号GOGO新天地商业广场4楼",
	    title: "盈点酒店（寿司回廊）",
	    phone: "020-39158288"
	},
	{
	    point_x: 113.421775,
	    point_y: 23.060117,
	    address: "番禺区小谷围街大学城外环东路280号学术交流中心",
	    title: "南国会国际会议中心",
	    phone: "(020)39338888"
	},
	{
	    point_x: 113.402652,
	    point_y: 23.044471,
	    address: "广州市番禺区大学城广州工业大学内",
	    title: "广东工业大学(大学城校区)-图书馆",
	    phone: "--------"
	}
];
function ready(){
	var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://api.map.baidu.com/api?v=2.0&ak=PLKWEcNBKfx5YuhWnldtmWnq&callback=init";
		document.body.appendChild(script);
}

function init(){
	var map = new BMap.Map("map"); // 创建Map实例
	map.centerAndZoom(new BMap.Point(113.402652, 23.044471), 15); 
	var navigationControl = new BMap.NavigationControl({
	    // 靠左上角位置
	    anchor: BMAP_ANCHOR_TOP_LEFT,
	    // LARGE类型
	    type: BMAP_NAVIGATION_CONTROL_LARGE,
	    // 启用显示定位
	    enableGeolocation: true
	});
	map.addControl(navigationControl);
	
	map.enableScrollWheelZoom(true); //启用滚轮放大缩小
	//地图、卫星、混合模式切换
	//map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP]}));
	//向地图中添加缩放控件
	var ctrlNav = new window.BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE
    });
    map.addControl(ctrlNav);
    //向地图中添加缩略图控件
    var ctrlOve = new window.BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        isOpen: 1
    });
    map.addControl(ctrlOve);
    //向地图中添加比例尺控件
    var ctrlSca = new window.BMap.ScaleControl({
        anchor: BMAP_ANCHOR_BOTTOM_LEFT
    });
    map.addControl(ctrlSca);

    var geolocationControl = new BMap.GeolocationControl();
    map.addControl(geolocationControl);
  	
	var mymap=new MyMap(map,'start');
	mymap.setMyPlace({
		icon:"images/marker_red_sprite.png",
		width:39,
		height:25,
		phone:"",
		title:"我的位置"
	});
	for(var i=0,len=markerArr.length;i<len;i++){
		mymap.setPoint({
			icon:"images/marker_red_sprite.png",
			width:39,
			height:25,
			title:markerArr[i].title,
			pointName:markerArr[i].title,
			point_x:markerArr[i].point_x,
			point_y:markerArr[i].point_y,
			phone:markerArr[i].phone,
			address:markerArr[i].address
		})
	}


	mymap.setStartEnd('start');
	mymap.setStartEnd('end');

	var startInput=document.querySelector('#start'),
		endInput=document.querySelector('#end'),
		getBtn=document.querySelector('#getWay');
	getBtn.addEventListener('click',function(){
		var result=mymap.getWay(startInput.value,endInput.value);
		if(result===-1){
			startInput.focus();
		}else if(result===-2){
			endInput.focus();
		}
	},false);

}

window.addEventListener('load',ready,false);