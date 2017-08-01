/**
 * Created by meihuabing on 2017/6/30.
 */
//打开新闻页面时候发送请求,刷新新闻界面
$(document).ready(function () {
    var $newstable = $('#newstable tbody');

    //添加新闻内容
    $('#btnsubmit').click(function (e) {
        e.preventDefault();
        //输入判断
        if ($('#newstitle').val() === ''||$('#newsimg').val() === ''||$('#newstype').val() === ''||$('#newstime').val() === ''||$('#newssrc').val() === ''){
            if ($('#newstitle').val() === ''){
                $('#newstitle').parent().addClass('has-error')
            } else {
                $('#newstitle').parent().removeClass('has-error')
            }
            if ($('#newsimg').val() === ''){
                $('#newsimg').parent().addClass('has-error')
            } else {
                $('#newsimg').parent().removeClass('has-error')
            }
            if ($('#newstype').val() === ''){
                $('#newstype').parent().addClass('has-error')
            } else {
                $('#newstype').parent().removeClass('has-error')
            }
            if ($('#newstime').val() === ''){
                $('#newstime').parent().addClass('has-error')
            } else {
                $('#newstime').parent().removeClass('has-error')
            }
            if ($('#newssrc').val() === ''){
                $('#newssrc').parent().addClass('has-error')
            } else {
                $('#newssrc').parent().removeClass('has-error')
            }
        } else {
            //检验通过  发请求
            var jsonNews = {
                newstitle:$('#newstitle').val(),
                newsimg:$('#newsimg').val(),
                newstype:$('#newstype').val(),
                newstime:$('#newstime').val(),
                newssrc:$('#newssrc').val()
            };
            $.ajax({
                url:'/admin/insert1',
                type:'post',
                data:jsonNews,
                datatype:'json',
                success:function (data) {
                    console.log(data)
                    $('#newstitle').val('');
                    $('#newsimg').val('');
                    $('#newstime').val('');
                    $('#newssrc').val('');
                    $('#newstype').val('精选');
                    refreshBNews();//刷新页面
                },
                error:function (error) {
                    console.log(error)
                }
            });
        }
    });

    /**
     * 删除新闻的功能
     * 绑定删除事件,需要用事件委托方式
     */
    var deleteID = null;
    $newstable.on('click','.btn-danger',function (e) {
        $("#deletModal").modal('show');
        deleteID = $(this).parent().prevAll().eq(5).html();
        // console.log($(this).parent().prevAll().eq(5).html());
    });
    $('#confirmdelet').click(function () {
        $("#deletModal").modal('hide');
        if (deleteID){
            $.ajax({
                url:'/admin/delete',
                type:'post',
                data:{newsid:deleteID},
                datatype:'json',
                success:function (data) {
                    console.log(data)
                    refreshBNews();//刷新页面
                },
                error:function (error) {
                    console.log(error)
                }
            });
        }
    });

    /**
     * 编辑修改新闻的功能
     * 绑定修改事件,需要用事件委托方式
     */
    var updataID = null;
    $newstable.on('click','.btn-primary',function (e) {
        $("#updataModal").modal('show');
        updataID = $(this).parent().prevAll().eq(5).html();
        console.log($(this).parent().prevAll().eq(5).html());
        // 给页面元素赋值
        $.ajax({
            url:'/admin/curnews',
            type:'get',
            datatype:'json',
            data:{newsid:updataID},
            success:function (data) {
                //给弹出框赋值
                $('#unewstitle').val(data[0].newstitle);
                $('#unewstype').val(data[0].newstype);
                $('#unewsimg').val(data[0].newsimg);
                var utime = data[0].newstime.split('T')[0];
                $('#unewstime').val(utime);
                $('#unewssrc').val(data[0].newssrc);
            }
        })
    });
    $('#confirmupdata').click(function () {
        $("#updataModal").modal('hide');
        if (updataID){
            //检验通过  发请求
            var jsonUpdata = {
                newsid:updataID,
                newstitle:$('#unewstitle').val(),
                newsimg:$('#unewsimg').val(),
                newstype:$('#unewstype').val(),
                newstime:$('#unewstime').val(),
                newssrc:$('#unewssrc').val()
            };
            $.ajax({
                url:'/admin/updata',
                type:'post',
                data:jsonUpdata,
                datatype:'json',
                success:function (data) {
                    console.log(data);
                    refreshBNews();//刷新页面
                },
                error:function (error) {
                    console.log(error)
                }
            });
        }
    });


    /**
     * 刷新新闻界面
     */
    function refreshBNews() {
        //empty table
        $newstable.empty();
        $.ajax({
            url:'/admin/getNews',
            type:'get',
            // data:{newstype:''},
            datatype:'json',
            success:function (data) {
                console.log(data)
                data.forEach(function (item,index,array) {
                    var $tdid = $('<td></td>').html(item.id);
                    var $tdtype = $('<td></td>').html(item.newstype);
                    var $tdtitle = $('<td></td>').html(item.newstitle);
                    var $tdimg = $('<td></td>').html(item.newsimg);
                    var $tdsrc = $('<td></td>').html(item.newssrc);
                    var $tdtime = $('<td></td>').html(moment(item.newstime).format('MMMM Do YYYY, h:mm:ss'));
                    var $tdctrl = $('<td></td>');
                    var $btnupdata = $('<button></button>').addClass('btn btn-primary btn-xs').html('修改');
                    var $btndelect = $('<button></button>').addClass('btn btn-danger btn-xs').html('删除');
                    $tdctrl.append($btnupdata,$btndelect);
                    var $tRow = $('<tr></tr>');
                    $tRow.append($tdid,$tdtype,$tdtitle,$tdimg,$tdsrc,$tdtime,$tdctrl);
                    $newstable.append($tRow);
                })
            },
            error:function (error) {
                console.log( error)
            }
        })
    }

    refreshBNews();

});

