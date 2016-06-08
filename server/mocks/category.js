/*jshint node:true*/
module.exports = function (app) {
    var express = require('express');
    var faker = require('Faker');
    var categoryRouter = express.Router();
    var categories = [];
    var colors = ['#2079FF', '#54CC14', '#99583D', '#F633FF'];
    for (var i = 1; i <= 4; i++) {
        categories.push({
            id: i,
            title: faker.Lorem.sentence(3),
            color: colors[i-1]
        });
    }

    var findCategoryById = function(id) {
        id = parseInt(id);
        return categories.filter(function(c) {
            return c.id === id;
        })[0];
    };

    categoryRouter.get('/', function (req, res) {
        res.send({
            'category': categories
        });
    });

    categoryRouter.post('/', function (req, res) {
        res.status(201).end();
    });

    categoryRouter.get('/:id', function (req, res) {
        res.send({
            'category': findCategoryById(req.params.id)
        });
    });

    categoryRouter.put('/:id', function (req, res) {
        res.send({
            'category': {
                id: req.params.id
            }
        });
    });

    categoryRouter.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    // The POST and PUT call will not contain a request body
    // because the body-parser is not included by default.
    // To use req.body, run:

    //    npm install --save-dev body-parser

    // After installing, you need to `use` the body-parser for
    // this mock uncommenting the following line:
    //
    //app.use('/api/category', require('body-parser').json());
    app.use('/api/categories', categoryRouter);
};
