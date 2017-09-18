var express = require('express');
var router = express.Router();

var gameserverIp="192.168.1.101";

var mm = {
    a:"123456", // 游戏账号
    ra:"012345",// 关联账号
    n:"haha",// 昵称
    t:0, // 玩家类型 0：一般玩家 1：机器人
    b:300000, //金豆
    gs:gameserverIp, // 所在游戏服务器
    cn:"james", // 姓名
    p:"1234", // 账户密码
    mp:"81dc9bdb52d04dc20036dbd8313ed055", // 加密密码
    gd:"2", // 性别 0保密1女2男
    pn:"13999999999", // 联系号码
    e:"test@test.com", // email
    iup:"1", // 是否修改过密码0未修改过1已经修改过
    cd:"", // 创建时间
    ud:"", // 更新时间
    hi:"", // 头像
    so:1, // 用户排名
    ak:"1234567890", // 安全验证签名密钥
    rt:"", // 房间更新时间
    hw:0,// 已经赢[钻石挖矿场使用]
    jt:0,// 记牌器剩余有效时间(s)
    nw:0,// 需要赢
    ot:600, //比赛剩余秒数
    lt:"", // 游戏内部登录Token
    gt:1, // 当前玩的游戏类型 1：斗地主 2：麻将 3：锄大地
    ir:false, // 是否参加比赛 true:已参加 false:未参加
    rn:"rom1", // 房间名称
    round:0, // 轮次
    level:1, // 比赛阶段 1:预赛 2:决赛
    rank:2, // 用户排名
    cred:100, // 用户积分
    iq:0, // 等级等级
    //ii: private Map<String, String> iqImg; // 等级头像图标(0女地主,1男地主,2女农民,3男农民)
    tl:"title", // 称号
    in:10000, // 当前经验
    ni:10000, // 达到下一级等级所需经验
    //li:private Map<String, String> levelImg; // 等级图标(key:count,value:imagePath)
    dis:800, // 钻石的数量
    tpm:"no tipMes" // 无记牌器时的提示文本
};

router.post('/game/user/register.sc', function(req, res, next) {
    var ret = {
        mc: "0",
        mm: ""
    };
    ret["mm"] = JSON.stringify(mm);
    console.log(JSON.stringify(ret));
    res.send(JSON.stringify(ret));
});

router.post('/game/user/login.sc', function(req, res, next) {
    var ret = {
        mc: "0",
        mm: ""
    };
    ret["mm"] = JSON.stringify(mm);
    console.log(JSON.stringify(ret));
    res.send(JSON.stringify(ret));
});

/*
router.post('/game/user/getUserByGameToken.sc', function(req, res, next) {
    var ret = {
        mc: "0",
        mm: ""
    };
    ret["mm"] = JSON.stringify(mm);
    console.log(JSON.stringify(ret));
    res.send(JSON.stringify(ret));
});*/

router.post('/game/server/getServer.sc', function(req, res, next) {
    var ret = {
        mc: "0",
        mm: gameserverIp+":4000"
    };
    console.log(JSON.stringify(ret));
    res.send(JSON.stringify(ret));
});

var g_rom = {
    c:"1001",         // 房间编号
    hn:"跑得快",        // 房间名称
    r:12,               // 房间倍数
    bp:100,             // 房间每局底数
    u:0,                // 交易单位 0 积分、1 豆
    l:0,                // 允许进入的最低限制
    pw:"12345678",      // 房间密码
    ln:3,               // 每次参与游戏的人数
    cn:0,               // 抽取的拥金数
    ht:2,               // 0:普通房间/1:VIP/2:VIP包房/3:专场/4:钻石专场/5:合成挤专场/6:
    hc:"1234",          // 大厅编号
    up:200000,          // 上限
    s:2,                // 房间在大厅排序
    mc:3,               // 房间最大支持人数 0不限制
    v:1,                // 房间版本号 版本号 有变化代表房间数据有更改，前台需要更新
    rh:"",              // 大厅展示资源下载目录
    rhu:"",             // 大厅展示资源下载地址
    si:gameserverIp,    // 游戏服务器IP
    gs:gameserverIp+":4000",        // 游戏服务器地址（临时变量，不存储） 格式 192.168.0.1:8080
    rl:"",              // 专场游戏物品赠送规则
    sr:"",              // 专场开始时间
    pt:1,               // 游戏比赛类型
    de:"detail",        // 游戏房间说明
    ma:"10000",         // 最大奖励
    pp:1000000,         // 奖金池金豆
    ro: {               // 游戏房间详细说明
        rd:"",          // 房间说明
        pg:[{            // 奖励物品
            "a":"aaa",
            "b":"bbb"
        }],
        at:[{            // 报名条件
            "a":"aaa",
            "b":"bbb"
        }],
        af:[{            // 报名费用
            "a":"aaa",
            "b":"bbb"
        }],
        ln:30,          // 开赛人数
        ar:{            // 排位赛对应普通房间
            "a":"aaa",
            "b":"bbb"
        },
        td:"",	        // 赛场时间说明
        tt:"20161231",  // 赛场时间文本
        an:30           // 报名人数
    },
    ra:1,               // 比赛类型(1即时赛，2排位赛)
    rt:0                // 房间类型：0大厅房，1超快赛房，2排位赛房/6:挖矿场
};

router.post('/game/room/createRoom.sc', function(req, res, next) {
    var ret = {
            m:"bab2f729d0354d9b",   //手机端唯一ID
            c:"ce",                  //出牌
            d:"0",                   //指令内容
            r:29,                   //随即数 防止数据缓存
            s:1,                    //消息序列
            t:0                     //打牌时    0:普通消息，1:打牌业务消息
    };


    if (req.body.isBeforeCheck == 'true') {
    } else {
        ret["d"] = JSON.stringify(g_rom);
    }
    console.log(JSON.stringify(ret));
    res.send(JSON.stringify(ret));
});

router.post('/game/join/rjoin.sc', function(req, res, next) {
    var ret = {
            m:"bab2f729d0354d9b",   //手机端唯一ID
            c:"rj",                 //rjoin准备加入
            d:"0",                   //指令内容
            r:29,                   //随即数 防止数据缓存
            s:1,                    //消息序列
            t:0                     //打牌时    0:普通消息，1:打牌业务消息
    };
    ret["d"] = JSON.stringify(g_rom);
    console.log(JSON.stringify(ret));
    res.send(JSON.stringify(ret));
});

router.post('/game/common/uploadException.sc', function(req, res, next) {
    console.log(req.body);
    res.send(JSON.stringify("ok"));
});


module.exports = router;
