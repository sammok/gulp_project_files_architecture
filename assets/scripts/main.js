// Created by sam mok 2015(Siso brand interactive team).

"use strict";

//  limit browser drag move
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
},true);

var app = {
    create: function (){
        app.mySwiper = new Swiper ('.swiper-container', {
            direction: 'vertical',

            parallax : true,

            noSwiping: false,

            // init
            onInit: function () {
            },

            onTransitionStart: function (swiper) {
            },

            onTransitionEnd: function (swiper) {

            }
        });

        //  first time play BGM
        var initSound = function () {
            //  delay play
            $('#audio')[0].play();

            document.removeEventListener('touchstart', initSound, false);
        };
        document.addEventListener('touchstart', initSound, false);
    },

    start: function (){
        this.create();
    }
};

$(function (){
    // init app
    app.start();
    console.log('app started success...');
});

