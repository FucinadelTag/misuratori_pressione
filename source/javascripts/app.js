var MarketCloud = new Marketcloud.Client({
    public_key : '3453bfe9-0252-45ba-a6fe-bba5f8b34120'
})


$( ".acquistaSubito" ).click(function( event ) {

    event.preventDefault();

    productId = event.currentTarget.attributes.getNamedItem('data-item-id').value;

    addToCart(productId);

});

var addToCart = function (productId) {

    let cart = JSON.parse(localStorage.getItem('cart'))
    console.log (cart);

    if (cart.id > 0){
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
        var rendered = Mustache.render(template, cart);
        $('#carrello').html(rendered);
    });
}