$(document).foundation();


$( "#acquistaSubito" ).on( "click", function() {
    ga('send', {hitType: 'event', eventCategory: 'Bottone', eventAction: 'click', eventLabel: 'acquistaSubito'});
    console.log ('acquistaSubito');
});