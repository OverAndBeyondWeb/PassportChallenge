require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const socketIO = require('socket.io');
const http = require('http');
const server = http.Server(app);
const io = socketIO(server);


const PORT = process.env.PORT || 3001;
const Factory = require('./models/Factory');

//set up promises with mongoose
mongoose.Promise = global.Promise;

//db config
const db = require('./config/keys').MONGODB_URI;

//connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('connected to mongo'))
  .catch(err => console.log(err));

app.use(express.static(path.join(__dirname, 'client', 'build')));


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
