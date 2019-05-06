var roles = ["Student", "Web Developer", "Software Engineer", "Project Manager", "Consultant", "Designer", "Art Director", "Artist", "Architect", "Teacher", "Writer", "Editor", "Director", "Mother", "Father", "Musician", "Dancer", "Photographer", "Chef", "Barista", "Doctor", "Nurse", "Realtor"];
var selected_roles = [];
$(function(){
    $("#header2").load("../layout/header2.html");
    for(var i=51;i<=60;i++){
        progressBar(i);
    }
    var signup_model = JSON.parse(localStorage.getItem("signup_model"));
    
    var html = "";
    for(var i=0; i < roles.length; i++){
        var button = '<button type="button" class="btn btn-sm btn-info mb-1 roles" onclick="clickRole(this)">' + roles[i] + '</button>\n';
        html += button;
    }
    $(".roles-buttons").html(html);

    selected_roles = signup_model.roles;
    setRoles();
});

function setRoles(){
    $(".roles-buttons-selected").empty();
    for(var i=0; i<selected_roles.length; i++){
        var role = selected_roles[i];
        var button = $('<button/>').attr({ type: 'button', value: role, class:'btn btn-sm btn-info mr-1 mb-1 selected-roles', onclick: 'removeRole(this)' });
        button.html(role + '  <i class="icon-close"></i></button>');
        $(".roles-buttons-selected").append(button);
    }
    var roles = $(".btn.roles");
    for(var i=0;i<roles.length;i++){
        var role = $(roles[i]).html();
        if(checkValue(role, selected_roles)){
            $(roles[i]).addClass("selected");
        } else{
            $(roles[i]).removeClass("selected");
        }
    }
}

function clickRole(e){
    if($(e).attr('class').indexOf('selected') == -1 && selected_roles.length >= 3){
        return;
    }
    var role = $(e).html();
    if(checkValue(role, selected_roles)){
        selected_roles = jQuery.grep(selected_roles, function(value) {
            return value != role;
        });
    } else{
        selected_roles.push(role);
    }
    setRoles();
}

function removeRole(e){
    var role = $(e).val();
    selected_roles = jQuery.grep(selected_roles, function(value) {
        return value != role;
    });
    setRoles();
}

function next(){
   if(selected_roles.length < 1){
       return;
   }
   var signup_model = JSON.parse(localStorage.getItem("signup_model"));
   signup_model.roles = selected_roles;
   localStorage.setItem("signup_model", JSON.stringify(signup_model));
   window.location.href = "/signup/roles.html";
}