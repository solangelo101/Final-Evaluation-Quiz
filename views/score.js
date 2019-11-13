var score=document.getElementById("score");
  function getMarks()
  {
    var xhr=new XMLHttpRequest();
    xhr.open('GET','/getScore');
    xhr.send();
    xhr.onreadystatechange=function()
    {
      if(xhr.readyState==4 && xhr.status==200)
      {
        arr=JSON.parse(xhr.responseText);
        score.innerHTML="Your marks are "+arr.Score;
      }
    }
  }
