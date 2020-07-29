// 创建信息相关的路由
const express = require('express');
const router = express.Router();
const {Message} = require('../model/db');
const silly=require("silly-datetime");
const { SUCCESS,FAILED } =require('../status.js');
const ObjectId = require('mongoose').Types.ObjectId;

// 处理 / message请求,显示首页
router.get('/',function(req,res){
    // 在数据库里取数据
    Message.find({},'username con date',function(err,docs){
        if(err){
            console.log(err);
            res.send("获取数据失败");
            return ;
        }
        // console.log(docs);
        res.render('index',{docs:docs});
    });
      
});

// 处理 /tijiao 的请求
router.post('/tijiao',function(req,res){
    // 获取用户名,内容
    var username=req.body.username;
    var con=req.body.con;
    var date=silly.format(new Date(),"YYYY-MM-DD HH:mm:ss");
    // console.log(username);
    // console.log(con);
    var o = new Message({
        username:username,
        con:con,
        date:date
    });
    o.save(function(err,product){
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    });
});

// 处理 get的 /update 的请求,跳转到修改的页面
router.get('/update',function(req,res){
    // 获取参数
    var id = req.query.id;
    // 将字符串的id转换为ObjectId类型
    id = ObjectId(id);
    Message.find({_id:id},function(err,docs){
        if(err){
            console.log(err);
            res.send('服务器故障');
            return ;
        }
        // 查询数据成功
        if(docs.length == 0){
            // 没有数据
            res.send('查无此数据');
        }else{
            // 查到了数据
            res.render("update",{docs:docs[0]});
        }
    });
});

// 处理post的/update请求,修改编辑内容
router.post('/update',function(req,res){
    var data = {};
    data.con = req.body.con;
    data.date = silly.format(new Date(),"YYYY-MM-DD HH:mm:ss");
    // 获取_id的值并将其转换为ObjectId类型
    var id = ObjectId(req.body.id);
    var filter = {_id:id};//修改的条件
    // console.log(data);
    Message.updateOne(filter,{$set:data},function(err,result){
        if(err){
            console.log(err);
            res.send('修改失败');
            return ;
        }
        // console.log(result.nModified);
        if(result.nModified > 0){
            res.redirect('/');
        }else{
            res.send('数据未曾发生改变,无须更新');
        }
    });
});


// 处理 /delete 的请求
router.get('/delete',function(req,res){
    // 获取参数
    // var con =req.query.con;
    var id = req.query.id;
    Message.deleteOne({_id:id},function(err,raw){
        res.send({status:SUCCESS,msg:"删除成功"});
    });

});


// 暴露路由
module.exports = router;