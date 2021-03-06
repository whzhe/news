//var mysql   = require('mysql');
//var db = require('db');
var mongodb = require('mongodb');
var server = new mongodb.Server('localhost', 27107, {auto_reconnect:true});
var db = new mongodb.Db('mydb', server, {safe:true});


console.log("open db!");
db.open(function(err,db){
    if(!err){
        console.log('connect db');
        db.creatCollection('mycoll',{safe:true}, function(err,collection){
            if(err){
                console.log(err);
            }else
            {
                console.log('creat collection ok');
            }
        });
    }
});

console.log("open db OK!");


function send_result(res, type, retCode, errStr){
    var ret = {
        Type:type, 
        ret: retCode,
        errStr: errStr,
    };
    console.log(JSON.stringify(ret));
    res.send(JSON.stringify(ret));
}
function message_handle(req, res){      
    console.log("start in message_handle");
    var message = req.body;
    //var msgType = message.type;
    var msgType = message.msgType;
    console.log(req.body);
    if("MSG_TYPE_INTERNEL_NEW_NEWS" == msgType){
        type = msgType;
        db.collection('mycoll', {safe:true},function(err,collection){
            if(err){
                console.log(err);
                send_result(res,type,1, err);
                return;
            }
        });
        var category = message.category;
        var title = message.title;
        var content = message.content;
        var source = message.source;
        var oriUrl = message.oriUrl;
        var newsTime = message.newsTime;
        var audioFile = message.audioFile;
        var voiceType = message.voiceType;
        var audoFileSuffix = message.audoFileSuffix;
        var imageFile = message.imageFile;
        var type = msgType;
        var tmp = {Title:title, NewsTime:newsTime, Content:content, Category:Category, Source:Source, OriUrl:OriUrl, AudioFile:AudioFile,VoiceType:VoiceType, AudoFileSuffix:AudoFileSuffix, ImageFile:ImageFile, States:0};
        collection.insert(tmp,{safe:true},function(err, result){
            if(err){
                send_result(res, type, 1,err);
                console.log(result);
                return;
            }
            send_result(res, type, 0, "Success!");
            return;
        });
    }
    else{
        send_result(res, "null", 1, "no msgType!");
        return;
    }
}
