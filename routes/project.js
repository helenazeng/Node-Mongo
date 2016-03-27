var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/vidzy');

router.get('/', function(req, res) {
    var collection = db.get('project');
    collection.find({}, function(err, project){
        if (err) throw err;
      	res.json(project);
    });
});
router.post('/', function(req, res){
    var collection = db.get('project');
    collection.insert({
        title: req.body.title,
        description: req.body.description,
        people: req.body.people
    }, function(err, project){
        if (err) throw err;

        res.json(project);
    });
});
router.get('/:id', function(req, res) {
    var collection = db.get('project');
    collection.findOne({ _id: req.params.id }, function(err, project){
        if (err) throw err;

      	res.json(project);
    });
});
router.put('/:id', function(req, res){
    var collection = db.get('project');
    collection.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        description: req.body.description,
        people: req.body.people
    }, function(err, project){
        if (err) throw err;

        res.json(project);
    });
});

router.delete('/:id', function(req, res){
    var collection = db.get('project');
    collection.remove({ _id: req.params.id }, function(err, project){
        if (err) throw err;

        res.json(project);
    });
});




module.exports = router;

