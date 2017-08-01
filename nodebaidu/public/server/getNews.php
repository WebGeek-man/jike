<?php
/**
 * Created by PhpStorm.
 * User: meihuabing
 * Date: 2017/6/30
 * Time: 15:36
 */
header("Content-type: application/json; charset=utf-8");
require_once ('db.php');
//$link = mysqli_connect('localhost','root',"",'baidunews',9090);
if (!$link){
    //返回失败的错误
    echo json_encode(array('连接信息' => '连接失败'));
} else {
    //执行成功的过程  查询新闻
    //不传参数  写成@$_GET['newstype']   也是可以的
    if($_GET['newstype'] != ''){
        $newstype = $_GET['newstype'];
        //order by id desc   倒序查询
        $sql1 = "SELECT * FROM `news` WHERE `newstype` = '{$newstype}' order by id desc";
        mysqli_query($link,'SET NAMES utf8');
        $result = mysqli_query($link,$sql1);
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

    } else {
        $sql = "SELECT * FROM `news` order by id desc";
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
}

mysqli_close($link);





















