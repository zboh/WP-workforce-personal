(function ($) {
  "use strict";

  $(function () {
    $("#tabs").tabs();
  });

  // Function to handle logo change on scroll
  function changeLogoOnScroll() {
    var scroll = $(window).scrollTop();
    var box = $(".header-text").height();
    var header = $("header").height();
    var logo = $(".logo-holder .img-logo"); // Reference to the logo element

    if (scroll >= box - header) {
      $("header").addClass("background-header");
      logo.attr("src", "/assets/images/wp_logo_black.png"); // Change logo to black version when scrolled past header
    } else {
      $("header").removeClass("background-header");

      // Change logo based on window width
      if ($(window).width() > 767) {
        logo.attr("src", "/assets/images/wp_logo_white.png"); // Revert logo to white version when not scrolled and window width > 767px
      } else {
        logo.attr("src", "/assets/images/wp_logo_black.png"); // Keep logo black when window width <= 767px
      }
    }
  }

  // Function to handle logo change on resize
  function changeLogoOnResize() {
    var logo = $(".logo-holder .img-logo");
    // Change logo based on window width
    if ($(window).width() <= 767) {
      logo.attr("src", "/assets/images/wp_logo_black.png"); // Change logo to black version if window width <= 767px
    } else {
      logo.attr("src", "/assets/images/wp_logo_white.png"); // Change logo to white version if window width > 767px
    }
  }

  // Scroll event listener
  $(window).scroll(changeLogoOnScroll);

  // Resize event listener
  $(window).resize(function () {
    changeLogoOnResize();
    changeLogoOnScroll(); // Ensure scroll logic is reapplied after resize
  });

  $(".schedule-filter li").on("click", function () {
    var tsfilter = $(this).data("tsfilter");
    $(".schedule-filter li").removeClass("active");
    $(this).addClass("active");
    if (tsfilter == "all") {
      $(".schedule-table").removeClass("filtering");
      $(".ts-item").removeClass("show");
    } else {
      $(".schedule-table").addClass("filtering");
    }
    $(".ts-item").each(function () {
      $(this).removeClass("show");
      if ($(this).data("tsmeta") == tsfilter) {
        $(this).addClass("show");
      }
    });
  });

  // Window Resize Mobile Menu Fix
  mobileNav();

  // Scroll animation init
  window.sr = new scrollReveal();

  // Menu Dropdown Toggle
  if ($(".menu-trigger").length) {
    $(".menu-trigger").on("click", function () {
      $(this).toggleClass("active");
      $(".header-area .nav").slideToggle(200);
    });
  }

  $(document).ready(function () {
    $(document).on("scroll", onScroll);

    // Smooth scroll
    $('.scroll-to-section a[href^="#"]').on("click", function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $("a").each(function () {
        $(this).removeClass("active");
      });
      $(this).addClass("active");

      var target = this.hash,
        menu = target;
      var target = $(this.hash);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top + 1,
          },
          500,
          "swing",
          function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
          }
        );
    });
  });

  function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $(".nav a").each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (
        refElement.position().top <= scrollPos &&
        refElement.position().top + refElement.height() > scrollPos
      ) {
        $(".nav ul li a").removeClass("active");
        currLink.addClass("active");
      } else {
        currLink.removeClass("active");
      }
    });
  }

  // Page loading animation
  $(window).on("load", function () {
    $("#js-preloader").addClass("loaded");
    changeLogoOnResize(); // Ensure logo is correct on initial load
  });

  // Window Resize Mobile Menu Fix
  $(window).on("resize", function () {
    mobileNav();
  });

  // Window Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width();
    $(".submenu").on("click", function () {
      if (width < 767) {
        $(".submenu ul").removeClass("active");
        $(this).find("ul").toggleClass("active");
      }
    });
  }
})(window.jQuery);