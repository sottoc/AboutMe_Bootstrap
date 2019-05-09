$(function(){
    $("#header2").load("../layout/header2.html");
    $("#firstname_required_tips").css("display", "none");
    $("#secondname_required_tips").css("display", "none");
    for(var i=11;i<=20;i++){
        progressBar(i);
    }
    var signup_model = JSON.parse(localStorage.getItem("signup_model"));
    $($('input[type="text"]')[0]).val(signup_model["first_name"]);
    $($('input[type="text"]')[1]).val(signup_model["last_name"]);
    if($($('input[type="text"]')[0]).val() == ""){
        $($('input[type="text"]')[0]).focus();
    }
});

function changeFirstName(){
    $("#firstname_required_tips").css("display", "none");
}

function changeLastName(){
    $("#secondname_required_tips").css("display", "none");
}

function next(){
    var firstname = $($('input[type="text"]')[0]).val();
    if(firstname == ""){
        $("#firstname_required_tips").show();
        $($('input[type="text"]')[0]).focus();
        return;
    }
    var lastname = $($('input[type="text"]')[1]).val();
    if(lastname == ""){
        $("#secondname_required_tips").show();
        $($('input[type="text"]')[1]).focus();
        return;
    }
    var signup_model = JSON.parse(localStorage.getItem("signup_model"));
    signup_model['first_name'] = firstname;
    signup_model['last_name'] = lastname;
    localStorage.setItem("signup_model", JSON.stringify(signup_model));
    window.location.href = "/signup/photo.html";
}