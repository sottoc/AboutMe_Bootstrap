var api_endpoint = "http://localhost:8000";

$(function(){

});

function gotoSignup(){
    window.location.href = "/signup/email.html";
}

function progressBar(x){
    setTimeout(function(){
        $(".progress-bar").css("width", x+"%");
    }, 500);
}