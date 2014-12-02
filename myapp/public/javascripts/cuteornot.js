var photos = [{url: "http://upload.wikimedia.org/wikipedia/commons/2/22/Turkish_Van_Cat.jpg"},{url: "http://aplusanimalhospital.com/wp-content/uploads/2013/08/projectcat.jpg"},{url: 'http://desktopwallpapers.biz/wp-content/uploads/2014/09/Animal-Cat-Wallpapers.jpg'}];
var voted = [];

var voting = function(temp, counter) {
  counter = counter || 0;
  $('#main').html('<div class="photo1"><img class="single-photo" src="' + temp.url + '"></div><div class="photo2"><img class="single-photo" src="' + photos[counter].url + '"></div>');
  $('.photo1').on('click', function() {
    if (temp.rank) { temp.rank += 1; } else { temp.rank = 1; } 
    if (!photos[counter].rank) { photos[counter].rank = 0; }
    if (counter < photos.length - 1) {
      counter += 1;
      voting(temp,counter);
    } else {
      voted.push(temp);
      choices();
    }
  });
  $('.photo2').on('click', function() {
    if (photos[counter].rank) { photos[counter].rank += 1; } else { photos[counter].rank = 1; } 
    if (!temp.rank) { temp.rank = 0; } 
    if (counter < photos.length - 1) {
      counter += 1
      voting(temp,counter);
    } else {
      voted.push(temp);
      choices();
    }
  });
};



var choices = function() {
  var temp = photos.pop();
  if (photos.length > 0) {
    voting(temp, 0);
  } else {
    voted.push(temp);
    voted.sort(function(a, b) { return b.rank - a.rank; });
    $('.title').html('Results');
    $('#main').html('<ol id="results"></ol>')
    for (var i = 0; i < voted.length; i++) {
      if (i === 0) {
        $('#results').append('<li class="photo"><img class="single-photo" src="' + voted[i].url + '"></li>');     
      } else {
        $('#results').append('<li class="photo"><img class="photo" src="' + voted[i].url + '"></li>');
      }
    }
    console.log(voted);
  }
};

if (photos.length === 1) {
  $('.title').html('Cutest Photo');
  $('#main').html('<img class="single-photo" src="' + photos[0].url + '">');
} else if (photos.length > 1) {
  choices();
}