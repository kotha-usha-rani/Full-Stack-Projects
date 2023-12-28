const express = require("express")
const PORT = 3000;
const app = express();
var bodyParser = require('body-parser');
// write your logic here, DONT WRITE app.listen(3000) when you're running tests, the tests will automatically start the server
const userArr = [];
app.use(bodyParser.json());

//users data
app.get('/data', (req, res) => {
  var name = req.headers.name;
  var pwd = req.headers.pwd;
  var userFound = false;
  for(var i=0; i<userArr.length; i++){
    if(userArr[i].userName === name && userArr[i].password === pwd){
      userFound = true;
      break;
    }
  }
  if(userFound){
    var ans = [];
    for(var i=0; i<userArr.length; i++){
      ans.push({
        "firstname" : userArr[i].firstname,
        "lastname" : userArr[i].lastname,
        "id" : userArr[i].randID,
      });
    }
    res.json({ans});
  }
  else{
    res.sendStatus(400);
  }
});

//singin
app.post('/signin', (req, res) => {
  var userExists = false;
  var i = 0;
  for(i=0; i<userArr.length; i++){
    if(userArr[i].username === req.body.username){
      if(userArr[i].password === req.body.password){
        userExists = true;
        break;
      }
    }
  }
  if(userExists){
    const user = {
      "firstName": userArr[i].firstname,
      "lastName":userArr[i].lastname,
      "randID": userArr[i].randID
    }
    res.status(200).send(user);
  }
  else res.status(401).send("Invalid credentials"); 
});

//signup
app.post('/signup', (req, res) => {
  var userExists = false;
  for(var obj of userArr){
    if(obj.username === req.body.username){
      userExists = true;
    }
  }
  if(userExists)
    res.status(400).send("User exists");
  else{
    const newUser = req.body;
    userArr.push(newUser);
    res.status(200).send("Account created");
  }
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
// module.exports = app;