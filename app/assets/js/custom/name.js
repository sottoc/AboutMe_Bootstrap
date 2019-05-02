$(function(){
    $("#header2").load("../layout/header2.html");
    $("#firstname_required_tips").css("display", "none");
    $("#secondname_required_tips").css("display", "none");
    for(var i=11;i<=20;i++){
        progressBar(i);
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
    var secondname = $($('input[type="text"]')[1]).val();
    if(secondname == ""){
        $("#secondname_required_tips").show();
        $($('input[type="text"]')[1]).focus();
        return;
    }
    window.location.replace("/signup/photo.html");
}