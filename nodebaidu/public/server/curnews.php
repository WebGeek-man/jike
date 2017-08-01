<?php
/**
 * Created by PhpStorm.
 * User: meihuabing
 * Date: 2017/7/1
 * Time: 09:10
 */
header("Content-type: application/json; charset=utf-8");
require_once ('db.php');

if (!$link){
    //返回失败的错误
    echo json_encode(array('连接信息' => '连接失败'));
} else {
    //删除新闻
    $newsid = $_GET['newsid'];
    $sql = "SELECT * FROM `news` WHERE `id` = {$newsid}";
    mysqli_query($link,'SET NAMES utf8');
    $result = mysqli_query($link,$sql);
    $senddata = array();
    while ($row = mysqli_fetch_assoc($result)){
        array_push($senddata,array(
            'id' => $row['id'],
            'newstype' => $row['newstype'],
            'newstitle' => $row['newstitle'],
            'newsimg' => $row['newsimg'],
            'newstime' => $row['newstime'],
            'newssrc' => $row['newssrc'],
        ));
    }
    echo json_encode($senddata);
}

mysqli_close($link);