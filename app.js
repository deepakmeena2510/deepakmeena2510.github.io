function login(){
  var u=document.getElementById("user").value;
  var p=document.getElementById("pass").value;

  if(u=="admin" && p=="12345"){
    localStorage.setItem("login","yes");
    window.location="home.html";
  }else{
    alert("Wrong Login");
  }
}

function checkLogin(){
  if(localStorage.getItem("login")!="yes"){
    window.location="index.html";
  }
}

function logout(){
  localStorage.removeItem("login");
  window.location="index.html";
}
