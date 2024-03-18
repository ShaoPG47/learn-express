const express = require('express')

const path = require('path')
const fs = require("fs");
const router = express.Router()

let users;
fs.readFile(path.resolve(__dirname, '../data/users.json'), function(err, data) {
  console.log('reading file ... ');
  if(err) throw err;
  users = JSON.parse(data);
})

router.get('/read/usernames/', (req, res) => {
    const usrnames = users.map(user=>({id: user.id, username: user.username}));
    res.json(usrnames)
})

router.get('/usernames/:name', (req, res) => {
    const {username} = req.params;
  const user = users.find(user => user.username === username)

  if (user) {
    res.json({email: user.email})
  } else {
    res.status(404).json({error: 'user not found'})
  }
})