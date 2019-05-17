$(function(){
    if(checkUserToken()){
        window.location.href = "../profile";
        return;
    }
    $("#header2").load("../layout/header2.html");
    $(".upload-input").css("display", "none");
    for(var i=21;i<=30;i++){
        progressBar(i);
    }

    var signup_model = JSON.parse(localStorage.getItem("signup_model"));
    if(signup_model["image"][0] != undefined){
        $('#img_avatar').attr('src', api_endpoint + signup_model["image"][0]);
        $('input[type="button"]').val("Next");
    }

    $("#img_avatar").click(function(){
        $('input[type="file"]').trigger('click');
    });

    $('input[type="file"]').change(function(e){
        var file = e.target.files[0];
        formdata = new FormData();
        formdata.append("file_type", file.type);
        formdata.append("file_name", file.name);
        getBase64(file).then(function(file){
            formdata.append("file", file);
            var url = api_endpoint + "/api/upload";
            jQuery.ajax({
                url: url,
                type: "POST",
                data: formdata,
                processData: false,
                contentType: false,
                success: function (result) {
                    console.log(result);
                    var filepath = api_endpoint + result;
                    $("#img_avatar").attr('src', filepath);
                    $('input[type="button"]').val("Next");
                    // save image url
                    var signup_model = JSON.parse(localStorage.getItem("signup_model"));
                    signup_model['image'][0] = result;
                    localStorage.setItem("signup_model", JSON.stringify(signup_model));
                }
            });
        });
        
    });
});

function next(){
    var img_url = $("#img_avatar").attr('src');
    if(img_url.indexOf(api_endpoint) == -1){
        $('input[type="file"]').trigger('click');
    } else{
        window.location.href = "/signup/location.html";
    }
}

const getBase64 = async function(file){
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function() {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}