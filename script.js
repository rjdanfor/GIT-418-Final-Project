"use strict";
var lightTheme = true;

// init
$(function(){
    // Copyright year
    let today = new Date();
	$("footer span").text(today.getFullYear());

    // Carousel
    $('.slickCarousel').slick({
        autoplay: true,
        dots: true
    });

    // JQuery Tabs
    $("#tabs").tabs();     

    // JQuery UI Error Dialog Box
    $(`#dialog`).dialog({
        modal: true,
        buttons: {
            Ok: function(){
                $(this).dialog("close");
            }
        }
    }).dialog("close"); // <-- Don't the dialog without an error
});

// Puts site into correct theme per browser settings
if(window.matchMedia){
    if(window.matchMedia('(prefers-color-scheme: dark)').matches || localStorage.getItem("theme") == "dark"){
        // If dark mode
        lightTheme = false;
        $("html").css("background-color", "grey");
        console.log("light theme is " + lightTheme);
    };
    if(window.matchMedia('(prefers-color-scheme: light)').matches || localStorage.getItem("theme") == "light"){
        // If light mode
        lightTheme = true;
        console.log("light theme is " + lightTheme);
    };
}else{
    // If media queries don't work, default to light mode
    lightTheme = true;
    console.log("light theme is " + lightTheme);
}

// if localStorage theme, use theme
if(localStorage.getItem("theme") == "light"){
    $("html").css("background-color", "burlywood");
}
if(localStorage.getItem("theme") == "dark"){
    $("html").css("background-color", "grey");
    lightTheme = false;
}

$(function(){
    $.ajax({
        // API call
        url: "https://f1801962-bdf1-4774-84b8-3bff6ab79bcc.mock.pstmn.io/showcase",
        dataType: "json"
    }).done(function(data){
        console.log(data);

        // For each response
        for (let i = 0; i < data.items.length; i++){
            // Add data to carousel
            let slickHTML = `
            <div>
                <img src="${data.items[i].image}" alt="${data.items[i].alt}" height="500px"></img>
                <p>${data.items[i].title}</p>
            </div>`;
            // Need to use the slick method to add to carousel
            $('.slickCarousel').slick('slickAdd', slickHTML);

            // Add data to jq tab header
            let addTab = `<li><a href="#tabs-${i+1}">${data.items[i].title}</a></li>`;
            $(`#tabList`).append(addTab);

            // Add data to jq tab
            let newTab = `
            <div id="tabs-${i+1}">
                <p>${data.items[i].text}</p>
            </div>`;
            $(`#tabs`).append(newTab);

            // Tab refresh
            $("#tabs").tabs("refresh");

            // Set active tab
            $("#tabs").tabs({active: 0});
        }
    }).fail(function(jqXHR){
        console.error(jqXHR.responseJSON.status_message);
        $(`#dialog`).dialog("open");
    });

    // Theme button
    $("#themeToggle").on("click", function(){
    // on click event
        if(localStorage.getItem("theme")){
        // if theres a localStorage theme
            if(localStorage.getItem("theme") === "light"){
            // if theme in storage is light change to dark
                $("html").css("background-color", "grey");
                // set new localStorage
                localStorage.setItem("theme", "dark");
            }else{
                // else change to dark
                $("html").css("background-color", "burlywood");
                // set new localStorage
                localStorage.setItem("theme", "light");
            }
        }else{
        // if there isn't a local storage theme
            if(lightTheme){
            // if current theme is light change to dark
                $("html").css("background-color", "grey");
                // set new localStorage
                localStorage.setItem("theme", "dark");
            }else{
            // if current theme is not light change to light
                $("html").css("background-color", "burlywood");
                // set ne localStorage
                localStorage.setItem("theme", "light");
            };
        };
    });    
});



