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

let menu = {};

// ready event
menu.ready = function() {

    // selector cache
    let
        $dropdownItem = $('.menu .dropdown .item'),
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