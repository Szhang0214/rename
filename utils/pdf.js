/**
 * Created by xueleixi on 2017/11/28.
 */



var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('../templates/2.html', 'utf8');
var options = { format: 'A4' };

pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
});

