// 验证模块
var validate = (function(){
	// 名称验证
	var name = function(inputValue){
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

		var num = count(inputValue);

		if(num == 0){
			tip.innerHTML = "姓名不能为空";
			tip.style.color = "#f00";
			input.style.border = "1px solid #f00";
		}
		else if(num >= 4 && num <= 16){
			tip.innerHTML = "格式正确";
			tip.style.color = "#0f0";
			input.style.border = "1px solid #0f0";
		}
		else{
			tip.innerHTML = "字符长度为4~16";
			tip.style.color = "#f00";
			input.style.border = "1px solid #f00";
		}
	};

	return {
		name: name
	}	
}());