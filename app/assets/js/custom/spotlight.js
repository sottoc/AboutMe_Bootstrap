$(function(){
    $("#header2").load("../layout/header2.html");
    $("#location_required_tips").css("display", "none");
    for(var i=61;i<=70;i++){
        progressBar(i);
    }
    var signup_model = JSON.parse(localStorage.getItem("signup_model"));
    
});

$(".boxed.scaling").click(function(){
    var box_id = $(this).attr('box-id');
    var box_content = $($(this).children()[1]).html();

    var boxes = $(".boxed.scaling");
    for(var i=0;i<boxes.length;i++){
        $(boxes[i]).removeClass("selected");
    };
    $(this).addClass("selected");
});