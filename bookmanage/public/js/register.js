$(function(){

	var urlList=["user/register.do","manage/register.do","publish/register.do"];
	$("button").on("click",function(){
		var data,url,$val=$("[type=radio]:checked").val();
		switch($val){
			case "3": 				
				data={
					publish_id:$("#publish_id").val(),
					password:$("#p-password").val(),
					tel_code:$("#tel_code").val(),
					tel:$("#tel").val(),
					zip_code:$("#zip_code").val(),
					address:$("#address").val()
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
					username:$("#u-username").val(),
					password:$("#u-password").val(),
					company:$("#company").val()
				};
		}
 		$.post(
 			urlList[+$val-1],
 			data,function(data){
 				if(data.status==="ok"){
 					window.location.href=data.url;
 				}else if(data.status==="error"){
 					alert("注册失败，已存在相同名字的用户");
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