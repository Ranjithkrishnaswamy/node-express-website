const express = require('express');
const Joi = require('joi');
const router = express.Router();

genres = [
    {id:1, name: 'action'},
    {id:2, name: 'thriller'},   
    {id:3, name: 'comedy'},
    {id:4, name: 'documentary'},
    {id:5, name: 'sitcoms'},
];

router.get('/',(req,res) => {
    res.send(genres);
});

router.post('/',(req,res) => {    
    const result = validategenre(req.body);
    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }            
    
    const genre = {
        id: genres.length + 1,
        name: req.body.name
        };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id',(req,res) => {
    //Look up course. If not return 404
    const genre = genres.find(c => c.id === parseInt(req.params.id));
     if(!genre) res.status(404).send('The genre with given ID was not found');
    //res.send(genres)
    //Validate, if invalid return 400
    const result = validategenre(req.body);
    if (result.error){
            res.status(400).send(result.error.details[0].message);
            return;
    }                   
    //update course, return updated course
    genre.name = req.body.name;
    res.send(genre);
});

function validategenre(genre)
{
        const schema = {
            name: Joi.string().min(10).required()
        };
        return Joi.validate(genre,schema);
    
}

router.delete('/:id',(req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) res.status(404).send('The genre with given ID was not found');

    const index = genres.indexOf(genre);
    genres.slice(index,1);

    res.send(genre);
});

 module.exports = router;