/*jshint node:true*/
Date.prototype.yyyymmdd = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]); // padding
};
module.exports = function (app) {
    var express = require('express');
    var faker = require('Faker');
    var bodyParser = require('body-parser');
    var eventRouter = express.Router();
    var events = [];
    var i = 1;
    app.use(bodyParser.json()); // for parsing application/json

    for (i; i <= 10; i++) {
        events.push({
            id: i,
            title: faker.Lorem.sentence(5),
            description: faker.Lorem.paragraphs(3),
            date: (new Date(faker.Date.future(i))).yyyymmdd(),
            category: faker.random.number(4) + 1,
            image: faker.Image.city() + '/' + faker.Lorem.words(1)
        });
    }

    var findEventById = function(id) {
        id = parseInt(id);
        return events.filter(function(e) {
            return e.id === id;
        })[0];
    };

    var findEventByTitle = function(title) {
        return events.filter(function(e) {
            return e.title.indexOf(title) + 1;
        });
    };
    var addEvent = function (data) {
        var event = data.event;
        event.id = ++i;
        events.push(data.event);
        return data;
    };

    eventRouter.get('/', function (req, res) {
        if(typeof req.query.q !== 'undefined') {
            res.send({
                'event': findEventByTitle(req.query.q)
            });
        } else {
            res.send({
                'event': events
            });
        }
    });

    eventRouter.post('/', function (req, res) {
        res.send(addEvent(req.body)).status(201).end();
    });

    eventRouter.get('/:id', function (req, res) {
        res.send({
            'event': findEventById(req.params.id)
        });
    });

    eventRouter.put('/:id', function (req, res) {
        res.send(req.body);
    });

    eventRouter.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    // The POST and PUT call will not contain a request body
    // because the body-parser is not included by default.
    // To use req.body, run:

    //    npm install --save-dev body-parser

    // After installing, you need to `use` the body-parser for
    // this mock uncommenting the following line:
    //
    //app.use('/api/event', require('body-parser').json());
    app.use('/api/events', eventRouter);
};
