$(function(){
    $("#header1").load("layout/header1.html");
    $("#login_email").focus();
    $("#warning_tip").hide();
    $(".logout-link").hide();
});

$("#login_email").keypress(function(){
    $("#warning_tip").hide();
});

$("#login_password").keypress(function(){
    $("#warning_tip").hide();
});

function clickLogin(){
    var email_address = $("#login_email").val();
    var password = $("#login_password").val();
    if(email_address == ""){
        $("#warning_tip").html("Please enter email address");
        $("#warning_tip").show();
        $("#login_email").focus();
        return;
    }
    var emailValid = email_address.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if(!emailValid){
        $("#warning_tip").html("Please enter valid email address");
        $("#warning_tip").show();
        $("#login_email").focus();
        return;
    }
    if(password == ""){
        $("#warning_tip").html("Please enter password");
        $("#warning_tip").show();
        $("#login_password").focus();
        return;
    }
    login(email_address, password);
}