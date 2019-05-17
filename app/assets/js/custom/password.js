var password = "";
$(function(){
    if(checkUserToken()){
        window.location.href = "../profile";
        return;
    }
    $("#header2").load("../layout/header2.html");
    hide_tips();
    for(var i=91;i<=95;i++){
        progressBar(i);
    }
    $("#user_password").focus();
   
});

$("#user_password").keyup(function(){
    hide_tips();
})

$("#user_password").blur(function(e){
    hide_tips();
    if($("#user_password").val().length < 8){
        $("#password_valid_tips").html("Your password must be at least 8 characters.");
        $("#password_valid_tips").show();
        $("#user_password").focus();
    }
})

$("#user_password_confirm").keyup(function(){
    hide_tips();
    if($("#user_password_confirm").val() == $("#user_password").val()){
        $("#password_matched_tips_confirm").html("<i class='icon-check2'></i> Passwords matched.");
        $("#password_matched_tips_confirm").show();
        password = $("#user_password_confirm").val();
    }
})

function next(){
    if($("#user_password").val() == ""){
        $("#password_valid_tips").html("A password is required.");
        $("#password_valid_tips").show();
        return;
    }
    if($("#user_password_confirm").val() != $("#user_password").val()){
        $("#password_matched_tips").html("Passwords don’t match.");
        $("#password_matched_tips").show();
        return;
    }
    var signup_model = JSON.parse(localStorage.getItem("signup_model"));
    signup_model.password = password;
    localStorage.setItem("signup_model", JSON.stringify(signup_model));
    window.location.href = "/signup/review.html";
}

function hide_tips(){
    $("#password_valid_tips").css("display", "none");
    $("#password_matched_tips").css("display", "none");
    $("#password_matched_tips_confirm").css("display", "none");
}