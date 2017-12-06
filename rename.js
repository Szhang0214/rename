//加载file system模块
var fs = require("fs");
var iconv=require('iconv-lite');
var process=require('process');

var namesFile = "./客户名.csv";//客户名称文件
var picsDir = "./pics";//图片所在目录
var suffix = ".pdf";//图片后缀名

if(process.argv.length!=3){
    console.log('usage node '+__filename+ '账单/债权');
    process.exit(-1);
}
var func=process.argv[2];//账单、债权

var bytes = fs.readFileSync(namesFile);
var data = iconv.decode(bytes, 'gbk');
var lines = data.split("\n");//客户名称
var names=[];
lines.forEach(function (line) {
    var name=line.trim();
    if (name) {
        names.push(name+'的'+func)
    }
});

modify_names(names);
console.log(names);

// 对重名的_1,_2进行标识
function modify_names(names){
    var oldNames=[];
    names.map(function(name,k){
        var cnt=0;
        oldNames.push(name);
        oldNames.forEach(function(v){
            if(v==name){
                cnt++;
            }
        });
        if(cnt>1){
            names[k]=name+"_"+cnt;
        }
    })
}
//

var pics = fs.readdirSync(picsDir);//图片文件名
// console.log(pics);
if (names.length != pics.length) {
    console.log("出错啦！   名字长度与图片长度不一致");
    process.exit(1);
}
for (var len = 0; len < pics.length; len++) {
    fs.renameSync(picsDir+"/"+pics[len], picsDir+"/"+names[len]+ suffix);
}

console.log("done!请去检查一下是否正确");