/**
	* textList 为静态弹幕，可根据自身需求修改定制。
	*/
	var textList = "琵琶行，白居易，浔阳江头夜送客，枫叶荻花秋瑟瑟。主人下马客在船，举酒欲饮无管弦。醉不成欢惨将别，别时茫茫江浸月。忽闻水上琵琶声，主人忘归客不发。寻声暗问弹者谁？琵琶声停欲语迟。移船相近邀相见，添酒回灯重开宴。千呼万唤始出来，犹抱琵琶半遮面。转轴拨弦三两声，未成曲调先有情。弦弦掩抑声声思，似诉平生不得志。低眉信手续续弹，说尽心中无限事。轻拢慢捻抹复挑，初为霓裳后六幺。大弦嘈嘈如急雨，小弦切切如私语。嘈嘈切切错杂弹，大珠小珠落玉盘。间关莺语花底滑，幽咽泉流冰下难。冰泉冷涩弦凝绝，凝绝不通声渐歇。别有幽愁暗恨生，此时无声胜有声。银瓶乍破水浆迸，铁骑突出刀枪鸣。曲终收拨当心画，四弦一声如裂帛。东船西舫悄无言，惟见江心秋月白。沉吟放拨插弦中，整顿衣裳起敛容。自言本是京城女，家在虾蟆陵下住。十三学得琵琶成，名属教坊第一部。曲罢曾教善才服，妆成每被秋娘妒。武陵年少争缠头，一曲红绡不知数。钿头银篦击节碎，血色罗裙翻酒污。今年欢笑复明年，秋月春风等闲度。弟走从军阿姨死，暮去朝来颜色故。门前冷落车马稀，老大嫁作商人妇。商人重利轻别离，前月浮梁买茶去。去来江口求空船，绕船月明江水寒。夜深忽梦少年事，梦啼红妆泪阑干。我闻琵琶已叹息，又闻此语重唧唧。同是天涯沦落人，相逢何必曾相识。我从去岁辞帝京，谪居卧病浔阳城。浔阳地僻无音乐，终岁不闻丝竹声。住近湓城地低湿，黄芦苦竹绕宅生。其间旦暮闻何物？杜鹃啼血猿哀鸣。春江花朝秋月夜，往往取酒还独倾。岂无山歌与村笛？呕哑嘲哳难为听。今夜闻君琵琶语，如听仙乐耳暂明。莫辞更坐弹一曲，为君翻作琵琶行。感我此言良久立，却坐促弦弦转急。凄凄不似向前声，满座重闻皆掩泣。座中泣下谁最多？江州司马青衫湿";
	//将字符串拆分成数组
	var textArray = textList.split(/，|。|？/);
	/**
	* 弹幕发送定时任务
	*/
	var intval = setInterval(function(){
		var tmp = textArray.shift();
		textArray.push(tmp);
		sendDanmu(tmp);
	},500);//

	/**
	* 弹幕状态标识，
	*/
	var danmu = 1;
	/**
	* 发送弹幕方法
	*/
	function sendDanmu(message,color="white")
	{
		//弹幕高度随机
		var margintop = Math.random()*320;
		if (danmu) {
			 $("#video-body").append("<div class='active' style='top:"+margintop+"px;color:"+color+"'>"+message+"</div>");
		} else {
			$("#video-body").append("<div class='active' style='top:"+margintop+"px;animation-play-state:paused;color:"+color+"'>"+message+"</div>");
		}
	}
	/**
	* 点击添加按钮快速发送消息
	*/
	$("#btn").click(function(){
		sendDanmu('我是一条发送到聊天室的消息');
	})

	/**
	* 点击暂停开始按钮实现弹幕和视频暂停开始功能
	*/
	$('#pause').click(function(){
		var danmuState = $('.active').css('animation-play-state');
		if (danmuState==='running') {
			danmu = 0;
			document.getElementById('video').pause()
			$('.active').css({'animation-play-state':'paused'})
			$('#pause').html('开始')
		} else {
			danmu = 1;
			document.getElementById('video').play()
			$('.active').css({'animation-play-state':'running'})
			$('#pause').html('暂停')
		}
		
		
	})
	/**
	* 发送消息按钮，点击发送将push input框消息到服务器端，并清空input框。
	* 此处targetId为聊天室Id，勿和用户id混淆。
	*/
	$("#send").click(function(){
		var user_msg = $('#user-input').val()
		var msg = new RongIMLib.TextMessage({content:user_msg,extra:"附加信息"});
		var conversationtype = RongIMLib.ConversationType.CHATROOM; // 单聊,其他会话选择相应的消息类型即可。
		var targetId = '1'; // 目标 Id
		RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                onSuccess: function (message) {
                    //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                    sendDanmu(message.content.content);
                    $('#user-input').val('')
                },
                onError: function (errorCode,message) {
                    var info = '';
                    switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                            info = '超时';
                            break;
                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                            info = '未知错误';
                            break;
                        case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                            info = '在黑名单中，无法向对方发送消息';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                            info = '不在讨论组中';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_GROUP:
                            info = '不在群组中';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                            info = '不在聊天室中';
                            break;
                        default :
                            info = x;
                            break;
                    }
                    console.log('发送失败:' + info);
                }
            }
        );
	})
/*************设置监听器*************/
	// 设置连接监听状态 （ status 标识当前连接状态 ）
 	// 连接状态监听器
 	RongIMClient.setConnectionStatusListener({
    	onChanged: function (status) {
	        switch (status) {
	            case RongIMLib.ConnectionStatus.CONNECTED:
	                console.log('链接成功');
	                break;
	            case RongIMLib.ConnectionStatus.CONNECTING:
	                console.log('正在链接');
	                break;
	            case RongIMLib.ConnectionStatus.DISCONNECTED:
	                console.log('断开连接');
	                //断开自动重连
	                var callback = {
				        onSuccess: function(userId) {
				            console.log("Reconnect successfully." + userId);
				        },
				        onTokenIncorrect: function() {
				            console.log('token无效');
				        },
				        onError:function(errorCode){
				            console.log(errorcode);
				        }
				    };
				    var config = {
				        // 默认 false, true 启用自动重连，启用则为必选参数
				        auto: true,
				        // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
				        url: 'cdn.ronghub.com/RongIMLib-2.2.6.min.js',
				        // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
				        rate: [100, 1000, 3000, 6000, 10000]
				    };
				    RongIMClient.reconnect(callback, config);
	                break;
	            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
	                console.log('其他设备登录');
	                break;
	              case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
	                console.log('域名不正确');
	                break;
	            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
	              console.log('网络不可用');
	              break;
	        }
    }});

 	// 消息监听器
 	RongIMClient.setOnReceiveMessageListener({
    // 接收到的消息
    onReceived: function (message) {
        // 判断消息类型
        switch(message.messageType){
            case RongIMClient.MessageType.TextMessage:
            		console.log(message)
            		sendDanmu(message.content.content,'red');
                // message.content.content => 消息内容
                break;
            case RongIMClient.MessageType.VoiceMessage:
                // 对声音进行预加载                
                // message.content.content 格式为 AMR 格式的 base64 码
                break;
            case RongIMClient.MessageType.ImageMessage:
               // message.content.content => 图片缩略图 base64。
               // message.content.imageUri => 原图 URL。
               break;
            case RongIMClient.MessageType.DiscussionNotificationMessage:
               // message.content.extension => 讨论组中的人员。
               break;
            case RongIMClient.MessageType.LocationMessage:
               // message.content.latiude => 纬度。
               // message.content.longitude => 经度。
               // message.content.content => 位置图片 base64。
               break;
            case RongIMClient.MessageType.RichContentMessage:
               // message.content.content => 文本消息内容。
               // message.content.imageUri => 图片 base64。
               // message.content.url => 原图 URL。
               break;
            case RongIMClient.MessageType.InformationNotificationMessage:
                // do something...
               break;
            case RongIMClient.MessageType.ContactNotificationMessage:
                // do something...
               break;
            case RongIMClient.MessageType.ProfileNotificationMessage:
                // do something...
               break;
            case RongIMClient.MessageType.CommandNotificationMessage:
                // do something...
               break;
            case RongIMClient.MessageType.CommandMessage:
                // do something...
               break;
            case RongIMClient.MessageType.UnknownMessage:
                // do something...
               break;
            default:
                // do something...
        }
    }
});

/*************链接聊天室过程*************/

//初始化链接
RongIMLib.RongIMClient.init(app_key);

//开始链接
RongIMClient.connect(token, {
    onSuccess: function(userId) {
      	console.log("Connect successfully." + userId);
      	/**
      	* @TODO charRoomId为当前页面对应的聊天室id需按需求设置
      	*/
      	var chatRoomId = "1"; // 聊天室 Id。
		var count = 10;// 拉取最近聊天最多 50 条。
		//加入聊天室
		//链接成功之后再进入聊天室，否则会报错。
		RongIMClient.getInstance().joinChatRoom(chatRoomId, count, {
		  onSuccess: function() {
		       // 加入聊天室成功。
		       console.log('加入聊天室成功。')
		       var order = RongIMLib.GetChatRoomType.REVERSE;// 排序方式。
				RongIMClient.getInstance().getChatRoomInfo(chatRoomId, count, order, {
				  onSuccess: function(chatRoom) {
				  	console.log(chatRoom)
				       // chatRoom => 聊天室信息。
				    // chatRoom.userInfos => 返回聊天室成员。
				     // chatRoom.userTotalNums => 当前聊天室总人数。
				  },
				  onError: function(error) {
				  	console.log(error)
				    // 获取聊天室信息失败。
				  }
				});
		  },
		  onError: function(error) {
		  		console.log('加入聊天室失败。')
		    // 加入聊天室失败
		  }
		});
    },
    onTokenIncorrect: function() {
      console.log('token无效');
    },
    onError:function(errorCode){
      	var info = '';
      	switch (errorCode) {
        	case RongIMLib.ErrorCode.TIMEOUT:
          		info = '超时';
          		break;
        	case RongIMLib.ErrorCode.UNKNOWN_ERROR:
          		info = '未知错误';
          		break;
        	case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
          		info = '不可接受的协议版本';
          		break;
        	case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
          		info = 'appkey不正确';
          		break;
        	case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
          		info = '服务器不可用';
          		break;
      	}
      	console.log(errorCode);
    }
});
