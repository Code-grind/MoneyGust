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

    $('.ui.labeled.icon.sidebar')
        .sidebar('show')
    ;
});

function AppendList(data) {
    let temp = "";
    $.each(data, function (index, value) {
        temp += `<div class="item" id="${value['_id']}">
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
                            <button onclick="approach(this.id)" class="ui button secondary" id="Approach${index}">Approach</button>
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

function approach(buttonId) {
    let approchButton = $('#'+ buttonId);
    console.log(buttonId.substring(8));
    $.ajax({
        type: 'POST',
        url: '/notification',
        data: {
            recv_id: buttonId.substring(8)
        }
    }).done(function (data) {
    }).fail(function (xhr,status) {
        console.log(status);
    });
}