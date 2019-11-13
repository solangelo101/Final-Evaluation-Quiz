var submit=false;
var divsinglequestion=document.getElementById("divsinglequestion");
var divnextprev=document.getElementById("divnextprev");
var start=0;
var limit=1;
var divstart=document.getElementById("divstart");
var hstart=document.createElement("h2");
divstart.appendChild(hstart);

function getEachQuestion()
{
  var xhttp=new XMLHttpRequest();
  xhttp.open('GET','/getQuestions?since='+start+"&per_page=1");
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
  var endButton=document.createElement('button');
  endButton.innerHTML="Show marks!";
  divnextprev.appendChild(endButton);
  endButton.addEventListener("click",function(event){
    window.location='/scorepage';
  })
}
divnextprev.appendChild(next);
}

/*while(submit==false)
{
  next.disabled=true;
}*/

function nextFunction()
{
start+=1;
divsinglequestion.innerHTML="";
divnextprev.innerHTML="";

getEachQuestion();

}


function addToDOM(objectQuestion){
  var divQuestionAdded=document.createElement("div");
    divQuestionAdded.setAttribute("id",objectQuestion._id);
  //  divQuestionAdded.setAttribute("style","background-color:#ffe6e6;padding:20px;width:100px");
    var txtQuestionTopic=document.createElement("p");
    txtQuestionTopic.innerHTML=objectQuestion.Topic;

    var txtQuestionDesc=document.createElement("p");
    txtQuestionDesc.innerHTML=objectQuestion.Description;

    var radioQuestionOption1=document.createElement("input");
    radioQuestionOption1.setAttribute("type","radio");
    radioQuestionOption1.setAttribute("name","option");
    radioQuestionOption1.setAttribute("value",objectQuestion.Option1);
    var txtOption1=document.createElement("p");
    txtOption1.innerHTML=objectQuestion.Option1;


    var radioQuestionOption2=document.createElement("input");
    radioQuestionOption2.setAttribute("type","radio");
    radioQuestionOption2.setAttribute("name","option");
    radioQuestionOption2.setAttribute("value",objectQuestion.Option2);
    var txtOption2=document.createElement("p");
    txtOption2.innerHTML=objectQuestion.Option2;

    var radioQuestionOption3=document.createElement("input");
    radioQuestionOption3.setAttribute("type","radio");
    radioQuestionOption3.setAttribute("name","option");
    radioQuestionOption3.setAttribute("value",objectQuestion.Option3);
    var txtOption3=document.createElement("p");
    txtOption3.innerHTML=objectQuestion.Option3;

    var radioQuestionOption4=document.createElement("input");
    radioQuestionOption4.setAttribute("type","radio");
    radioQuestionOption4.setAttribute("name","option");
    radioQuestionOption4.setAttribute("value",objectQuestion.Option4);
    var txtOption4=document.createElement("p");
    txtOption4.innerHTML=objectQuestion.Option4;

    var btnSubmit=document.createElement("button");
    btnSubmit.setAttribute("id",objectQuestion._id);
    btnSubmit.innerHTML="Submit";
    btnSubmit.setAttribute("style","width:70px;height:25px");

    txtAnswer=document.createElement("p");
    txtAnswer.setAttribute("id",objectQuestion.Answer);


    divQuestionAdded.appendChild(txtQuestionTopic);
    divQuestionAdded.appendChild(txtQuestionDesc);
    divQuestionAdded.appendChild(radioQuestionOption1);
    divQuestionAdded.appendChild(txtOption1);
    divQuestionAdded.appendChild(radioQuestionOption2);
    divQuestionAdded.appendChild(txtOption2);
    divQuestionAdded.appendChild(radioQuestionOption3);
    divQuestionAdded.appendChild(txtOption3);
    divQuestionAdded.appendChild(radioQuestionOption4);
    divQuestionAdded.appendChild(txtOption4);
    divQuestionAdded.appendChild(btnSubmit);
    divsinglequestion.appendChild(divQuestionAdded);


  btnSubmit.addEventListener("click",function(event)
  {
    submit=true;
    var chosen;
    if(radioQuestionOption1.checked)
    {
      chosen=radioQuestionOption1.value;
    }
    else if(radioQuestionOption2.checked)
    {
      chosen=radioQuestionOption2.value;
    }
    else if(radioQuestionOption3.checked)
    {
      chosen=radioQuestionOption3.value;
    }
    else if(radioQuestionOption4.checked)
    {
      chosen=radioQuestionOption4.value;
    }
    else {
      alert('Please choose an answer!');
      return;
    }
    console.log(objectQuestion);
    getQuizId(txtAnswer.id,chosen)
    btnSubmit.disabled=true;
  //  updateScore(hstart.id,objectQuestion.ans,chosen);
  });
}

function getQuizId(answer,chosen)
{
  var xhr =new XMLHttpRequest();
  xhr.open('GET','/getQuizId');
  xhr.send();
  xhr.onreadystatechange=function()
  {
    if(xhr.readyState==4 && xhr.status==200)
    {
      var idarr=JSON.parse(xhr.responseText);
      hstart.innerHTML="The Quiz has started!";
      console.log('quiz id is',idarr);
      hstart.setAttribute("id",idarr._id);
      getOldScore(idarr._id,answer,chosen);
    }
  }
}

function getOldScore(id,answer,chosen)
{
  var ahttp=new XMLHttpRequest();
  ahttp.open("GET",'/getOldScore?quizId='+id);
  ahttp.send();
  ahttp.onreadystatechange=function()
  {
    if(ahttp.readyState==4 && ahttp.status==200)
    {
      var oldScore1=JSON.parse(ahttp.responseText);
      var oldScore=oldScore1.Score;
      console.log('oldScore1 is ',typeof oldScore1);
      console.log('oldscore is ',oldScore);
      chosenone=chosen;
      qid=id
      console.log(chosenone);
      updateScore(oldScore,id,answer,chosenone);
    }
  }
}

function updateScore(oldScore,id,answer,chosenone)
{
  var score;
  if(chosenone==answer)
  {
    score=oldScore+1;
  }
  else {
    score=oldScore;
  }
  var rhttp=new XMLHttpRequest();
  rhttp.open('POST','/updateScore',true);
  rhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  rhttp.onreadystatechange=function(){
    if(rhttp.readyState==4 && rhttp.status==200)
    {
      console.log('Updated!')
      alert('Your answer is submitted!');
      btnSubmit.disabled=true;
    }
    else {
      console.log('err');
      console.log(rhttp.status);
    }
  }
  rhttp.send('score='+score+'&id='+id);
}
