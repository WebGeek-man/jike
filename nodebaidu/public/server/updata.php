<?php
/**
 * Created by PhpStorm.
 * User: meihuabing
 * Date: 2017/7/1
 * Time: 09:00
 */
header("Content-type: application/json; charset=utf-8");
require_once ('db.php');

if (!$link){
    //返回失败的错误
    echo json_encode(array('连接信息' => '连接失败'));
} else {
    //更新新闻
    $newsid = $_POST['newsid'];
    $newstitle = $_POST['newstitle'];
    $newstype = $_POST['newstype'];
    $newsimg = $_POST['newsimg'];
    $newstime = $_POST['newstime'];
    $newssrc = $_POST['newssrc'];

    $sql = "UPDATE `news` SET `newstype`= '{$newstype}',`newstitle` = '{$newstitle}',`newsimg` = '{$newsimg}',`newstime`= '{$newstime}',`newssrc`= '{$newssrc}' WHERE `id`= {$newsid}";
    mysqli_query($link,'SET NAMES utf8');
    $result = mysqli_query($link,$sql);
    echo json_encode(array('result' => '数据修改成功'));
}

mysqli_close($link);