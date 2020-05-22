/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
  
*/
var app = new Vue({
	el:".wrap",
	data:{
		// 查询音乐名称
		query:"",
		// 查询音乐返回列表
		musicList:[],
		//音乐url
		musicUrl:"",
		//音乐图片
		picUrl:"",
		//热评
		hotComments:[],
		//音乐播放状态
		isplay:false,
		// 获取mv url
		mvUrl:"",
		// 遮罩层的显示状态
		isShow:false
	},
	methods:{
		// 搜索音乐
		getMusic:function(){
			var that = this
			axios.get("https://autumnfish.cn/search?keywords="+this.query)
			.then(function(response){
				// console.log(response);
				that.musicList = response.data.result.songs
				// console.log(that.musicList);
				
			},function(err){
				console.log(err);
			})
		},
		// 播放音乐
		playMusic:function(musicID){
			var that = this
			// 设置音乐播放
			axios.get("https://autumnfish.cn/song/url?id="+musicID)
			.then(function(response){
				// console.log(response);
				// console.log(response.data.data[0].url);
				that.musicUrl = response.data.data[0].url;
				
			},function(err){
				console.log(err);
			})
			// 设置音乐图片
			axios.get("https://autumnfish.cn/song/detail?ids="+musicID)
			.then(function(response){
				// console.log(response);
				// console.log(response.data.songs[0].al.picUrl);
				that.picUrl = response.data.songs[0].al.picUrl;
			},function(err){
				console.log(err);
			})
			// 设置音乐评论
			axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicID)
			.then(function(response){
				// console.log(response);
				// console.log(response.data.hotComments);
				that.hotComments = response.data.hotComments
			},function(err){
				console.log(err);
			})
			
		},
		// 设置音乐动画
		play:function(){
			this.isplay = true
		},
		pause:function(){
			this.isplay = false
		},
		// 设置音乐MV
		playVideo:function(videoID){
			var that = this
			axios.get("https://autumnfish.cn/mv/url?id="+videoID)
			.then(function(response){
				// console.log(response);
				that.mvUrl = response.data.data.url;
				// console.log(that.mvUrl);
				// that.hotComments = response.data.hotComments
			},function(err){
				console.log(err);
			})
		},
		isShowMv:function(){
			this.isShow = !this.isShow
			this.mvUrl = ""
		}
	}
})