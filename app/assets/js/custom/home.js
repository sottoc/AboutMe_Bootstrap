$(function(){
    $("#custom_footer").load("layout/footer.html");
    var signup_model = {
        username: "",
        first_name: "",
        last_name: "",
        email_address: "",
        image: [],
        location: ""
    }
    localStorage.setItem("signup_model", JSON.stringify(signup_model));
});