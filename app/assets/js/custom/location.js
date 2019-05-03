$(function(){
    $("#header2").load("../layout/header2.html");
    $("#location_required_tips").css("display", "none");
    for(var i=31;i<=40;i++){
        progressBar(i);
    }
    var signup_model = JSON.parse(localStorage.getItem("signup_model"));
    $('input[type="text"]').val(signup_model["location"]);
});

function changeLocation(){
    $("#location_required_tips").css("display", "none");
}

function next(){
    var location = $('input[type="text"]').val();
    if(location == "") {
        $("#location_required_tips").show();
        $('input[type="text"]').focus();
        return;
    }
    var signup_model = JSON.parse(localStorage.getItem("signup_model"));
    signup_model['location'] = location;
    localStorage.setItem("signup_model", JSON.stringify(signup_model));
    window.location.href = "/signup/interests.html";
}