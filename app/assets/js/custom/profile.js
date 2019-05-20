var currentUser = {};
var token = JSON.parse(localStorage.getItem("token"));
var username = "";
$(function(){
    $("#header3").load("../layout/header3.html");
    //$("#custom_menu").load("../layout/menu.html");
    if(token == undefined) {
        window.location.href = "/login.html";
    }
    headerParams = {'Authorization':'Bearer ' + token["access_token"]};
    var url = api_endpoint + "/api/user";
    jQuery.ajax({
        url: url,
        type: "GET",
        headers: headerParams,
        processData: false,
        contentType: false,
        success: function (data) {
            currentUser["user"] = data;
            username = data['username'];
            getUserProfile(data['username']);
            getUserExtraInfo(data['username']);
        }
    });
    localStorage.setItem("custom_menu_status", "hide");

    // change avatar
    $("#avatar_temp").click(function(){
        $('input[type="file"]').trigger('click');
    });
    $('input[type="file"]').change(function(e){
        var file = e.target.files[0];
        formdata = new FormData();
        formdata.append("file_type", file.type);
        if(file.type.indexOf("png") == -1 && file.type.indexOf("jpeg") == -1 && file.type.indexOf("jpg") == -1){
            console.log(file.type);
            return;
        }
        var username = JSON.parse(localStorage.getItem("currentUser"))["profile"]["username"];
        formdata.append("username", username);
        formdata.append("file_name", file.name);
        getBase64(file).then(function(file){
            formdata.append("file", file);
            var url = api_endpoint + "/api/upload_update";
            jQuery.ajax({
                url: url,
                type: "POST",
                data: formdata,
                processData: false,
                contentType: false,
                success: function (result) {
                    console.log(result);
                    var filepath = api_endpoint + result;
                    $("#avatar_temp").attr('src', filepath);
                    $("#user_avatar").attr('src', filepath);
                    // save image url
                    var signup_model = JSON.parse(localStorage.getItem("signup_model"));
                    signup_model['image'][0] = result;
                    localStorage.setItem("signup_model", JSON.stringify(signup_model));
                }
            });
        });
    });

    $('#checkbox').change(function(){
        if(this.checked) {
            $("#edit_design figure").addClass("user-circle");
        } else {
            $("#edit_design figure").removeClass("user-circle");
        }
    })

});

function getUserProfile(username) {
    var formdata = new FormData();
    formdata.append("username", username);
    var url = api_endpoint + "/api/profile";
    headerParams = {'Authorization':'Bearer ' + token["access_token"]};
    jQuery.ajax({
        url: url,
        type: "POST",
        headers: headerParams,
        data: formdata,
        processData: false,
        contentType: false,
        success: function (data) {
            data = JSON.parse(data);
            currentUser["profile"] = data[0];
            storeCurrentUser(currentUser);
            setUserProfile();
        }
    });
}

function getUserExtraInfo(username){
    var formdata = new FormData();
    formdata.append("username", username);
    var url = api_endpoint + "/api/extrainfo";
    headerParams = {'Authorization':'Bearer ' + token["access_token"]};
    jQuery.ajax({
        url: url,
        type: "POST",
        headers: headerParams,
        data: formdata,
        processData: false,
        contentType: false,
        success: function (data) {
            data = JSON.parse(data);
            localStorage.setItem('extrainfo', JSON.stringify(data));
            for(var i=0;i<data.length;i++){
                if(data[i].key == "color"){
                    $("#default").css('background', '#'+data[i].value);
                } 
            }
        }
    });
}

function setUserProfile(){
    var profile = JSON.parse(localStorage.getItem("currentUser"))['profile'];
    if(profile['template'] == "1") {
        $("figure").removeClass("user-circle");
    } else {
        $("figure").addClass("user-circle");
    }
    $("#user_avatar").attr('src', api_endpoint + profile['avatar']);
    $("#avatar_temp").attr('src', api_endpoint + profile['avatar']); // set in modal
    $("#user_name").html(profile['first_name'] + " " + profile['last_name']);
    var roles = profile['roles'].split(",");
    $("#user_title").html(roles[0] + " in " + profile['location']);
    var spotlight = JSON.parse(profile['spotlight']);
    var spotlight_str = "";
    Object.keys(spotlight).forEach(function(k){
        spotlight_str = spotlight[k].trim().toLowerCase();
        $("#user_visit_button").html("Visit to " + spotlight_str);
    });
    $("#user_visit_button").attr('href', "http://"+profile['spotlight_link']);
    var interests = profile['interests'].split(',');
    var interests_str = "";
    for(var i=0;i<interests.length;i++){
        if(i != interests.length-1){
            interests_str += interests[i].toLowerCase() + ", ";
        } else{
            interests_str += " and " + interests[i].toLowerCase();
        }
    }
    var user_description = "What’s up, I’m " + profile['first_name'] + 
     ". I’m a fitness instructor living in " + profile['location'] + 
     ". I am a fan of " + interests_str + 
     ". I’m also interested in outdoors. You can " + spotlight_str + 
     " with a click on the button above."
    $("#user_description").html(user_description);
    $("#textarea_description").html(user_description); // set in modal
}

function menuToggle(){
    if(localStorage.getItem("custom_menu_status") == "hide"){
        $("#custom_menu").animate({ "left": "-=320px" });
        localStorage.setItem("custom_menu_status", "display");
        return;
    }
    if(localStorage.getItem("custom_menu_status") == "display"){
        $("#custom_menu").animate({ "left": "+=320px" });
        localStorage.setItem("custom_menu_status", "hide");
        return;
    }
}

function saveDescription(){
    var formdata = new FormData();
    var username = JSON.parse(localStorage.getItem("currentUser"))["profile"]["username"];
    var description = $("#textarea_description").val();
    formdata.append("username", username);
    formdata.append("description", description);
    var url = api_endpoint + "/api/edit_description";
    headerParams = {'Authorization':'Bearer ' + token["access_token"]};
    jQuery.ajax({
        url: url,
        type: "POST",
        headers: headerParams,
        data: formdata,
        processData: false,
        contentType: false,
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
        }
    });
}

function changePhoto() {
    $('input[type="file"]').trigger('click');
}

function openDesignModal() {
    var profile = JSON.parse(localStorage.getItem("currentUser"))['profile'];
    $("#edit_design figure img").attr('src', api_endpoint + profile['avatar']);
    if(profile.template == "2") {
        $('input[type="checkbox"]').prop('checked', true);
        $("#edit_design figure").addClass("user-circle");
    } else if(profile.template == "1") {
        $('input[type="checkbox"]').prop('checked', false);
        $("#edit_design figure").removeClass("user-circle");
    }
    var extrainfo = JSON.parse(localStorage.getItem('extrainfo'));
    for(var i=0;i<extrainfo.length;i++){
        if(extrainfo[i].key == "color"){
            var value = extrainfo[i].value;
            $('.jscolor').val(value);
            $('.jscolor').css('background-color', "#"+value);
            $(".template-design").css('background', "#"+value);
        }
    }
    
}

function changeColor(e){
    $(".template-design").css('background', '#'+$(e).val());
}

function saveDesign(){
    var formdata = new FormData();
    formdata.append("username", username);
    var template = "1";
    if($('input[type="checkbox"]').prop('checked') == true) {
        template = "2"
    }
    formdata.append("template", template);
    formdata.append("color", $(".jscolor").val());
    var url = api_endpoint + "/api/update_design";
    headerParams = {'Authorization':'Bearer ' + token["access_token"]};
    jQuery.ajax({
        url: url,
        type: "POST",
        headers: headerParams,
        data: formdata,
        processData: false,
        contentType: false,
        success: function (data) {
            data = JSON.parse(data);
            $("#default").css('background', '#'+$('.jscolor').val());
            if(template == "1") {
                $("figure").removeClass("user-circle");
            } else {
                $("figure").addClass("user-circle");
            }
            $('#edit_design').modal('toggle');
        }
    });
}