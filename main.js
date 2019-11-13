//require statements
const express=require("express");
var mongoose=require("mongoose");
const path=require("path");
var bodyParser = require('body-parser');

//assign variables
const app=express();
const router = express.Router();
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/Script'));
app.use('/', router);
app.use(express.urlencoded({ extended: true }))
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get requests to html pages
router.get('/addQuestions',function(req,res){
  res.sendFile(path.join(__dirname+'/views/addQuestions.html'));
});

router.get('/register',function(req,res){
  res.sendFile(path.join(__dirname+'/views/register.html'));
});

router.get('/mainpage',function(req,res){
  res.sendFile(path.join(__dirname+'/views/mainpage.html'));
});

router.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/views/login.html'));
});

router.get('/quiz',function(req,res){
  res.sendFile(path.join(__dirname+'/views/quiz.html'));
});


// mongoose connection stuff
mongoose.connect("mongodb://localhost/quiz_portal",{ useNewUrlParser: true });
var db=mongoose.connection;
var Schema=mongoose.Schema;
mongoose.set('useFindAndModify', false);

//questions table

var Question=new Schema({
  Topic:String,
  Description:String,
  Option1:String,
  Option2:String,
  Option3:String,
  Option4:String,
  Answer:String,
})

var question=mongoose.model("question",Question);

app.post('/addQuestion',(req,res)=>
{
  var myData=new question();
  myData.Topic=req.body.topic;
  myData.Description=req.body.Descp;
  myData.Option1=req.body.Option1;
  myData.Option2=req.body.Option2;
  myData.Option3=req.body.Option3;
  myData.Option4=req.body.Option4;
  myData.Answer=req.body.Answer;
  myData.save(function(err){
    if(!err)
    {
    console.log('Data Saved!')
    res.redirect('/addQuestions');
  }
  })
})

app.get('/getQuestions',(req,res)=>{
  skipno=parseInt(req.query.since);
  limitno=parseInt(req.query.per_page);
  question.find({},null,{skip:skipno,limit:limitno},function(err,docs)
{
 //console.log('database question are',docs);
  res.send(docs);
});
})

app.get('/getQuestionCount',(req,res)=>
{
  question.countDocuments(function(err,docs)
{
  console.log(docs);
  res.send({count2:docs})
});
})

app.get('/getToBeEditedQuestion',(req,res)=>
{
  question.findOne({_id:req.query.number},function(err,docs)
{
  if(!err)
  {
    res.send(docs);
  }
});
})

app.post('/editQuestion',(req,res)=>
{
  console.log(req.body);
  filter={_id:req.body.number};
  update={Topic:req.body.topic,Description:req.body.descp,Option1:req.body.option1,Option2:req.body.option2,Option3:req.body.option3,Option4:req.body.option4,Answer:req.body.answer};
  question.findOneAndUpdate(filter,update,function(err,docs)
{
  if(!err)
  {
    console.log("Hooray!");
  }
  else {
    console.log(err);
  }

});
})

app.post('/deleteQuestion',(req,res)=>
{
  console.log('delete product body is\t',req.body);
  filter={_id:req.body.number};
  question.findOneAndDelete(filter,function(err,docs)
{
  res.redirect('/addQuestions');
});
})

// array users
var User=new Schema({
  Name:String,
  Username:String,
  Password:String,
//  Password1:String,
})
var users=mongoose.model("users",User);
app.post('/registerform',(req,res)=>
{
  console.log('body \t',req.body);
  var myData=new users();
  myData.Name=req.body.name;
  myData.Username=req.body.username;
  myData.Password=req.body.password;
  myData.save(function(err)
{
  //body ..
  if(!err)
  {
    console.log("Data Saved");
    console.log(myData);
    res.redirect('/mainpage');
  }
  else {
    console.log(err)
  }
})
})

app.get('/checkUsername',(req,res)=>
{
  inputUsername=req.query.username;
  console.log('username to check is\t',inputUsername);
  users.findOne({Username:inputUsername},function(err,docs)
{
  if(docs==null)
  {
    console.log('Username is Unique!');
    res.send({Username:null});
  }
  else {
    console.log('username already present\t',docs);
    res.send(docs);
  }
})
})

app.get('/actualpassword',(req,res)=>
{
  usernameSent=req.query.username;
  console.log("Username ",usernameSent);
  users.findOne({Username:usernameSent},function(err,docs)
{
  console.log('user found is\t',docs);
  if(docs==null)
  {
    res.send({Password: ""});
  }
  else {
    console.log("Actual Password ",docs.Password);
    res.send(docs);
  }
})
})

// score table
var Score=new Schema({
  User:String,
  Score:Number,
})
var score=mongoose.model("score",Score);

app.post('/startTotalForSession',(req,res)=>{
  var myData=new score();
  myData.User=req.body.user;
  myData.Score="0";
  myData.save(function(err){
    if(!err)
    {
      console.log('Quiz started!');
      res.redirect('/quiz');
    }
    else {
      console.log(err);
    }
  })
})

app.get('/getQuizId',(req,res)=>
{
  score.findOne({}, {}, { sort: { 'created_at' : 1 } }, function(err, post) {
  console.log( post );
  res.send(post);
});
})

app.get('/getOldScore',(req,res)=>
{
  console.log('old score query is ',req.query);
  score.findOne({_id:req.query.quizId},function(err,docs){
    console.log('old score docs',docs);
    res.send(docs);
  })
})

app.post('/updateScore',(req,res)=>{
  filter={_id:req.body.id};
  update={Score:req.body.score};
  score.findOneAndUpdate(filter,update,function(err,docs){
    if(!err)
    {
      console.log('Score updated!');
    }
    else {
      console.log(err);
    }
  })
})


app.listen(5554);
