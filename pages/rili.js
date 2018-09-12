var ybb = function(id){
	return "string" == typeof id ? document.getElementById(id) : id;
};
var Class = {
	create: function(){
		return function(){
			this.initialize.apply(this,arguments);
		}
	}
}
Object.extend = function(destination,source){
	for(var property in source){
		destination[property] = source[property];
	}
	return destination;
}
var Calendar = Class.create();
Calendar.prototype = {
	initialize:function(container,options){
		this.Container = ybb(container);
		this.Days = [];
		this.SetOptions(options);
		this.Year = this.options.Year;
		this.Month = this.options.Month;
		this.onToday = this.options.onToday;
		this.onSignIn = this.options.onSignIn;
		this.onFinish = this.options.onFinish;
		this.qdDay =this.options.qdDay;
		this.isSignIn = false;
		this.Draw();
//		console.log("该JS文件已经被执行！");
		
	},
	SetOptions: function(options){
		this.options = {
			Year: new Date().getFullYear(),
			Month: new Date().getMonth() + 1,
			qdDay: null,
			onToday: function(){},
			onSignIn: function(){},
			onFinish:function(){}
		};
		Object.extend(this.options, options || {});
	},
	Draw: function(){
//		console.log("Draw 被执行！")
		var day = this.qdDay;
		var arr = [];
		for(var i = 1, firstDay = new Date(this.Year,this.Month - 1,1).getDay(); i <= firstDay; i++){
			arr.push("&nbsp;");
		}
		for(var i =1, monthDay = new Date(this.Year,this.Month , 0).getDate(); i <= monthDay; i++){
			arr.push(i); 
		}
//		console.log(arr);
		var frag = document.createDocumentFragment();
		this.Days=[];
		while(arr.length>0){
			var row = document.createElement("tr");
			for(var i = 1; i <= 7; i++){
				var cell = document.createElement("td");
				cell.innerHTML = "&nbsp;";
				if(arr.length > 0){
					var d = arr.shift();
					var istoday = new Date().getDate();
					cell.innerHTML = "<span>" + d + "</span>";
//					此处给今天的日期添加背景
					if(d == istoday){
						cell.classList.add("onToday");
					}
//					传入参记录判断签到天数，在相应日期添加样式
					if(d > 0 && day.length){
//						循环参数值依次
						for(var ii = 0; ii < day.length; ii++){
							this.Days[d] = cell;
							if(this.IsSame(new Date(this.Year,this.Month - 1, d),day[ii])){
								this.onToday(cell);
							}
							if(this.checkSignIn(new Date(), day[ii])){
								this.onSignIn();
							}
						}
					}
					
				}
				row.appendChild(cell);
			}
			frag.appendChild(row);
		}
		while(this.Container.hasChildNodes()){
			this.Container.removeChild(this.Container.firstChild);
		}
		this.Container.appendChild(frag);
		this.onFinish();
		if(this.isSignIn){
			this.isSignIn = false;
			return this.SignIn();
		}
	},
	PreMonth: function(){
		
	},
	NextMonth: function(){
		
	},
	IsSame: function(d1, d2){
		d2 = new Date(d2 * 1000);
		return(d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate());
	},
	checkSignIn: function(d1, d2){
		d2 = new Date(d2 * 1000);
		return(d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate());
	},
	SignIn: function(){
		var now = new Date();
		var Year = now.getFullYear();
		var Month = now.getMonth() + 1;
		if(Year != this.Year || Month != this.Month){
			this.Year = Year;
			this.Month = Month;
			this.isSingIn = true;
			return this.Draw();
		}
		var day = now.getDate();
		var arr = new Array();
		var tb = document.getElementById('idCalendar');
		for(var i  = 0; i < tb.rows.length; i++){
			for(var j = 0; j < tb.rows[i].cells.length; j++){
				if(day == tb.rows[i].cells[j].innerText && Year == this.Year && Month == this.Month){
					if(tb.rows[i].cells[j].className == "onTaday"){
						return 2;
					}
					tb.rows[i].cells[j].className = "onSign";
					this.qdDay.push(Date.parse(new Date()) / 1000);
//					此处应当提交修改后的签到数组
					console.log(this.qdDay);
					return 1;
				}
			}
		}
	}
	
}
