var fs=require("fs");

files=fs.readdirSync("./附件")
console.log(files)
//
//
//
// function sortFiles(files) {
//     var stat=fs.statSync("./names.txt")
//     stat.ctime;
// }
//
// console.log(require('./config'))

// var iconv=require('iconv-lite');
// var d=fs.readFileSync('./a.txt');
//
// var str = iconv.decode(d, 'gbk');
// console.log(str)