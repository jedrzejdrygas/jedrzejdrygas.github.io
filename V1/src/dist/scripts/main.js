
(function () {
    /*=====================================
    Sticky
    ======================================= */
    var header_navbar = document.querySelector(".navbar-area");
    var sticky = header_navbar.offsetTop;
    if (window.pageYOffset > sticky) {
        header_navbar.classList.add("sticky");
    }

    window.onscroll = function () {
        var header_navbar = document.querySelector(".navbar-area");
        var sticky = header_navbar.offsetTop;
        if (window.pageYOffset > sticky) {
            header_navbar.classList.add("sticky");
        } else {
            header_navbar.classList.remove("sticky");
        }
        var backToTo = document.querySelector(".scroll-top");
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTo.style.display = "flex";
        } else {
            backToTo.style.display = "none";
        }
    };

    // WOW active
    new WOW().init();

    //===== mobile-menu-btn
    let navbarToggler = document.querySelector(".mobile-menu-btn");
    navbarToggler.addEventListener('click', function () {
        navbarToggler.classList.toggle("active");
    });

    //offset description id top by navbar height
    var navbarHeight = document.querySelector(".navbar-area").offsetHeight;
    var description = document.querySelector("#description");
    var sectionPaddingTop = parseInt(window.getComputedStyle(document.querySelector(".section")).getPropertyValue('padding-top'));

    description.style.top = (-navbarHeight - sectionPaddingTop) + "px";


})();