// 创建服务器
const express = require('express');
const router = require('./router');
const app = express();
app.listen(4000);

// 设置试图模板引擎
app.set("view engine","ejs");
// 设置post请求参数的解析方式
// application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));
// 设置根目录
app.use(express.static('./public'));

// 处理/请求,展示首页
app.get('/',function(req,res){
    // 重定向,让浏览器重新发送一个message的请求
    res.redirect('/message');
});

// 处理所有/message开头的请求
app.use('/message',router.message);

// 处理其他所有错误的请求地址
app.use(function(req,res){
    res.render('error',{errMsg:"地址错误"});
});