$(document).ready(function() {
    $('.ui.dropdown')
        .dropdown()
    ;

    $.ajax({
        type: 'GET',
        url: '/success'
    }).done(function (data) {
        console.log(data);
        if(data!==""){
            addDashboard(data);
            addusername(data);
            loggedIn();
        }else{
            loggedOut();
        }
    }).fail(function (xhr,status) {
        console.log(status);
        loggedOut();
    });


    // create sidebar and attach to menu open
    $('.ui.sidebar')
        .sidebar('attach events', '.toc.item');


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
}
let username = $('.username');
function addusername(data) {
    let temp = `Hi ${data['UserID']}<i class="dropdown icon"></i>`;
    username.html(temp);
}
let dashboard = $('.abcde');
function addDashboard(data) {
    let temp = '';
    if(data['Type']==='Investor'){
        temp = `<a class="item" href="InvestorProfile.html">Your Profile</a>
                <a class="item" href="InvestorDashboard.html">Dashboard</a>
                <a class="item">History</a>
                <a class="item">Settings</a>
                <a class="item" href="/logout">Signed Out</a>`
    }
    else {
        temp = `<a class="item" href="StartupProfile.html">Your Profile</a>
                <a class="item" href="/StartupDashboard">Dashboard</a>
                <a class="item">History</a>
                <a class="item">Settings</a>
                <a class="item" href="/logout">Signed Out</a>`
    }
    dashboard.html(temp);
}