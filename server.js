//Import express
const express = require('express');

//Itinitalise
const app = express();

//Serve static files from public
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
})

let server = app.listen(8888, function(){
    console.log("App server is running on port 8888");
   });
