// load a locale
numeral.locale('it');
numeral.register('locale', 'it', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'mila',
        million: 'mil',
        billion: 'b',
        trillion: 't'
    },
    ordinal: function (number) {
        return 'º';
    },
    currency: {
        symbol: '€'
    }
});

Handlebars.registerHelper ("formatEuro", function (number) {

  return numeral(number).format('0,0.00 $');

});