$(function () {
    $.ajax({
        url:"http://localhost:3000/success",
        type:"GET",
    }).done(function(json){
        console.log(json);
    }).fail(function(xhr, status){
        console.log(status);
    });
});