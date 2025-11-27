"use strict";

// Copyright year
$(function(){
	let today = new Date();
	$("footer span").text(today.getFullYear());
});

// Carousel
$(document).ready(function(){
    $('.slickCarousel').slick({
        autoplay: true,
        dots: true
    });
});

// JQuery Tabs
$(function(){
    $("#tabs").tabs();
});