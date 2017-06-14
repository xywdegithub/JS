$().ready(function() {
	$("#register_form").validate({
		rules: {
			username: "required",
			password: {
				required: true,
				minlength: 5
			},
			rpassword: {
				equalTo: "#register_password"
			},
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			username: "请输入姓名",
			password: {
				required: "请输入密码",
				minlength: jQuery.format("密码不能小于{0}个字 符")
			},
			rpassword: {
				equalTo: "两次密码不一样"
			}
		}
	});
});
  function getCurrentDb() {
            //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
            //如果数据库不存在那么创建之
            var db = openDatabase("JS", "1.0", "it's to save user data!", 1024 * 1024);
            return db;
        }
	//var dataBase = openDatabase("JS", "1.0", "用户表", 1024 * 1024, function () { });
	//if (!dataBase) {
		//alert("数据库创建失败！");
	//} else {
	//	alert("数据库创建成功！");
	//}
//dataBase.transaction(function (tx) {  
          // tx.executeSql("CREATE TABLE User (id varchar(50), password varchar(50),score integer)",[],function(tx,result){alert('succeess');},
                      //        function(tx,error){alert('fail');});  
	//}); 
	 function initDatabase() {
            var db = getCurrentDb();//初始化数据库
            if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
            db.transaction(function (trans) {//启动一个事务，并设置回调函数
                //执行创建表的Sql脚本
                trans.executeSql("create table if not exists userTable(uName text null,upwd text null,srore text null)",[],function(tx,result){alert('succeess');},
                             function(tx,error){alert('fail');});  
	}); 
        }
	  $(function () {//页面加载完成后绑定页面按钮的点击事件
            initDatabase();
	$("#register_btn").click(function() {
		$("#register_form").css("display", "block");
		$("#login_form").css("display", "none");
	});
	 function insertTable(register_user,register_password) {
            var db = getCurrentDb();//初始化数据库
            db.transaction(function (trans) {//启动一个事务，并设置回调函数
                //执行创建表的Sql脚本
                trans.executeSql("insert into userTable(uName,upwd) values(?,?) ", [register_user, register_password], function (ts, data) {
                    }, function (ts, message) {
                        alert(messaage);
                  //  });
                });
				alert('注册成功');
	 });
        }
	
	 function searchTable(register_user,register_password) {
            var db = getCurrentDb();//初始化数据库
			  db.transaction(function (trans) {//启动一个事务，并设置回调
           trans.executeSql("select * from userTable where uName=? ", [register_user],
		    function (trans, data) {
                    if (data.rows.length) {
                        alert("该用户已注册");
						$("#register_form").css("display", "block");
		                  $("#login_form").css("display", "none");
                    }
					else{
					insertTable(register_user,register_password);
					$("#register_form").css("display", "none");
			       $("#login_form").css("display", "block");
					}	
               
	 });
	  });
        }
	$("#reg_btn").click(function(){
		var register_user = $("#register_user").val();
		var register_password = $("#register_password").val();
		
               // trans.executeSql("select * from userTable ", [], function (ts, data) {
                  //  if (data.rows.length) {
                   //     alert("该用户已注册");
                  //  }
					//else{
						// db.transaction(function (trans) {
							 searchTable(register_user,register_password);
                               
				  
				//	}
                });
            
		//	});
		
		
	});  
//alert("注册成功！");	
		
	
	$("#back_btn").click(function() {
		$("#register_form").css("display", "none");
		$("#login_form").css("display", "block");
	});
	$("#login_btn").click(function(){
		var username = $("#username").val();
		var password = $("#password").val();
		
		//dataBase.transaction(function (context) {  
		//	context.executeSql('select * from userTable where userName = ?',[username],function(tx,rs){
				//	if(rs.rows.length < 0){
						 alert("该用户未注册，请先注册！");
				//	}
				//});
			//});   
		if(username == "" || username == null ){
			 alert("请输入用户名！");
		}else if( password == "" || password == null){
			 alert("请输入密码！");
			}else {
				window.open("js期末大作业.html");
				window.history.back(-1);
			//	window.location.href="js期末大作业.html";		
		}
	});  
 

