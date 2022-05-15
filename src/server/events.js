var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();

router.get('/', function (request, response) {
    var fileName = path.resolve(__dirname, './data/events.json');
    response.sendFile(fileName);
});

router.get('/:id', function (request, response) {
    var fileName = path.resolve(__dirname, './data/events.json');
    let id = request.params.id;
    let data = fs.readFileSync(fileName, 'utf8');
    let events = JSON.parse(data);
    let event = events.find(item => item.id == id);    
    response.send(event);
});

module.exports = router;