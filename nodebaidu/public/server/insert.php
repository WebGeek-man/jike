<?php
/**
 * Created by PhpStorm.
 * User: meihuabing
 * Date: 2017/6/30
 * Time: 22:37
 */

header("Content-type: application/json; charset=utf-8");
require_once ('db.php');

if (!$link){
    //返回失败的错误
    echo json_encode(array('连接信息' => '连接失败'));
} else {
    //插入新闻
    $newstitle = $_POST['newstitle'];
    $newstype = $_POST['newstype'];
    $newsimg = $_POST['newsimg'];
    $newstime = $_POST['newstime'];
    $newssrc = $_POST['newssrc'];

    $sql = "INSERT INTO `news`(`newstype`, `newstitle`, `newsimg`, `newstime`, `newssrc`) VALUES ('{$newstype}','{$newstitle}','{$newsimg}','{$newstime}','{$newssrc}')";

//    $sql = "INSERT INTO 'news'('newstitle','newstype','newsimg','newstime','newssrc') VALUES ('{$newstitle}','{$newstype}','{$newsimg}','{$newstime}','{$newssrc}')";
    mysqli_query($link,'SET NAMES utf8');
    $result = mysqli_query($link,$sql);
    echo json_encode(array('result' => '数据插入成功'));
}


mysqli_close($link);

