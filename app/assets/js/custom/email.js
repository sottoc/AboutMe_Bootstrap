$(function(){
    $("#header2").load("../layout/header2.html");
    $("#email_required_tips").css("display", "none");
    $("#email_validate_tips").css("display", "none");
    $("#email_existing_tips").css("display", "none");
    for(var i=1;i<=10;i++){
        progressBar(i);
    }
    var signup_model = JSON.parse(localStorage.getItem("signup_model"));
    $('input[type="email"]').val(signup_model['email_address']);
});

function changeEmail(){
    $("#email_required_tips").css("display", "none");
    $("#email_validate_tips").css("display", "none");
    $("#email_existing_tips").css("display", "none");
}

function next(){
    var email = $('input[type="email"]').val();
    if(email == ""){
        $("#email_required_tips").show();
        $('input[type="email"]').focus();
        return;
    }
    var emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if(!emailValid){
        $("#email_validate_tips").show();
        $('input[type="email"]').focus();
        return;
    }
    var signup_model = JSON.parse(localStorage.getItem("signup_model"));
    signup_model['email_address'] = email;
    localStorage.setItem("signup_model", JSON.stringify(signup_model));
    window.location.href = "/signup/name.html";
}