<?php
include 'API/rongcloud.php';
$appKey = '82hegw5u8ditx';
$appSecret = 'ztWKsBEWpvjUj';
$jsonPath = "jsonsource/";
$RongCloud = new RongCloud($appKey,$appSecret);

// 创建聊天室方法
	$chatRoomInfo[1] = 'chatroomInfo1';

	$result = $RongCloud->chatroom()->create($chatRoomInfo);
	echo "create";
	print_r($result);
	echo "\n";
// 加入聊天室方法
	// $result = $RongCloud->chatroom()->join(["1"], '1');
	// echo "join    ";
	// print_r($result);
	// echo "\n";
	// $result = $RongCloud->chatroom()->queryUser('1', '500', '2');
	// echo "queryUser    ";
	// print_r($result);
	// echo "\n";