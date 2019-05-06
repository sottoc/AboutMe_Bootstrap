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