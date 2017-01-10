//Snipcart.api.configure('split_firstname_and_lastname', false);

Snipcart.subscribe('cart.opened', function (data) {
    $('#snipcart-discounts').hide();
});