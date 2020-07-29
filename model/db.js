const mongoose = require('mongoose');
// 创建messageSchema
var messageSchema = new mongoose.Schema({
    username:String,
    con:String,
    date:String
});

// 创建对应的Model
var Message = mongoose.model('message',messageSchema);

// 连接数据库
const url = "mongodb://localhost:27017/web";
const opt = {
    useNewUrlParser:true,
    useUnifiedTopology:true
};
mongoose.connect(url,opt);

module.exports = {
    Message:Message
}