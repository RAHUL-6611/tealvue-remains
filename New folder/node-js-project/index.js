var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.json("Welcome to node js");
})
app.get('/get', function (req, res) {
    res.json("you made a get request!");
})
app.post('/post', function (req, res) {
    const request = req.body;
    console.log(request)
    res.send(request);
    console.log(request + " ::post request has been made successfully")
})


app.listen(3000,() => console.log('listening'));