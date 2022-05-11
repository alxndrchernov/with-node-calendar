var express = require('express');
var cors = require('cors');
var path = require('path');

var app = express();
app.use(cors());

app.get('/events', function(request, response){
	console.log(`server listening on port: ${port}`)
	var fileName = path.resolve(_dirname, './data/events.json');
	
	response.sendFile(fileName, {})
});

app.listen(7000)

