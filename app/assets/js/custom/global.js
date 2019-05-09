var api_endpoint = "http://localhost:8000";
var domain = "http://localhost:3000";

$(function(){
    if(localStorage.getItem("signup_model") == undefined){
        window.location.href = "/";
    }
});

function gotoSignup(){
    window.location.href = "/signup/email.html";
}

function progressBar(x){
    setTimeout(function(){
        $(".progress-bar").css("width", x+"%");
    }, 500);
}

// check if array contains value
function checkValue(value,arr){
    var status = false;
    for(var i=0; i<arr.length; i++){
        var name = arr[i];
        if(name == value){
            status = true;
            break;
        }
    }
    return status;
}