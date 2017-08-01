<?php
/**
 * Created by PhpStorm.
 * User: meihuabing
 * Date: 2017/7/1
 * Time: 08:36
 */

header("Content-type: application/json; charset=utf-8");
require_once ('db.php');

if (!$link){
    //返回失败的错误
    echo json_encode(array('连接信息' => '连接失败'));
} else {
    //删除新闻
    $newsid = $_POST['newsid'];
    $sql = "DELETE FROM `news` WHERE `news`.`id` = {$newsid}";
    mysqli_query($link,'SET NAMES utf8');
    $result = mysqli_query($link,$sql);
    echo json_encode(array('result' => '数据删除成功'.$newsid));
}

mysqli_close($link);