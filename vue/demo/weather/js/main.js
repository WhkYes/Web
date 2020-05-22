
	/*
	  请求地址:http://wthrcdn.etouch.cn/weather_mini
	  请求方法:get
	  请求参数:city(城市名)
	  响应内容:天气信息
	
	  1. 点击回车
	  2. 查询数据
	  3. 渲染数据
	 */
	var app = new Vue({
		el:"#app",
		data:{
			city:"",
			message:[]
		},
		methods:{
			getWheater:function(){
				var that = this
				axios.get("//wthrcdn.etouch.cn/weather_mini?city="+that.city)
				.then(function(response){
					console.log(response);
					that.message =  response.data.data.forecast;
					// console.log(that.message);
				},function(err){
					console.log(err);
				})
			},
			search:function(thatCity){
				this.city = thatCity
				this.getWheater()
			}
		}
	})
