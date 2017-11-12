<?php
include 'API/rongcloud.php';

/**
* 应用后台类
*/
class RcServer
{
	private $appKey = '82hegw5u8ditx';

	private $appSecret = 'ztWKsBEWpvjUj';

	protected $RC;
	
	public function __construct()
	{
		$this->RC = new RongCloud($this->appKey,$this->appSecret);
	}
	/**
	* 获取用户token
	* @param id StringOrInt 用户在接入方服务器的id
	* @param name String 用户名
	* @param photo Url 用户头像url地址
	* @return result String 用户token
	*/
	public function getToken($id=1,$name='swb',$photo='http://www.rongcloud.cn/images/logo.png')
	{
		$result = $this->RC->user()->getToken($id,$name,$photo);
		return $result;
	}

	/**
	* 通过应用服务器发送聊天室消息
	* @param userid 用户在接入方服务器中的id
	* @param chatroomId Array 需要发送消息的目标聊天室id
	* @param content String 发送的消息
	* @param extra String 额外消息
	* @return 
	*/
	public function sendMessage($userid,$chatroomId,$content,$extra)
	{
		$result = $this->RC->message()->publishChatroom($userid, $chatroomId, 'RC:TxtMsg',"{\"content\":$content,\"extra\":$extra}");
		return $result;
	}
}

$Rc = new RcServer();
echo $Rc->getToken();