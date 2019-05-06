var interests = ["Photography", "Technology", "Design", "Music", "Travel", "Arts", "Reading", "Food", "Movies", "Cycling", "Writing", "Running", "Fitness", "Coffee", "Politics", "Acting", "Dancing"];
var selected_interests = [];
$(function(){
    $("#header2").load("../layout/header2.html");
    for(var i=41;i<=50;i++){
        progressBar(i);
    }
    var signup_model = JSON.parse(localStorage.getItem("signup_model"));
    
    var html = "";
    for(var i=0; i < interests.length; i++){
        var button = '<button type="button" class="btn btn-sm btn-info mb-1 interests" onclick="clickInterest(this)">' + interests[i] + '</button>\n';
        html += button;
    }
    $(".interests-buttons").html(html);
    selected_interests = signup_model.interests;
    setInterests();
});

function setInterests(){
    $(".interests-buttons-selected").empty();
    for(var i=0; i<selected_interests.length; i++){
        var interest = selected_interests[i];
        var button = $('<button/>').attr({ type: 'button', value: interest, class:'btn btn-sm btn-info mr-1 mb-1 selected-interests', onclick: 'removeInterest(this)' });
        button.html(interest + '  <i class="icon-close"></i></button>');
        $(".interests-buttons-selected").append(button);
    }
    var interests = $(".btn.interests");
    for(var i=0;i<interests.length;i++){
        var interest = $(interests[i]).html();
        if(checkValue(interest, selected_interests)){
            $(interests[i]).addClass("selected");
        } else{
            $(interests[i]).removeClass("selected");
        }
    }
}

function clickInterest(e){
    if($(e).attr('class').indexOf('selected') == -1 && selected_interests.length >= 5){
        return;
    }
    var interest = $(e).html();
    if(checkValue(interest, selected_interests)){
        selected_interests = jQuery.grep(selected_interests, function(value) {
            return value != interest;
        });
    } else{
        selected_interests.push(interest);
    }
    setInterests();
}

function removeInterest(e){
    var interest = $(e).val();
    selected_interests = jQuery.grep(selected_interests, function(value) {
        return value != interest;
    });
    setInterests();
}

function next(){
   if(selected_interests.length < 3){
       return;
   }
   var signup_model = JSON.parse(localStorage.getItem("signup_model"));
   signup_model.interests = selected_interests;
   localStorage.setItem("signup_model", JSON.stringify(signup_model));
   window.location.href = "/signup/roles.html";
}