//send mail
var mailer = require('nodemailer');
var fs=require('fs');
var iconv=require('iconv-lite');
var config=require('./config');

var transporter = mailer.createTransport({
    host: config.server,
    port: config.port,
    secure: true,
    auth: {
        user:config.user,
        pass: config.pass
    },
    logger: false,
    debug: false
});


var receivers=[];
var names=[];
var fileReceiver = './收件人.csv';
var dirAttach = './附件';
var attachFiles=[];

getReceivers();
getAttachFiles(names);
printReceivers();
printAttaches();
sendMail();


function sendMail() {
    for (i = 0; i < receivers.length; i++) {
        var email = receivers[i]['email'];
        var username = receivers[i]['name'];//标题=客户名

        var attachments = [];

        if (! username in attachFiles){
            console.error("出错："+username+" 没有附件");
            continue;
        }
        for (var a in attachFiles[username]){

            var fullName = attachFiles[username][a];
            var attach = {
                filename: fullName.substr(fullName.lastIndexOf('/')+1),
                path: fullName,
                cid: 'cid'+new Date().getTime()+Math.random()
            };
            // console.log(attach);

            attachments.push(attach);
        }


        var mailOptions = {
            from: config.user,
            to: email,
            subject: username,
            // text: '',
            html: getBody(),
            attachments: attachments
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.error("发送失败，收件人：" + mailOptions.to)
                console.error(err);
                return;
            }
            console.log('发送成功');
        });
    }
}




function getBody() {
    var body = fs.readFileSync('templates/mail.html','utf8');
    var d = new Date();
    var date = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
    body = body.replace(/\[DATE\]/, date);
    return body;
}

function getReceivers() {
    var bytes = fs.readFileSync(fileReceiver);
    var content = iconv.decode(bytes, 'gbk');
    var lines = content.split("\r\n");//客户名称
    lines.forEach(function (line) {
        var line = line.trim();
        if (line) {
            var parts = line.split(',');
            if (parts.length != 2) {
                console.error(fileReceiver + ' 有错误')
                process.exit(1);
            }
            receivers.push({name: parts[0], email: parts[1]});
            names.push(parts[0]);
        }
    });
}

/**
 * 附件目录中的文件跟用户名进行配对，如果一个附件没有对应的收件人，会打印其信息
 * @param names 收件人姓名
 */
function getAttachFiles(names) {
    var dirFiles = fs.readdirSync(dirAttach);
    dirFiles.forEach(function (fileName, p2, p3) {
        var index=fileName.lastIndexOf('_');
        if (index==-1){
            index=fileName.lastIndexOf('.');
        }
        var username=fileName.substr(0,index);
        if(-1==names.indexOf(username)){
            console.warn(dirAttach+"/"+fileName+" 不属于任何收件人");
            return;
        }
        var fullName = dirAttach+'/'+fileName;//加上前缀
        // var fullName = fileName;//加上前缀
        if(username in attachFiles){
            attachFiles[username].push(fullName);
        }else{
            attachFiles[username]=[fullName];
        }
    });
}

function printReceivers() {
    console.log("\n收件人:");
    console.log(receivers);
}
function printAttaches() {
    console.log("\n收件人对应的附件：");
    for (f in attachFiles) {
        console.log("\t收件人：" + f + ",附件：" + attachFiles[f]);
    }
}