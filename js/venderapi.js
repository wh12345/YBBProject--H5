/**
 * WebAPI接口调用对象处理
 * 
 * 作者：Alum-ximingfan
 * 日期：2018-8-23
 * */

var venderapi = {
    'venderId': '0a607c80722e4b209d6d6645ed917cb6',//机构ID
    'host': 'alliance.yanbaba.cc',//主机信息
    'url': function (method, urlpara) {
        var u = 'http://' + this.host + '/api/mp/' + method + '.html?venderId=' + this.venderId + urlpara;
        //console.log(u);
        return u;
    },
    'get': function (method, urlpara, funcResult) {
        var pUrl = this.url(method, urlpara);
        console.log(pUrl);
        $.ajax({
            type: 'get',
            url: pUrl,
            async: true,
            dataType: 'json',
            //withCredentials: true,
            //// 允许携带Cookie
            //headers: {
            //    "If-Modified-Since": 0
            //},// 避免get请求缓存
            success: function (data) {
                console.info(data);
                funcResult(data);
                console.info('get方法执行成功');
            },
            error: function (data) {
                console.error("get【" + pUrl + "】失败,返回数据如下：");
                console.error(data);
            },
            complete: function () {
                console.info("get函数执行完成");
            }
        });
    },
    //'rendering': function (result) { },
    'post': function (method, jsonpara, funcResult) {
        var pUrl = this.url(method, '');
        $.ajax({
            type: 'post',
            url: pUrl,
            async: true,
            dataType: 'json',
            data: jsonpara,
            //withCredentials: true,
            //// 允许携带Cookie
            //headers: {
            //    "If-Modified-Since": 0
            //},// 避免get请求缓存
            success: function (data) {
                console.info(data);
                funcResult(data);
                console.info('post方法执行成功');
            },
            error: function (data) {
                console.error("post【" + pUrl + "】失败,返回数据如下：");
                console.error(data);
            },
            complete: function () {
                console.info("post函数执行完成");
            }
        });
        $.post(url, jsonpara, funcResult(result));
        console.log('post方法执行完毕');
    },
    //模板对象渲染
    'temp': function (htmlElemet, templateId, jsonData) {
        console.info('开始处理:' + templateId);
        html = template(document.getElementById(templateId).innerHTML, jsonData);
        //console.info(html);
        $(htmlElemet).append(html);
    },
    'html': function (htmlElemet, templateId, jsonData) {
        console.info('开始处理:' + templateId);
        html = template(document.getElementById(templateId).innerHTML, jsonData);
        console.info("html:===" + html);
        $(htmlElemet).html(html);
    },
    //获取URL参数
    'getUrlPara': function (paraName) {
        var reg = new RegExp("(^|&)" + paraName + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    'getJsonSelect': function (name, arr) {
        var reg = new RegExp(name);
        arr.forEach(function (arr_item, i) {
            arr_item.item = arr_item.item.filter(function (inner, j) {
                return reg.test(inner.title)
            })
        });
        return arr
    }
}