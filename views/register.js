var activeuser=getActiveUser();

function storeActiveUser(activeuser)
{
  localStorage.activeuser=JSON.stringify(activeuser);
}

function getActiveUser()
{
  if(!localStorage.activeuser)
  {
    localStorage.activeuser=JSON.stringify("");
  }
    return JSON.parse(localStorage.activeuser);
}

function checkpassword()
{
  var password=document.getElementById("inputPassword").value;
  var repassword=document.getElementById("inputRePassword").value;
  if(password!=repassword)
  {
    document.getElementById("btnregister").disabled = true;
    document.getElementById("mismatcherror").innerHTML="Passwords do not match!";
  }
  else
  {
    document.getElementById("btnregister").disabled = false;
    document.getElementById("mismatcherror").innerHTML="";
  }
}


function checkUsername()
{
  var name=document.getElementById("inputName").value;
  var username=document.getElementById("inputUsername").value;
  var password=document.getElementById("inputPassword").value;

  var xhttp=new XMLHttpRequest();
  xhttp.open("GET",'/checkUsername?username='+username);
  xhttp.send();
  xhttp.onreadystatechange=function()
{
    if (xhttp.readyState == 4 && xhttp.status == 200)
    {
      var checkedUsername=JSON.parse(xhttp.responseText);
      console.log('username stuff recieved is',checkedUsername);
      if(checkedUsername.Username==null)
      {
        registerform(name,username,password);
      }
      else {

      //  usernametaken.innerHTML="This username is already taken!!";
      alert("This username is already taken!!");
      }
    }
    else
    {
       console.log('error is',xhttp.status) ;
    }
  };
}

function registerform(name,username,password)
{
  activeuser
  var xhr=new XMLHttpRequest();
  xhr.open("POST",'/registerform',true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
  if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    activeuser=username;
    storeActiveUser(activeuser);
    window.location='/mainpage';
  }
}
xhr.send('name='+name+'&username='+username+'&password='+password);
}

var alogin=document.createElement("a");
alogin.innerHTML="Or Login?";
alogin.setAttribute("href","/login");
var btnregister=document.getElementById("btnregister");
divregisterform.appendChild(alogin);
