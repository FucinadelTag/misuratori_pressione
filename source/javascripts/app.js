var MarketCloud = new Marketcloud.Client({
    public_key : '3453bfe9-0252-45ba-a6fe-bba5f8b34120'
})


$( ".acquistaSubito" ).click(function( event ) {

    event.preventDefault();

    productId = event.currentTarget.attributes.getNamedItem('data-item-id').value;

    addToCart(productId);

});

var getCartId = function () {
    let cart = JSON.parse(localStorage.getItem('cart'));

    return cart.id;
}

var getBillingAddress = function (userData) {

    let billing_address = {
                full_name: 'Prova',
                email: 'lorenzo@fucinadeltag.it',
                country: 'Italia',
                city: 'mmmm',
                address1: 'mmm',
                postal_code: 'mmm'


    }

    return billing_address;
}

var payOrder = function (){
    let paymentData = JSON.parse(localStorage.getItem('paymentData'));
    let orderData = JSON.parse(localStorage.getItem('orderData'));

    MarketCloud.payments.create({
        method : "Braintree",
        order_id : orderData.id,
        nonce : paymentData.nonce
    },function(err,result){

        console.log(err);
        console.log(result);

    // The payment was successful and the order was flagged as paid
    // You can log into your Braintree's Dashboard for further details
    // about the payment.

    })
}

var createOrder = function (userData) {

    var the_order = {
        billing_address : getBillingAddress(userData),
        cart_id : getCartId ()
    }

    MarketCloud.orders.create(the_order,function(err,response){

        saveOrder (response.data);

        payOrder ();

    });

    //localStorage.setItem('cardData', JSON.stringify(payload));

}

var saveCreditCardResponse = function (paymentData) {

    localStorage.setItem('paymentData', JSON.stringify(paymentData));

}

var saveOrder = function (order) {

    localStorage.setItem('orderData', JSON.stringify(order));

}

var updateCart = function (formData) {

    let cart = JSON.parse(localStorage.getItem('cart'));

    MarketCloud.carts.update(cart.id,[
                      {'product_id':formData.itemId,'quantity':formData.quantity}
      ],function(err,response){
        if (err) {
            console.log (err);
        } else {
            localStorage.setItem('cart', JSON.stringify(response.data));
            window.location.replace("/carrello");
        }
    })

}

var addToCart = function (productId) {

    let cart = JSON.parse(localStorage.getItem('cart'))
    console.log (cart);

    if (cart !== null){
        MarketCloud.carts.add(cart.id, [
            {'product_id':productId,'quantity':1}
        ],function(err,response){
            if (err) {
                console.log (err);
            } else {
                localStorage.setItem('cart', JSON.stringify(response.data));
                window.location.replace("/carrello");
            }
        });
    } else {
        MarketCloud.carts.create({
            items:[{'product_id': productId,'quantity': 1}]
        },function(err,response){
            if (err) {
                console.log (err);
            } else {
                localStorage.setItem('cart', JSON.stringify(response.data));
                window.location.replace("/carrello");
            }
        });
    }
}

var showCart = function () {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let templateUrl = 'templates/carrello';
    console.log (cart);

    $.get(templateUrl, function(template) {
        var theTemplate = Handlebars.compile(template);
        $('#carrello').html(theTemplate(cart));
    });
}