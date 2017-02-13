
// GLOBAL VARIABLES ----------------------------------

var joeFresh = {};
joeFresh.apiUrl = 'https://joefresh-marketing-dev.s3.amazonaws.com/developer-interview/full-list.json';

// PRODUCT PAGE ---------------------------------------

// Get products
 joeFresh.loadProducts = function() {
  $.ajax({
		url: joeFresh.apiUrl,
		method: 'GET',
		dataType: 'json'
	}).then(function(data) {
      joeFresh.toggleButtons(data);
	});
};

// Remove loading text (for slow connections), display button
joeFresh.toggleButtons = function(data) {
  $('.loading').toggleClass('active');
  $('.see-more').toggleClass('active');

  joeFresh.createProductArray(data.results);
};

// Organize products
joeFresh.createProductArray = function(products) {

    // Grab Products from Array
    joeFresh.displayedProducts = []
    joeFresh.splicedProducts = products.splice(0,20);
    joeFresh.displayedProducts.push(joeFresh.splicedProducts);
    joeFresh.remainingProducts = products;

    console.log(joeFresh.displayedProducts);
    console.log(joeFresh.remainingProducts);

    joeFresh.showProducts(joeFresh.displayedProducts);

    // Check if array of products is empty
    if (products.length == 0) {
      $('.see-more').toggleClass('active');
    }

};

// Display Products on page
joeFresh.showProducts = function(data) {

    // Create Handlebars Template
    var productTemplate = $("#product-template").html();
    var templateScript = Handlebars.compile(productTemplate);

    // Put Products In Template
    joeFresh.displayedProducts[0].forEach(function(eachProduct)  {

      // Append template to DOM
      var finalTemplate = templateScript(eachProduct);
      $(".product-list").append(finalTemplate);

    });
};


// Filter by Alpha
$('.filter-alpha').on('click', function() {

  $( ".product-list" ).empty();

  joeFresh.alpha = joeFresh.displayedProducts[0].sort(function(a, b) {
    var textA = a.productName.toUpperCase();
    var textB = b.productName.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });

  joeFresh.showProducts(joeFresh.displayedProducts);

});

// Filter by Price
$('.filter-price').on('click', function() {

    $( ".product-list" ).empty();

    joeFresh.price = joeFresh.displayedProducts[0].sort(function(a, b) {
      return parseFloat(a.productPrice) - parseFloat(b.productPrice);
    });

    joeFresh.showProducts(joeFresh.displayedProducts);

});

// See More Button
$('.see-more').on('click', function() {
  joeFresh.createProductArray(joeFresh.remainingProducts);
});

// GLOBAL FUNCTIONS ---------------------------------------

// Open Mobile Nav
function openMobileNav() {
  $('.global-nav').toggleClass('active');
}

// Close Mobile Nav
function closeMobileNav() {
  $('.global-nav').toggleClass('active');
}

// Run Function after document is ready
$(function() {
	joeFresh.loadProducts();
});
