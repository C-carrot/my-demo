(function(domId){
	var root=this;
	//常量定义
	var SEARCHINFOWINDOW_WIDTH=250,
		SEARCHINFOWINDOW_HEIGHT=80,
		RESULT_PANEL= domId || "r-result";

	var MyMap=function(map,id){
		if(!map){
			return ;
		}
		this._map=map;
		this._startId=id;
		this._myPosition={
			_x:null,
			_y:null
		};
		this.mapList={};//一个对象存放在地图上放置的点（因为点不多，用对象比较方便），key保存点的名字，value保存点对象
	}
	/***------------***/
	// @param option obj
	/*	option = {
			title:String,
			icon:String,
			width,height
			phone:String,
			address:String,
			point_x:String,
			point_y:String
		}
	*/
	MyMap.prototype.setPoint=function(option){
		var point,
			myIcon,
			marker,
			label,
			info,
			searchInfoWindow,
			map=this._map,
			self=this;
			
		// if(!option || !(option.point_x&&option.point_y&&option.title&&option.icon&&option.address)){
		// 	return ;
		// }
		

		point=new BMap.Point(option.point_x, option.point_y);
		myIcon=new BMap.Icon(option.icon, new BMap.Size(option.width, option.height), {
	        anchor: new BMap.Size(35, 33)
	    });
	    // 创建标注
	    marker=new BMap.Marker(point, {
	        icon: myIcon
	    });

	    //移除之前的点，因为我的位置会随时改动，用新的点替换掉旧的点
	    if(self.mapList[option.pointName]){
	    	map.removeOverlay(self.mapList[option.pointName]);
	    }
	    self.mapList[option.pointName]=marker;

	    label = new BMap.Label(option.title, {
	        offset: new BMap.Size(20, -10)
	    });
	    map.addOverlay(marker);
	    marker.setLabel(label);
	    info="<p style='font-size:14px;line-height:1.8em;'>" + "<span>地址：" + option.address + "</span></br> <span>电话：" + option.phone + "</span></p>";
	    searchInfoWindow = new BMapLib.SearchInfoWindow(map, info, {
	        title: option.title,
	        //标题
	        width: SEARCHINFOWINDOW_WIDTH,
	        //宽度
	        height: SEARCHINFOWINDOW_HEIGHT,
	        //高度
	        panel: RESULT_PANEL,
	        //检索结果面板
	        enableAutoPan: true,
	        //自动平移
	        searchTypes: [BMAPLIB_TAB_SEARCH, //周边检索
	        BMAPLIB_TAB_TO_HERE, //到这里去
	        BMAPLIB_TAB_FROM_HERE //从这里出发
	        ]
	    });
	    marker.addEventListener('click',function(){
	    	if(!option.type||option.type!==1){

	    		searchInfoWindow.setToHereAddr(self._myPosition._x,self._myPosition._y);	
	    	}
	    	searchInfoWindow.open(marker);
	    },false);		    
	}

	MyMap.prototype.__setMyPosition=function(x,y){
		if(this._startId){
			document.querySelector('#'+this._startId).value="我的位置";
		}
		this._myPosition._x=x;
		this._myPosition._y=y;
	}

	MyMap.prototype.moveTo=function(){
		this._map.panTo(new BMap.Point(this._myPosition._x,this._myPosition._y));
	}

	MyMap.prototype.setMyPlace=function(option){
		if(!option){
			return ;
		}
		option.type=1;
	    var geolocation = new BMap.Geolocation();
	    var self=this,
	    	map=self._map,
	    	gc,address,addComp;
	    function getCurrentPosition(){
	    	geolocation.getCurrentPosition(function(r) {
		        option.point_x=r.point.lng;
		        option.point_y=r.point.lat;
		        if ( self._myPosition._x != option.point_x || self._myPosition._y!=option.point_y ) {
		            if (this.getStatus() == BMAP_STATUS_SUCCESS) {	
		            	var pt=new BMap.Point(option.point_x,option.point_y);              	
		                map.panTo(r.point);
		                // map.centerAndZoom(pt, 15);
		                gc = new BMap.Geocoder();
		                gc.getLocation(pt,
			                function(rs) {
			                    addComp = rs.addressComponents;
			                    address = addComp.district + addComp.street + addComp.streetNumber;
			                    option.address=address;
			                    option.pointName=option.title;
			                	self.setPoint(option);
			                }
			            );
		            } else {
		                alert('failed' + this.getStatus());
		            }
		            self.__setMyPosition(option.point_x,option.point_y);
		        }
		    },{
		        enableHighAccuracy: true
		    });
	    }
	    getCurrentPosition();
	    //每隔一分钟更新下自己的位置		
	    var timer=function(){
	    	setTimeout(function(){
				getCurrentPosition();
				timer();		    	
	   		},60000); 
	    } 
	    timer();
	    	
	}

	MyMap.prototype.getWay=function(start,end){
		var driving,self=this;
		if(!start) return -1;
		if(!end) return -2;
		if(this._myPosition&&!!this._myPosition._x&&!!this._myPosition._y&&start==="我的位置"){
			start=new BMap.Point(this._myPosition._x,this._myPosition._y);
		}
		driving = new BMap.DrivingRoute(
			self._map, {
				renderOptions: {
					map: self._map, 
					panel: "r-result", 
					autoViewport: true
				}
			}
		);
		driving.search(start,end);
	}

	MyMap.prototype.setStartEnd=function(id){
		//建立一个自动完成的对象
		var ac = new BMap.Autocomplete({
			"input" : id,
			"location" : this._map
		});
	}

	//将MyMap对象挂载到root的属性上
	root.MyMap=MyMap;

}).call(window,'r-result');