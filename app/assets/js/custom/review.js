$(function(){
    if(checkUserToken()){
        window.location.href = "../profile";
        return;
    }
    $("#header2").load("../layout/header2.html");
    for(var i=96;i<=100;i++){
        progressBar(i);
    }
   
});

function next(){
    var formdata = new FormData();
    var signup_model = JSON.parse(localStorage.getItem("signup_model"));
    formdata.append("email_address", signup_model.email_address);
    formdata.append("first_name", signup_model.first_name);
    formdata.append("last_name", signup_model.last_name);
    formdata.append("image", signup_model.image[0]);
    formdata.append("location", signup_model.location);
    formdata.append("interests", signup_model.interests.join());
    formdata.append("roles", signup_model.roles.join());
    formdata.append("spotlight", JSON.stringify(signup_model.spotlight));
    formdata.append("spotlight_link", signup_model.spotlight_link);
    formdata.append("template", signup_model.template[0]);
    formdata.append("username", signup_model.username);
    formdata.append("password", signup_model.password);
    var url = api_endpoint + "/api/signup";
    jQuery.ajax({
        url: url,
        type: "POST",
        data: formdata,
        processData: false,
        contentType: false,
        success: function (data) {
            data = JSON.parse(data)
            login(signup_model.email_address, signup_model.password);
        }
    });
}

