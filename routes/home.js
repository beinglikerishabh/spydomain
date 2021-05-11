const express = require('express');
const router = express.Router();
const path = require("path");
const {spawn} = require('child_process');

router.get('/',async (req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'),(err)=>{
            if(err){
                res.writeHead(404);
                res.end(" page not found");
            }
        });
}) ;

router.post('/', async (req,res)=>{
    const varun = req.body.domain;
    var dataToSend;
    // spawn new child process to call the python script
    const python =  spawn('python', ['spyfile.py','-d',varun]);
    // collect data from script
     python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    const dataString = dataToSend.toString();
    const dataJson = eval(`(${dataString})`);
    res.render('subdomains',{"domain": dataJson});
 });
 
})



module.exports = router;