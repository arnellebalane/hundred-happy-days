exports.home = function(request, response) {
  response.render('pages/home', { title: 'hundred happy days' });
}