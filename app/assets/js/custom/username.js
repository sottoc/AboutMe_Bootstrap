var username = "";
$(function(){
    $("#header2").load("../layout/header2.html");
    $("#username_valid_tips").css("display", "none");
    $("#username_invalid_tips").css("display", "none");
    $("#basic-domain").html(domain + '/');
    for(var i=81;i<=90;i++){
        progressBar(i);
    }
    var signup_model = JSON.parse(localStorage.getItem("signup_model"));
    var firstname = signup_model['first_name'];
    var lastname = signup_model['last_name'];
    username = firstname + lastname;
    $("#username").val(username);
    // check if username is valid
    var formdata = new FormData();
    formdata.append("username", username);
    var url = api_endpoint + "/api/username_check";
    jQuery.ajax({
        url: url,
        type: "POST",
        data: formdata,
        processData: false,
        contentType: false,
        success: function (data) {
            data = JSON.parse(data)
            console.log(data);
            if(data['result'] == true){
                $("#username_valid_tips").show();
                $("#username_invalid_tips").css("display", "none");
                signup_model.username = username;
                localStorage.setItem("signup_model", JSON.stringify(signup_model));
            } else{
                $("#username_invalid_tips").show();
                $("#username_valid_tips").css("display", "none");
            }
        }
    });
    
});

function changeUsername(e){
    $("#username_valid_tips").css("display", "none");
    $("#username_invalid_tips").css("display", "none");
    username = $(e).val();
    if(username==""){
        $("#username_invalid_tips").show();
        return;
    }
    console.log(username);
    var formdata = new FormData();
    formdata.append("username", username);
    var url = api_endpoint + "/api/username_check";
    jQuery.ajax({
        url: url,
        type: "POST",
        data: formdata,
        processData: false,
        contentType: false,
        success: function (data) {
            data = JSON.parse(data)
            if(data['result'] == true){
                $("#username_valid_tips").show();
                $("#username_invalid_tips").css("display", "none");
                signup_model.username = username;
                localStorage.setItem("signup_model", JSON.stringify(signup_model));
            } else{
                $("#username_invalid_tips").show();
                $("#username_valid_tips").css("display", "none");
            }
        }
    });
}

function next(){
    if(username != ""){
        window.location.href = "/signup/password.html";
    }
}