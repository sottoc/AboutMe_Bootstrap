var temp = [];
$(function(){
    $("#header2").load("../layout/header2.html");
    for(var i=71;i<=80;i++){
        progressBar(i);
    }
    var signup_model = JSON.parse(localStorage.getItem("signup_model"));
    $(".user-avatar").attr('src', api_endpoint + signup_model['image'][0]);
});

$(".template-design").click(function(){
    var temp_id = $(this).attr('template-id');
    var templates = $(".template-design");
    for(var i=0;i<templates.length;i++){
        $(templates[i]).css('transform', 'scale(0.6)');
    }
    $(this).css('transform', 'scale(0.9)');
    temp[0] = temp_id;
    console.log(temp);
});

function next(){
    if(!temp == []){
        var signup_model = JSON.parse(localStorage.getItem("signup_model"));
        signup_model['template'] = temp;
        localStorage.setItem("signup_model", JSON.stringify(signup_model));
        window.location.href = "/signup/username.html";
    }
}