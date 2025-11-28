"use strict";

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
    }).dialog("close");
});

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
            $("#tabs").tabs({
                active: 0
            });
        }
    }).fail(function(jqXHR){
        console.error(jqXHR.responseJSON.status_message);
        $(`#dialog`).dialog("open");
    });
});