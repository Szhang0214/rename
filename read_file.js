//加载file system模块
var fs = require("fs");

var namesFile = "./names.txt";//客户名称文件
var encoding = "utf-8";//客户名称文件的编码类型
var picsDir = "./pics";//图片所在目录
var suffix = ".png";//图片后缀名


var data = fs.readFileSync(namesFile, encoding);
var names = data.split("\n");//客户名称
console.log(names)

var pics = fs.readdirSync(picsDir);//图片文件名
console.log(pics)
if (names.length != pics.length) {
    console.log("出错啦！   名字长度与图片长度不一致");
    process.exit(1);
}
for (var len = 0; len < pics.length; len++) {
    fs.renameSync(picsDir+"/"+pics[len], picsDir+"/"+names[len]+ suffix);
}

console.log("done!请去检查一下是否正确");