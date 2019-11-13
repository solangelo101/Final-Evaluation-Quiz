var divAddQuestion=document.getElementById("divAddQuestion");
var aAddNewQuestion=document.getElementById("aAddNewQuestion");
var start=0;
var index=start+1;
var limit=5;

function addQuestionsForm()
{
  hideAddNewQuestionLink(aAddNewQuestion);
  var formAddQuestion=document.createElement("form");
  formAddQuestion.setAttribute("name","formAddQuestion");
  formAddQuestion.setAttribute("action","/addQuestion");
  formAddQuestion.setAttribute("method","POST");

  var labelAddQuestion=document.createElement("label");
  labelAddQuestion.innerHTML="Enter Topic";
  formAddQuestion.appendChild(labelAddQuestion);

  addSpace(formAddQuestion,2);

  var inputQuestionTopic=document.createElement("input");
  inputQuestionTopic.setAttribute("name","topic");
  inputQuestionTopic.setAttribute("type","text");
  inputQuestionTopic.setAttribute("placeholder","Enter Question Topic");
  inputQuestionTopic.setAttribute("style","width:40%");
  formAddQuestion.appendChild(inputQuestionTopic);

  addSpace(formAddQuestion,2);

  var labelQuestionDescp=document.createElement("label");
  labelQuestionDescp.innerHTML="Question Description";
  formAddQuestion.appendChild(labelQuestionDescp);

  addSpace(formAddQuestion,2);

  var inputQuestionDescp=document.createElement("textarea");
  inputQuestionDescp.setAttribute("name","Descp");
  inputQuestionDescp.setAttribute("type","text");
  inputQuestionDescp.setAttribute("placeholder","Enter Question description");
  inputQuestionDescp.setAttribute("style","width:40%");
  formAddQuestion.appendChild(inputQuestionDescp);

  addSpace(formAddQuestion,2);

  var labelQuestionOption1=document.createElement("label");
  labelQuestionOption1.innerHTML="Question option 1";
  formAddQuestion.appendChild(labelQuestionOption1);

  addSpace(formAddQuestion,2);

  var inputQuestionOption1=document.createElement("input");
  inputQuestionOption1.setAttribute("name","Option1");
  inputQuestionOption1.setAttribute("type","text");
  inputQuestionOption1.setAttribute("placeholder","Enter Question option 1");
  inputQuestionOption1.setAttribute("style","width:40%");
  formAddQuestion.appendChild(inputQuestionOption1);

  addSpace(formAddQuestion,2);

  var labelQuestionOption2=document.createElement("label");
  labelQuestionOption2.innerHTML="Question option 2";
  formAddQuestion.appendChild(labelQuestionOption2);

  addSpace(formAddQuestion,2);

  var inputQuestionOption2=document.createElement("input");
  inputQuestionOption2.setAttribute("name","Option2");
  inputQuestionOption2.setAttribute("type","text");
  inputQuestionOption2.setAttribute("placeholder","Enter Question option 2");
  inputQuestionOption2.setAttribute("style","width:40%");
  formAddQuestion.appendChild(inputQuestionOption2);

  addSpace(formAddQuestion,2);

  var labelQuestionOption3=document.createElement("label");
  labelQuestionOption3.innerHTML="Question option 3";
  formAddQuestion.appendChild(labelQuestionOption3);

  addSpace(formAddQuestion,2);

  var inputQuestionOption3=document.createElement("input");
  inputQuestionOption3.setAttribute("name","Option3");
  inputQuestionOption3.setAttribute("type","text");
  inputQuestionOption3.setAttribute("placeholder","Enter Question option 3");
  inputQuestionOption3.setAttribute("style","width:40%");
  formAddQuestion.appendChild(inputQuestionOption3);

  addSpace(formAddQuestion,2);

  var labelQuestionOption4=document.createElement("label");
  labelQuestionOption4.innerHTML="Question option 4";
  formAddQuestion.appendChild(labelQuestionOption4);

  addSpace(formAddQuestion,2);

  var inputQuestionOption4=document.createElement("input");
  inputQuestionOption4.setAttribute("name","Option4");
  inputQuestionOption4.setAttribute("type","text");
  inputQuestionOption4.setAttribute("placeholder","Enter Question option 4");
  inputQuestionOption4.setAttribute("style","width:40%");
  formAddQuestion.appendChild(inputQuestionOption4);

  addSpace(formAddQuestion,2);

  var labelQuestionAnswer=document.createElement("label");
  labelQuestionAnswer.innerHTML="Enter Answer";
  formAddQuestion.appendChild(labelQuestionAnswer);

  addSpace(formAddQuestion,2);


  var inputQuestionAnswer=document.createElement("input");
  inputQuestionAnswer.setAttribute("name","Answer");
  inputQuestionAnswer.setAttribute("type","text");
  inputQuestionAnswer.setAttribute("style","width:40%");
  inputQuestionAnswer.setAttribute("placeholder","Enter Question Answer");
  formAddQuestion.appendChild(inputQuestionAnswer);

  addSpace(formAddQuestion,2);

  var btnSubmit=document.createElement("input");
  btnSubmit.setAttribute("type","submit");
  btnSubmit.setAttribute("name","btnSubmit");
  btnSubmit.setAttribute("style","width:20%;height:25px");
  btnSubmit.innerHTML="Submit";
  formAddQuestion.appendChild(btnSubmit);

  var btnCancel=document.createElement("button");
  btnCancel.setAttribute("name","btnCancel");
  btnCancel.setAttribute("style","width:20%;height:25px");
  btnCancel.innerHTML="Cancel";
  formAddQuestion.appendChild(btnCancel);
  divAddQuestion.appendChild(formAddQuestion);

btnCancel.addEventListener("click",function(event)
{
  deleteQuestionForm();
  unhideAddNewQuestionLink(aAddNewQuestion);
});
}

function addSpace(target,number){
  for(var i=0;i<number;i++)
  {
    var blankLine=document.createElement("br");
    target.appendChild(blankLine);
  }
}

function hideAddNewQuestionLink(target)
{
  target.setAttribute("style","visibility:hidden");
}

function deleteQuestionForm(){
  var childNodes = divAddQuestion.childNodes;
  for (var i = 0; childNodes.length > 0;)
  {
    divAddQuestion.removeChild(childNodes[i]);
  }
}

function unhideAddNewQuestionLink(target)
{
  target.setAttribute("style","visibility:visible");
}

function getStoredQuestions()
{
  var xhttp=new XMLHttpRequest();
  xhttp.open('GET','/getQuestions?since='+start+'&per_page='+limit);
  xhttp.send();
  xhttp.onreadystatechange=function()
{
    // readyState 4 means the request is done.
    // status 200 is a successful return.
    if (xhttp.readyState == 4 && xhttp.status == 200)
    {
      //document.getElementById("users").innerHTML = xhttp.responseText; // 'This is the output.'
      let Questions = JSON.parse(xhttp.responseText) ;
      if(Array.isArray(Questions)  && Questions.length )
      {
        Questions.forEach(function(Question)
                      {
                        addToDOM(Question);
                      });
                      getQuestionCount();
      }
    }
    else
    {
        // An error occurred during the request.
       console.log(xhttp.status) ;
    }
  };
}

var divnextprev=document.getElementById("divnextprev");
var divnextprev1=document.getElementById("divnextprev1");

function getQuestionCount()
{
  var rxhr=new XMLHttpRequest();
  rxhr.open("GET",'/getQuestionCount');
  rxhr.send();
  rxhr.onreadystatechange=function()
{
    // readyState 4 means the request is done.
    // status 200 is a successful return.
    if (rxhr.readyState == 4 && rxhr.status == 200)
    {
      //document.getElementById("users").innerHTML = xhttp.responseText; // 'This is the output.'
      var count1 = JSON.parse(rxhr.responseText);
      var count=count1.count2;
      createButtons(count);
      createButtons1(count);
    }
    else
    {
        // An error occurred during the request.
       console.log(rxhr.status) ;
    }
  };
}

function createButtons(count)
{

var next=document.createElement("button");
next.innerHTML="Next";
next.setAttribute("style","width:100px;height:25px");
next.addEventListener("click",function(event){
  nextFunction();
});
if(start+limit>=count)
{
  next.disabled=true;
}


var prev=document.createElement("button");
prev.innerHTML="Previous";
prev.setAttribute("style","width:100px;height:25px");
prev.addEventListener("click",function(event){
  prevFunction();
});
if(start-limit<0)
{
  prev.disabled=true;
}
divnextprev.appendChild(prev);
divnextprev.appendChild(next);
}

function createButtons1(count)
{

var next1=document.createElement("button");
next1.innerHTML="Next";
next1.setAttribute("style","width:100px;height:25px");
next1.addEventListener("click",function(event){
  nextFunction();
});
if(start+limit>=count)
{
  next1.disabled=true;
}


var prev1=document.createElement("button");
prev1.innerHTML="Previous";
prev1.setAttribute("style","width:100px;height:25px");
prev1.addEventListener("click",function(event){
  prevFunction();
});
if(start-limit<0)
{
  prev1.disabled=true;
}
divnextprev1.appendChild(prev1);
divnextprev1.appendChild(next1);
}


function nextFunction()
{
start+=5;
divListQuestions.innerHTML="";
divnextprev.innerHTML="";
divnextprev1.innerHTML="";
index=start+1;

getStoredQuestions();

}

function prevFunction()
{
divListQuestions.innerHTML="";
divnextprev.innerHTML="";
divnextprev1.innerHTML="";
start-=5;
index=start+1;
getStoredQuestions();

}

function addToDOM(objectQuestion){
  var divQuestionAdded=document.createElement("div");
    divQuestionAdded.setAttribute("id",objectQuestion._id);
  //  divQuestionAdded.setAttribute("style","background-color:#ffe6e6;padding:20px;width:100px");
    var txtQuestionTopic=document.createElement("p");
    txtQuestionTopic.innerHTML=index+".<br><br>Topic : "+objectQuestion.Topic;
    index++;

    var txtQuestionDesc=document.createElement("p");
    txtQuestionDesc.innerHTML="Question : "+objectQuestion.Description;

    var txtQuestionOption1=document.createElement("p");
    txtQuestionOption1.innerHTML="Option 1 : "+objectQuestion.Option1;

    var txtQuestionOption2=document.createElement("p");
    txtQuestionOption2.innerHTML="Option 2 : "+objectQuestion.Option2;

    var txtQuestionOption3=document.createElement("p");
    txtQuestionOption3.innerHTML="Option 3 : "+objectQuestion.Option3;

    var txtQuestionOption4=document.createElement("p");
    txtQuestionOption4.innerHTML="Option 4 : "+objectQuestion.Option4;

    var txtQuestionAnswer=document.createElement("p");
    txtQuestionAnswer.innerHTML="Answer : "+objectQuestion.Answer;

    var btnEdit=document.createElement("button");
    btnEdit.setAttribute("id",objectQuestion._id);
    btnEdit.innerHTML="Edit";
    btnEdit.setAttribute("style","width:70px;height:25px");

    var btnDelete=document.createElement("button");
    btnDelete.setAttribute("id","btnDelete");
    btnDelete.innerHTML="Delete";
    btnDelete.setAttribute("style","width:70px;height:25px");

    divQuestionAdded.appendChild(txtQuestionTopic);
    divQuestionAdded.appendChild(txtQuestionDesc);
    divQuestionAdded.appendChild(txtQuestionOption1);
    divQuestionAdded.appendChild(txtQuestionOption2);
    divQuestionAdded.appendChild(txtQuestionOption3);
    divQuestionAdded.appendChild(txtQuestionOption4);
    divQuestionAdded.appendChild(txtQuestionAnswer);
    divQuestionAdded.appendChild(btnEdit);
    divQuestionAdded.appendChild(btnDelete);
    divListQuestions.appendChild(divQuestionAdded);


  btnEdit.addEventListener("click",function(event)
  {
    xhttp.open('GET','/getToBeEditedQuestion?number='+btnEdit.id);
  xhttp.send();
    xhttp.onreadystatechange=function()
  {
      // readyState 4 means the request is done.
      // status 200 is a successful return.
      if (xhttp.readyState == 4 && xhttp.status == 200)
      {
        let Question = JSON.parse( xhttp.responseText) ;
          console.log(Question);
          editQuestion(Question);
      }
      else
      {
          // An error occurred during the request.
         console.log(xhttp.status) ;
      }
    };*/
  });
  btnDelete.addEventListener("click",function(event)
  {
  /*  http.open("POST",'/deleteQuestion',true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      location.reload();
    }
}
http.send('number='+objectQuestion._id);*/
});
  //unhideAddNewQuestionLink(aAddNewQuestion);
  //deleteQuestionForm();
}
