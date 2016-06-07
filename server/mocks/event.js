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
    var eventRouter = express.Router();
    var events = [];

    for (var i = 1; i <= 10; i++) {
        events.push({
            id: i,
            title: faker.Lorem.sentence(5),
            description: faker.Lorem.paragraphs(3),
            date: (new Date(faker.Date.past(i))).yyyymmdd(),
            category: faker.random.number(3) + 1,
            image: faker.Image.city() + '/' + faker.Lorem.words(1)
        });
    }

    var findEventBySlug = function(slug) {
        var title = slug.replace('-', ' ');
        console.log('original title:', title);
        return events.filter(function(e) {
            console.log(e.title);
            return e.title === title;
        })[0];
    };

    eventRouter.get('/', function (req, res) {
        res.send({
            'event': events
        });
    });

    eventRouter.post('/', function (req, res) {
        res.status(201).end();
    });

    eventRouter.get('/:slug', function (req, res) {
        res.send({
            'event': findEventBySlug(req.params.slug)
        });
    });

    eventRouter.put('/:id', function (req, res) {
        res.send({
            'event': {
                id: req.params.id
            }
        });
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
