$(function(){
    
});

function getStoredUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function storeCurrentUser(currentUser){
   localStorage.setItem('currentUser', JSON.stringify(currentUser));
};

function getStoredToken(){
    return JSON.parse(localStorage.getItem('token'));
}

function storeCurrentToken(token){
  localStorage.setItem('token', JSON.stringify(token));
};

function removeCurrentUser(){
  localStorage.removeItem('currentUser');
};

function removeCurrentToken(){
  localStorage.removeItem('token');
};

function login(email, password) {
    console.log(email, password)
    var formdata = new FormData();
    formdata.append("grant_type", grant_type);
    formdata.append("client_id", client_id);
    formdata.append("client_secret", client_secret);
    formdata.append("username", email);
    formdata.append("password", password);
    var url = api_endpoint + "/oauth/token";
    jQuery.ajax({
        url: url,
        type: "POST",
        data: formdata,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data);
            storeCurrentToken(data);
            window.location.href = "../profile";
        }
    });
}

function logout(){
    removeCurrentUser();
    removeCurrentToken();
    window.location.href = "/login.html";
}

function checkUserToken(){
    var token = JSON.parse(localStorage.getItem("token"));
    if(token == undefined){
        return false;
    } else{
        return true;
    }
}

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

const getBase64 = async function(file){
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function() {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}