const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const app = express();
const mongoose = require('mongoose')
const {MONGO_URI} = require('./keys');


//const  cors = require('cors');
// const socket = require('socket.io');


//app.use(cors());


mongoose.connect(MONGO_URI,{
     useNewUrlParser:true,
     useUnifiedTopology:true
})
mongoose.connection.on("connected",()=>{
    console.log("db connceted");
})
mongoose.connection.on("err",(err)=>{
    console.log(err);
})

require ('./models/user');
require('./models/post')

app.use(express.json());
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

const PORT = 5000
//const server = 
app.listen(PORT,()=>{
    console.log("App listening on port",PORT);
});



// const io = require("socket.io")(server, {
//     pingTimeout: 60000,
//     cors: {
//       origin: "http://localhost:3000",
//       // credentials: true,
//     },
// });

// io.on("conncetion", (socket)=>{
//     console.log("Connected to socket.io");
//     socket.on("setup",(userData)=>{
//         socket.join(userData._id);
//         socket.emit("conneted");
//     })

//     socket.off('setup',()=>{
//         console.log("USER DISCONNECTED");
//         socket.leave(userData);
//     });
// });

