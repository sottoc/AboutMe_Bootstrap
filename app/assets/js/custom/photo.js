$(function(){
    $("#header2").load("../layout/header2.html");
    $(".upload-input").css("display", "none");

    $("#img_avatar").click(function(){
        $(".upload-input").trigger('click');
    });

    $(".upload-input").click(function(){
        
    });

    for(var i=21;i<=30;i++){
        progressBar(i);
    }

});

