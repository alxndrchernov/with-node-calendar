var express = require('express');
var cors = require('cors');
var path = require('path');
const fs = require("fs")

var app = express();
app.use(cors());

app.get('/api/events', function(request, response){
	var fileName = path.resolve(__dirname, './data/events.json');
	response.sendFile(fileName, {})
});

app.post('/api/events/create',function (request,response){
	// TODO: нормально парсить body, чтобы создавать события
	const event = {
		id:request.body.id,
		title:request.body.title,
		description:request.body.description,
		date:request.body.date
	}

	fs.readFile('./data/events.json',function (err,data){
		const json = JSON.parse(data)
		json.events.push(event)
		fs.writeFile("./data/events.json",JSON.stringify(json))
	})

	response.send(event)
})

app.post('/api/events/update',function (request,response){

})

app.listen(8080)

