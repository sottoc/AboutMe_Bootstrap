$(function(){
    $("#custom_footer").load("layout/footer.html");
    if(checkUserToken()){
        $("#header1").load("layout/header1_in.html");
    } else{
        $("#header1").load("layout/header1.html");
    }
});