Snipcart.api.configure('split_firstname_and_lastname', false);

Snipcart.subscribe('cart.opened', function (data) {
    Snipcart.unsubscribe('cart.opened');
    $('#snipcart-discounts').hide();
});

Snipcart.subscribe('item.adding', function (ev, item, items) {
    fbq('track', 'AddToCart');
});

Snipcart.subscribe('order.completed', function (data) {
    fbq('track', 'Purchase', {value:  data.total, currency:'EUR'});
});

// Snipcart.subscribe('page.change', function (data) {
//     console.log (data);
//     Snipcart.unsubscribe('cart.change');

//     $( document ).ready(function() {
//         $('#snipcart-discounts').hide();
//         if (data == 'payment-method') {
//             var element = $('.snip-actions').detach();
//             console.log (element.html());
//             $('#snipcart-cvc-content-holder').append(element);
//         }
//     });




// });