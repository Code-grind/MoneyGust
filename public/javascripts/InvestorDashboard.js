let listcoin = $('#listContainer');
$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: '/success'
    }).done(function (data) {
        console.log(data);
        if(data!==""){
            addusername(data);
            loggedIn();
        }else{
            loggedOut();
        }
    }).fail(function (xhr,status) {
        console.log(status);
        loggedOut();
    });
    $(function () {
        $.ajax({
            url: "http://localhost:3000/startupList",
            type: "GET",
        }).done(function (json) {
            console.log(json);
            AppendList(json);
        }).fail(function (xhr, status) {
            console.log(status);
        });
    });
});

function AppendList(data) {
    let temp = "";
    $.each(data, function (index, value) {
        temp += `<div class="item">
                    <div class="image">
                        <img src="https://semantic-ui.com/images/avatar2/large/kristy.png">
                    </div>
                    <div class="content">
                        <a class="header">${value['CompanyName']}</a>
                        <div class="meta">
                            <span class="cinema">${value['Email']}</span>
                        </div>
                        <div class="description">
                            <p>${value['AboutCompany']}</p>
                        </div>
                        <div class="extra">
                            
                        </div>
                    </div>
                </div>`;
    });
    //$("body").html("");
    listcoin.html(temp);
}
$(document).ready(function() {

    $('.masthead')
        .visibility({
            once: false,
            onBottomPassed: function () {
                $('.fixed.menu').transition('fade in');
            },
            onBottomPassedReverse: function () {
                $('.fixed.menu').transition('fade out');
            }
        });

    // create sidebar and attach to menu open
    $('.ui.sidebar')
        .sidebar('attach events', '.toc.item');

    $('.ui.dropdown')
        .dropdown()
    ;
    $('.ui.dimmer')
        .dimmer({
            on: 'hover'
        })
    ;
    $('.mini.modal')
        .modal('attach events','.popuplogin','show');


});

function loggedIn() {
    $('.logout').hide();
    $('.login').show();
}
function loggedOut() {
    $('.logout').show();
    $('.login').hide();
}
let username = $('#username');
function addusername(data) {
    let temp = `Hi ${data['UserID']}<i class="dropdown icon"></i>`;
    username.html(temp);
}