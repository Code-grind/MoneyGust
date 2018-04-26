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
    $('.masthead')
        .visibility({
            once: false,
            onBottomPassed: function () {
                $('.fixed.menu').transition('fade in');
            },
            onBottomPassedReverse: function () {
                $('.fixed.menu').transition('fade out');
            }
        }).css('min-height', $(window).height());

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

    new Glide('.glide',{
        type: 'carousel',
        autoplay: 2000,
        hoverpause: true,
        startAt: 0,
        perView: 3,
        gap: 10,
        animationTimingFunc: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
        animationDuration: 800
    }).mount();
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