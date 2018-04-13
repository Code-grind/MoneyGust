$(document)
    .ready(function() {

        // fix menu when passed
        $('.masthead')
            .visibility({
                once: false,
                onBottomPassed: function() {
                    $('.fixed.menu').transition('fade in');
                },
                onBottomPassedReverse: function() {
                    $('.fixed.menu').transition('fade out');
                }
            });

        // create sidebar and attach to menu open
        $('.ui.sidebar')
            .sidebar('attach events', '.toc.item');

    });

$('.ui.dropdown')
    .dropdown()
;

$('.masthead').css('min-height',$(window).height());

new Glide('.glide', {
    type: 'carousel',
    autoplay: 2000,
    hoverpause: false,
    startAt: 0,
    perView: 2,
    gap: 10,
    animationTimingFunc: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
    animationDuration: 800
}).mount();

