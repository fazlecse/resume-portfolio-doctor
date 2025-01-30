"use strict";
// Preloader area
const preloader = document.getElementById("preloader");
const preloaderFunction = () => {
  preloader.style.display = "none";
};
// toggleSideMenu start
const toggleSideMenu = () => {
  document.body.classList.toggle("toggle-sidebar");
};
// toggleSideMenu end
// Tooltip
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// cmn select2 start
$(document).ready(function () {
  $(".cmn-select2").select2();
});
// cmn select2 end

// cmn-select2-modal
$(".modal-select").select2({
  dropdownParent: $("#formModal"),
});

// cmn-select2 with image start
$(document).ready(function () {
  $(".cmn-select2-image").select2({
    templateResult: formatState,
    templateSelection: formatState,
  });
});

// select2 function
function formatState(state) {
  if (!state.id) {
    return state.text;
  }
  var baseUrl = "assets/img/mini-flag";
  var $state = $(
    '<span><img src="' +
      baseUrl +
      "/" +
      state.element.value.toLowerCase() +
      '.svg" class="img-flag" /> ' +
      state.text +
      "</span>"
  );
  return $state;
}
// cmn-select2 with image start

$(document).ready(function () {
  // offer start
  if ($(".offer-swiper").length) {
    var swiper = new Swiper(".offer-swiper", {
      centeredSlides: true,
      effect: "fade",
      autoplay: {
        false: true,
        delay: 4000,
        disableOnInteraction: false,
      },
      autoplay: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
  // offer slider end
});
