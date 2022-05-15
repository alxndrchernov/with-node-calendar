var express = require('express');
var cors = require('cors');
var path = require('path');
const fs = require("fs")
const bodyParser = require("body-parser")


var app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/events', function (request, response) {
    var fileName = path.resolve(__dirname, './data/events.json');
    response.sendFile(fileName, {})
});

app.post('/api/events/create', function (request, response) {
    fs.readFile('./data/events.json', function (err, data) {
        const json = JSON.parse(data)
        json.events.push(request.body)
        fs.writeFile("./data/events.json", JSON.stringify(json), function (err) {
            if (err) console.log(err)
        })
    })
    response.sendStatus(200)
})

app.post('/api/events/update', function (request, response) {
    fs.readFile('./data/events.json', function (err, data) {
        const json = JSON.parse(data)
        const filteredEvents = json.events.filter((el) => el.id !== request.body.id)
        filteredEvents.push(request.body)
        const obj = {events: filteredEvents}
        fs.writeFile("./data/events.json", JSON.stringify(obj), function (err) {
            if (err) console.log(err)
        })
    })
    response.sendStatus(200)
})

app.listen(8080)

