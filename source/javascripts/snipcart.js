Snipcart.api.configure('split_firstname_and_lastname', false);

Snipcart.subscribe('cart.opened', function (data) {
    console.log ('aperto');
    $('#snipcart-discounts').hide();
});

Snipcart.subscribe('page.change', function (data) {
    console.log ('cambia');
    $('#snip-actions').hide();
});