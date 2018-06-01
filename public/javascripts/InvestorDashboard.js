let listcont = $('#listContainer');
let RecentCont = $('#RecentContainer');
let EarlierCont = $('#EarlierContainer');
let notifCount = $('#notifCount');
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
    if(RecentCont.length!==0)
        $(GetNotification);
    $(function (){
        $.ajax({
            url: "http://localhost:3000/notification/UnreadMessages",
            type: "GET"
        }).done(function (count) {
            console.log(count);
            notifCount.html(count);
        }).fail(function (xhr,status) {
            console.log(status);
        })
    });
    $('.ui.labeled.icon.sidebar')
        .sidebar('show')
    ;
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
    listcont.html(temp);
}
function AppendNotification(data) {
    let Recent = `<div class="ui segment inverted secondary">
                        <h5>Recent</h5>
                    </div>`;
    let Earlier = `<div class="ui segment inverted secondary">
                        <h5>Earlier</h5>
                    </div>`;
    $.each(data, function (index, value) {
        if(value.Earlier===false) {
            if (value.UnRead === false) {
                Recent += `<div class="ui segment">
                    <div class="ui feed item">
                        <div class="event">
                            <div class="label"><img src="https://semantic-ui.com/images/avatar/small/elliot.jpg"></div>
                            <div class="content">
                                <div class="summary">
                                    <a class="user">${value.Sender}</a>
                                    <div class="date">${value.Duration}</div>
                                    <div class="date">
                                        <div class="ui dropdown">
                                            <div class="text">
                                                <i class="ellipsis horizontal icon"></i>
                                            </div>
                                            <div class="menu">
                                                <a class="item" id="Del${value._id}" onclick="notification_delete(this.id)">Delete</a>
                                                <a class="item">Unfollow</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="extra text">
                                   ${value.Messages}
                                </div>
                            </div>
                        </div>
                     </div>
                </div>`;
            }
            else {
                Recent += `<div class="ui segment tertiary">
                    <div class="ui feed item">
                        <div class="event">
                            <div class="label"><img src="https://semantic-ui.com/images/avatar/small/elliot.jpg"></div>
                            <div class="content">
                                <div class="summary">
                                    <a class="user">${value.Sender}</a>
                                    <div class="date">${value.Duration}</div>
                                    <div class="date">
                                        <div class="ui dropdown">
                                            <div class="text">
                                                <i class="ellipsis horizontal icon"></i>
                                            </div>
                                            <div class="menu">
                                                <a class="item" id="Del${value._id}" onclick="notification_delete(this.id)">Delete</a>
                                                <a class="item">Unfollow</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="extra text">
                                   ${value.Messages}
                                </div>
                            </div>
                        </div>
                     </div>
                </div>`
            }
        }
        else
        {
            if (value.UnRead === false) {
                Earlier += `<div class="ui segment">
                    <div class="ui feed item">
                        <div class="event">
                            <div class="label"><img src="https://semantic-ui.com/images/avatar/small/elliot.jpg"></div>
                            <div class="content">
                                <div class="summary">
                                    <a class="user">${value.Sender}</a>
                                    <div class="date">${value.Duration}</div>
                                    <div class="date">
                                        <div class="ui dropdown">
                                            <div class="text">
                                                <i class="ellipsis horizontal icon"></i>
                                            </div>
                                            <div class="menu">
                                                <a class="item" id="Del${value._id}" onclick="notification_delete(this.id)">Delete</a>
                                                <a class="item">Unfollow</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="extra text">
                                   ${value.Messages}
                                </div>
                            </div>
                        </div>
                     </div>
                </div>`;
            }
            else {
                Earlier += `<div class="ui segment tertiary">
                    <div class="ui feed item">
                        <div class="event">
                            <div class="label"><img src="https://semantic-ui.com/images/avatar/small/elliot.jpg"></div>
                            <div class="content">
                                <div class="summary">
                                    <a class="user">${value.Sender}</a>
                                    <div class="date">${value.Duration}</div>
                                    <div class="date">
                                        <div class="ui dropdown">
                                            <div class="text">
                                                <i class="ellipsis horizontal icon"></i>
                                            </div>
                                            <div class="menu">
                                                <a class="item" id="Del${value._id}" onclick="notification_delete(this.id)">Delete</a>
                                                <a class="item">Unfollow</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="extra text">
                                   ${value.Messages}
                                </div>
                            </div>
                        </div>
                     </div>
                </div>`
            }
        }
    });
    RecentCont.html(Recent);
    EarlierCont.html(Earlier);
    $('.ui.dropdown').dropdown();
}
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
    console.log(buttonId.substring(8));
    $.ajax({
        type: 'POST',
        url: '/notification/startup',
        data: {
            recv_id: buttonId.substring(8)
        }
    }).done(function (data) {
    }).fail(function (xhr,status) {
        console.log(status);
    });
}

let menu = {};
// ready event
menu.ready = function() {
    // selector cache
    let $dropdownItem = $('.menu .dropdown .item'),
        $menuItem     = $('.menu a.item, .menu .link.item').not($dropdownItem),
        // alias
        handler = {
            activate: function() {
                if(!$(this).hasClass('dropdown browse')) {
                    $(this)
                        .addClass('active')
                        .closest('.ui.menu')
                        .find('.item')
                        .not($(this))
                        .removeClass('active')
                    ;
                }
            }

        };
    $menuItem.on('click', handler.activate);
};
// attach ready event
$(document).ready(menu.ready);

function GetNotification() {
    $.ajax({
        url: "http://localhost:3000/InvestorDashboard/GetNotification",
        type: "GET"
    }).done(function (notifications) {
        console.log(notifications);
        AppendNotification(notifications);
    }).fail(function (xhr,status) {
        console.log(status);
    })
}
function notification_delete(buttonId) {
    console.log(buttonId.substring(3));
    $.ajax({
        type: 'DELETE',
        url: `/notification/${buttonId.substring(3)}`,
    }).done(function (data) {
        console.log(data);
        GetNotification();
    }).fail(function (xhr,status) {
        console.log(status);
    });
}