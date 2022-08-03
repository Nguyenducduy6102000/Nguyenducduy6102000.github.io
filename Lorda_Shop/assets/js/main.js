
$(function () {
    $(".slider__content .wrap-list.owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        center: true,
        mouseDrag: true,
        nav: true,
        navText: ["", ""],
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        dots: false,
        smartSpeed: 1000,
        lazyLoad: true,
    });
    $(".daily-best-seller .special-products-layout .special-products__wrapper").owlCarousel({
        items: 1,
        margin: 40,
        loop: false,
        center: true,
        mouseDrag: true,
        nav: true,
        navText: ["", ""],
        autoplay: false,
        dots: false,
        smartSpeed: 1000,
        lazyLoad: true,
    });
    $(".best-seller__wrapper").owlCarousel({
        items: 1,
        margin: 30,
        loop: false,
        center: true,
        nav: true,
        navText: ["", ""],
        autoplay: false,
        dots: false,
    });
    $(".recommend-products").owlCarousel({
        items: 5,
        margin: 30,
        loop: false,
        center: true,
        nav: true,
        navText: ["", ""],
        autoplay: false,
        dots: false,
    });


    const items = $('*.categories-item-link');
    const products = $('*.recommend-product__list');
    $.each(items, function (index, item) {
        const product = products[index];
        $(item).click(function () {
            $('.categories-item-link.active').removeClass('active');
            $('.recommend-product__list.active').removeClass('active');

            $(item).addClass('active');
            $(product).addClass('active')

        });

    });
})




