/*global $, jQuery, alert*/
$(document).ready(function() {

  'use strict';

  // ========================================================================= //
  //  //SMOOTH SCROLL
  // ========================================================================= //


  $(document).on("scroll", onScroll);

  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    $(document).off("scroll");

    $('a').each(function() {
      $(this).removeClass('active');
      if ($(window).width() < 768) {
        $('.nav-menu').slideUp();
      }
    });

    $(this).addClass('active');

    var target = this.hash,
        menu = target;

    target = $(target);
    $('html, body').stop().animate({
      'scrollTop': target.offset().top - 80
    }, 500, 'swing', function() {
      window.location.hash = target.selector;
      $(document).on("scroll", onScroll);
    });
  });


  function onScroll(event) {
    if ($('.home').length) {
      var scrollPos = $(document).scrollTop();
      $('nav ul li a').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
      });
    }
  }

  // ========================================================================= //
  //  //GALERIA
  // ========================================================================= //


  function galeryFunction(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expandedImg");
    // Get the image text
    var imgText = document.getElementById("imgtext");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.innerHTML = imgs.alt;
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "initial";

  }

  
  // ========================================================================= //
  //  // RESPONSIVE MENU
  // ========================================================================= //

  $('.responsive').on('click', function(e) {
    $('.nav-menu').slideToggle();
  });

  // ========================================================================= //
  //  Carrosel de Textos
  // ========================================================================= //

  var index = 0;
  carousel();

  function carousel() {
    var i;
    var x = document.getElementsByClassName("slides");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    index++;
    if (index > x.length) {index = 1}    
    x[index-1].style.display = "block";  
    setTimeout(carousel, 4000); // Change image every 2 seconds
  }


// ========================================================================= //
//  Owl Carousel Services
// ========================================================================= //


 $('.services-carousel').owlCarousel({
    autoplay: false,
    loop: false,
    margin: 20,
    dots: true,
    nav: false,
    // responsiveClass: true,
    responsive: { 0: { items: 1 },  1300: { items: 2 } }
   });

  // ========================================================================= //
  //  magnificPopup
  // ========================================================================= //

  var magnifPopup = function() {
    $('.popup-img').magnificPopup({
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-with-zoom',
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  };


  // Call the functions
  magnifPopup();

});

// ========================================================================= //
//  Porfolio isotope and filter
// ========================================================================= //
$(window).load(function(){

  var portfolioIsotope = $('.portfolio-container').isotope({
    filter: '.projeto',
    itemSelector: '.portfolio-thumbnail' ,
    // itemSelector: '.portfolio-thumbnail2',
    layoutMode: 'fitRows'
  });

  $('#portfolio-flters li').on( 'click', function() {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({ filter: $(this).data('filter') });
  });

})

// ========================================================================= //
//  Modal
// ========================================================================= //


Vue.component('boardal', {
  template: `
    <transition name="boardal">
      <div class="boardal">
        <div class="boardal__mask" v-if="hasMask" @click="clickMask"></div>
        <div class="boardal__wrapper">
          <slot></slot>
          <div class="boardal__x" v-if="hasX" @click="clickX">&times;</div>
        </div>
      </div>
    </transition>
  `,
  props: [
    'hasX',
    'hasMask',
    'canClickMask'
  ],
  methods: {
    clickX: function(){
      this.$emit('toggle')
    },
    clickMask: function(){
      if(this.canClickMask) {
        this.$emit('toggle')
      }
    }
  }
})

let vm = new Vue({
  el: 'main',
  data: {
    modal: {
      isOpen: false,
      hasMask: true,
      canClickMask: false,
      hasX: false
    },
    step: 1,
    max: 1,
    showDots: true,
    orientation: 'row',
    // xray: 'hidden'
  },
  computed: {
    isFirstStep: function(){
      return (this.step === 1)
    },
    isLastStep: function(){
      return (this.step === this.max)
    },
    hasDots: function(){
      return (this.max > 1 && this.showDots)
    },
    x_multiplier: function(){
      return (this.orientation === 'row' ? -1 : 0)
    },
    y_multiplier: function(){
      return (this.orientation === 'row' ? 0 : -1)
    },
    axis: function() {
      return (this.orientation === 'row' ? 'row' : 'column')
    },
    axisReverse: function() {
      return (this.orientation === 'row' ? 'row-reverse' : 'column-reverse')
    },
    cross: function() {
      return (this.orientation === 'row' ? 'column' : 'row')
    },
    crossReverse: function() {
      return (this.orientation === 'row' ? 'column-reverse' : 'row-reverse')
    },
    nextIcon: function() {
      return (this.orientation === 'row' ? 'fa-arrow-right' : 'fa-arrow-down')
    },
    backIcon: function() {
      return (this.orientation === 'row' ? 'fa-arrow-left' : 'fa-arrow-up')
    },
    
  },
  watch: {
    orientation: 'setCssVars',
    // xray: 'setCssVars'
  },
  methods: {
    toggleModal: function(step) {
      step = step || 1
      this.modal.isOpen = !this.modal.isOpen
      if(this.modal.isOpen) {
        let self = this
        setTimeout(function(){
          self.$sections = self.$el.querySelectorAll('section')
          self.max = self.$sections.length
          self.goToStep(step)
        }, 1)
      }
    },
    setCssVars: function(){
      this.$el.style.setProperty('--x', (((this.step * 100) - 100) * this.x_multiplier) + '%')
      this.$el.style.setProperty('--y', (((this.step * 100) - 100) * this.y_multiplier) + '%')
      this.$el.style.setProperty('--axis', this.axis)
      this.$el.style.setProperty('--axis-reverse', this.axisReverse)
      this.$el.style.setProperty('--cross', this.cross)
      this.$el.style.setProperty('--cross-reverse', this.crossReverse)
      // this.$el.style.setProperty('--vision', this.xray)
    },
    goToStep: function(step){
      this.step = step > this.max ? this.max : step < 1 ? 1 : step
      this.currentSection = this.$sections[this.step-1]
      this.$sections.forEach(function(section){
        section.classList.remove('current')
      })
      this.currentSection.classList.add('current')
      this.currentSection.scrollTop = 0
      this.setCssVars()
    },
    skip: function(step){
      this.step+=step
      this.goToStep(this.step)
    },
    reset: function(){
      this.goToStep(1)
    },
    finish: function(){
      this.toggleModal()
    }
  } 
})




// function sendMail() {
//   var email = document.getElementById("email").value;
//   var assunto = document.getElementById("subject").value;
//   var menssagem = document.getElementById("body").value;
//   console.log(email)
//   var link = "mailto:arteverde@a-verde.com.br"
//            + "?cc=myCCliac.ramaldes@gmail.com"
//            + "&subject=" + encodeURIComponent(assunto)
//            + "&body=" + encodeURIComponent(menssagem)
//   ;
//   console.log(link)
//   window.location.href = link;
// }


// function enviarEmail(subject, body){
//   console.log(enviou);
//   window.open('mailto:arteverde@a-verde.com.br?subject=subject&body=body');
// }