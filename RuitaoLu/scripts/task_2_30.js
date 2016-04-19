// 验证模块
var validate = (function(){
	// 名称验证
	var name = function(input){
		// 字符总数计算
		function count(value){
			var countNum = 0;		
			for(var i = 0;i < value.length;i++){
				var countCode = value.charCodeAt(i);
				if(countCode >= 0 && countCode <= 128){
					countNum += 1;
				}
				else{
					countNum += 2;
				}
			}
			return countNum;
		};
		var num = count(input.value);
		// 文本框下文字
		if(num == 0){
			setInfo(input,"姓名不能为空","#f00");
		}
		else if(num >= 4 && num <= 16){
			setInfo(input,"格式正确","#0f0");
		}
		else{
			setInfo(input,"字符长度为4~16","#f00");
		}
	};
	// 密码验证
	var password1 = function(password1){
		if(password1.value === ""){
			setInfo(password1,"密码不能为空","#f00");
		}
		else{
			setInfo(password1,"密码可用","#0f0");
		}
	};
	var password2 = function(password1,password2){
		if(password2.value === ""){
			setInfo(password2,"密码不能为空","#f00");
		}
		else{
			if(password1.value === password2.value){
				setInfo(password2,"密码输入一致","#0f0");
			}
			else{
				setInfo(password2,"两次输入密码不一致","#f00");
			}
		}
	}
	// 邮箱验证
	var email = function(email){
		var reg = new RegExp('^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$', 'i');
		if(email.value === ""){
			setInfo(email,"邮箱不能为空","#f00");
		}
		else{
			if(email.value.match(reg)){
				setInfo(email,"邮箱可用","#0f0");
			}
			else{
				setInfo(email,"邮箱格式错误","#f00");
			}
		}
	}
	// 手机验证
	var phone = function(phone){
		if(phone.value === ""){
			setInfo(phone,"手机号不能为空","#f00");
		}
		else{
			if(phone.value.match(/^1\d{10}$/)){
				setInfo(phone,"手机号正确","#0f0");
			}
			else{
				setInfo(phone,"手机号错误","#f00");
			}
		}	
	}
	return {
		name: name,
		password1: password1,
		password2: password2,
		email: email,
		phone: phone
	};	
}());
// 显示提示信息
function info(input){
	var tipId = input.getAttribute('id');
	var tips = document.getElementById(tipId + "_tip");			
	tips.style.display = "block";
};
// 设置提示信息
function setInfo(input,text,color){
	var tipId = input.getAttribute('id');
	var tips = document.getElementById(tipId + "_tip");
	tips.innerHTML = text;
	tips.style.color = color;
	input.style.borderColor = color;
}
var allInput = document.querySelectorAll('input');
// 为所有input绑定focus和blur事件
for(var i=0;i<allInput.length;i++){
	allInput[i].onfocus = function(){
		info(this);
	}
	switch(i){
		case 0:{	
			allInput[i].onblur = function(){
				validate.name(this);
			};
			break;
		}
		case 1:{	
			allInput[i].onblur = function(){
				validate.password1(this);
			};
			break;
		}
		case 2:{
			allInput[i].onblur = function(){
				var password1 = document.getElementById('password1');
				validate.password2(password1,this);
			};
			break;
		}
		case 3:{
			allInput[i].onblur = function(){
				validate.email(this);
			};
			break;
		}
		case 4:{
			allInput[i].onblur = function(){
				validate.phone(this);
			};
			break;
		}
	}
}
// 整体校验
var button = document.getElementById('submit');
button.onclick = function(){
	var flag = true;
	for(var i=0;i<allInput.length;i++){
		allInput[i].focus();
		allInput[i].blur();
		if(allInput[i].style.borderColor == "rgb(255, 0, 0)"){
			flag = false;
		}
	}
	if(flag){
		alert("提交成功");
	}
	else{
		alert("请将所有信息填写正确后提交");
	}
};