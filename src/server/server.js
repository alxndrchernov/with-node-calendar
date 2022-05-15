var express = require('express');
var cors = require('cors');
var path = require('path');

var app = express();
app.use(cors());

app.get('/api/events', function(request, response){
	var fileName = path.resolve(__dirname, './data/events.json');
	response.sendFile(fileName, {})
});

app.listen(8080)

