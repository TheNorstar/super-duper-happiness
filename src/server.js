// server/index.js
const Server = require("socket.io").Server;
const express = require("express");
const cors = require('cors');
const path = require('node:path');
const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://m001-student:OHz5308MNikxnSgI@cluster0.mvq5s.mongodb.net/?retryWrites=true&w=majority";       
const client = new MongoClient(uri);
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
console.log(PORT);
const app = express();
app.use(cors());
app.use(bodyParser.json());

let sockets = [];

async function insertMessage(data) {
  const db = client.db('chat');
  const messages = db.collection('messages');
  await messages.insertOne(data);
}

async function getMessages(user1, user2) {
  const db = client.db('chat');
  const messages = db.collection('messages');
  const data = await messages.find({$or : [ {to : user1, from : user2}, {from : user1, to : user2}]}).toArray();
  return data;
}

const io = new Server(3002, {
  path : "/socket/",
  cors : { origin : ['http://localhost:3000']}
});

try {
  client.connect();

} catch (e) {
  console.log(e)
}


io.on("connection", async (socket) => {
  socket.on("disconnect", () => {
    sockets = sockets.filter((el) => el.socket.id != socket.id);
  });

  socket.on("login", async (user) => {
    const db = client.db('chat');
    const messages = db.collection('users');
    const data = await messages.findOne({username : user.username});
    if(data != null && user.password == data.password)
      socket.emit("login-yes");
  })

  socket.on("get-messages", async (user1, user2) => {
    sockets = sockets.map((el) => el.socket.id == socket.id? {user : user1, socket : socket} : el)
    const data = await getMessages(user1, user2);
    socket.emit("messages", data);
  })

  socket.on("get-users", async () => {
    const db = client.db('chat');
    const usersColl = db.collection('users');
    const users = await (await usersColl.find({}, {"username": 1, "_id": 0}).toArray()).map((el) => el.username);
    socket.emit("users", users);
  })
  socket.on("message", async (message) => {
    await insertMessage(message);
    const data = await getMessages(message.from, message.to);
    sockets.forEach((el) => el.user == message.to || el.user == message.from? el.socket.emit("messages", data):'');
  }) 

  socket.on("delete-message", async (id, message) => {
    const db = client.db('chat');
    const messages = db.collection('messages');
    messages.deleteOne({_id : new ObjectId(id)});
    const data = await getMessages(message.from, message.to);
    sockets.forEach((el) => el.user == message.to || el.user == message.from? el.socket.emit("messages", data):'');
  })

  socket.on("sign-up", async (data) => {
    const db = client.db('chat');
    const messages = db.collection('users');
    const user = await messages.findOne({username: data.user});
    if(user == null)
      messages.insertOne({username : data.user, password : data.password});
  })
  sockets.push({user: "", socket : socket});
});

client.close();