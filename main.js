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
})
})


app.listen(5554);
