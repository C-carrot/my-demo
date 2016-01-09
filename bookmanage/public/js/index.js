$(function(){

	var urlList=["user/login.do","manage/login.do","publish/login.do"];
	$("button").on("click",function(){
		var data,url,$val=$("[type=radio]:checked").val();
		switch($val){
			case "3":
				data={
					publish_id:$("#publish_id").val(),
					password:$("#p-password").val()
				};
				break;
			case "2":
				data={
					username:$("#m-username").val(),
					password:$("#m-password").val()
				};
				break;
			case "1":
			default:
				data={
					borrow_id:$("#borrow_id").val(),
					password:$("#u-password").val()
				};
		}
 		$.post(
 			urlList[+$val-1],
 			data,function(data){
 				if(data.status==="ok"){
 					window.location.href=data.url;
 				}else if(data.status==="error"){
 					if(data.message==0){
 						alert("用户不存在");
 					}else if(data.message==1){
 						alert("密码错误");
 					}
 				}
 			},"json"
 		);
	});

	var $toggleBar=$(".toggle-bar");
	$toggleBar.hide();
	$toggleBar.eq(0).show();
	$("[type=radio]").on("change",function(){
		var $val=$(this).val();
		$toggleBar.hide();
		$toggleBar.eq(+$val-1).show();
	});

});