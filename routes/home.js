const express = require('express')
const router = express.Router();

router.get('/',(req,res) => {
    //res.send('Hello world!!! My name is Ranjith')
    res.render('index',{title: 'My Express App', message: 'Hello World!!!'})
});

module.exports = router;