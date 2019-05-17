$(function(){
    if(checkUserToken()){
        $("#header").load("layout/header1_in.html");
    } else{
        $("#header").load("layout/header.html");
    }
    $("#custom_footer").load("layout/footer.html");
    var signup_model = {
        first_name: "",
        last_name: "",
        email_address: "",
        image: [],
        location: "",
        interests: [],
        roles: [],
        spotlight: {},
        spotlight_link: "",
        username: "",
        password: ""
        
    }
    localStorage.setItem("signup_model", JSON.stringify(signup_model));
});