
// extend a Siema class by two methods
// addDots - to create a markup for dots
// updateDots - to update classes on dots on change callback
class SiemaWithDots extends Siema {
    constructor(interval_time) {
        super(...arguments);
        console.log(arguments[0])
        this.interval = setInterval(() => super.next(), arguments[0]['interval_time']);
    }

    addDots() {
        // create a contnier for all dots
        // add a class 'dots' for styling reason
        this.dots = document.createElement('div');
        this.dots.classList.add('dots');

        // loop through slides to create a number of dots
        for (let i = 0; i < this.innerElements.length; i++) {
            // create a dot
            const dot = document.createElement('button');

            // add a class to dot
            dot.classList.add('dots__item');

            // add an event handler to each of them
            dot.addEventListener('click', () => {
                this.goTo(i);
                this.clearInterval();
            })

            // append dot to a container for all of them
            this.dots.appendChild(dot);
        }

        // add the container full of dots after selector
        this.selector.parentNode.insertBefore(this.dots, this.selector.nextSibling);
    }

    updateDots() {
        // loop through all dots
        for (let i = 0; i < this.dots.querySelectorAll('button').length; i++) {
            // if current dot matches currentSlide prop, add a class to it, remove otherwise
            const addOrRemove = this.currentSlide === i ? 'add' : 'remove';
            this.dots.querySelectorAll('button')[i].classList[addOrRemove]('dots__item--active');
        }
    }

    clearInterval() {
        clearInterval(this.interval);
        this.interval = setInterval(() => super.next(), 5000);
    }
}



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





    // instantiate new extended Siema
    const mySiema = new SiemaWithDots({
        interval_time: 5000,
        loop: true,
        draggable: false,
        // on init trigger method created above
        onInit: function () {
            this.addDots();
            this.updateDots();
        },

        // on change trigger method created above
        onChange: function () {
            this.updateDots()
        },
    });

    // let siemaInterval = setInterval(() => mySiema.next(), 5000);

    // document.querySelector(".dots__item").addEventListener("mouseup", () => {
    //     console.log("click")
    //     clearInterval(siemaInterval)
    //     siemaInterval = setInterval(() => mySiema.next(), 5000);
    // });

})();
