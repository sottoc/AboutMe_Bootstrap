var spotlight = {};
var spotlight_link = "";
$(function(){
    $("#header2").load("../layout/header2.html");
    $("#location_required_tips").css("display", "none");
    for(var i=61;i<=70;i++){
        progressBar(i);
    }
    var signup_model = JSON.parse(localStorage.getItem("signup_model"));
    spotlight = signup_model.spotlight;
    spotlight_link = signup_model.spotlight_link;
    $(".link-domain").val(spotlight_link);
    if(!isEmpty(spotlight)){
        var boxes = $(".boxed.scaling");
        for(var i=0;i<boxes.length;i++) {
            if(spotlight[i+1] != undefined){
                $(boxes[i]).addClass("selected");
            }
        };
    }
});

$(".boxed.scaling").click(function(){
    var box_id = $(this).attr('box-id');
    var box_content = $($(this).children()[1]).html();

    var boxes = $(".boxed.scaling");
    for(var i=0;i<boxes.length;i++){
        $(boxes[i]).removeClass("selected");
    };
    $(this).addClass("selected");
    spotlight = {};
    spotlight[box_id] = box_content;
    $("#selected_spotlight").html($(this).html());
    $(".link-title").html("Enter a link to " + $("#selected_spotlight p").html().toLowerCase());
});

$(".link-domain").change(function(){
    $("#valid_link_tips").hide();
})

function next(){
    if(!isEmpty(spotlight)){
        $("#modal_link").trigger('click');
        $(".link-domain").val(spotlight_link);
        $(".link-domain").focus();
        $("#valid_link_tips").hide();
    }
}

function goNext(){
    if($(".link-domain").val() == ""){
        $(".link-domain").focus();
        return;
    } 
    if(validURL($(".link-domain").val())){
        spotlight_link = $(".link-domain").val();
        var signup_model = JSON.parse(localStorage.getItem("signup_model"));
        signup_model.spotlight = spotlight;
        signup_model.spotlight_link = spotlight_link;
        localStorage.setItem("signup_model", JSON.stringify(signup_model));
        window.location.href = "/signup/template.html";
    } else{
        $("#valid_link_tips").show();
        $(".link-domain").focus();
    }
}

// check if obj is empty or not
function isEmpty (obj) {
    if (typeof (obj) === 'string') {
        return false;
    }
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

// check if a string is a URL
function validURL(str) {
var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}