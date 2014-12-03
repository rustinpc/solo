// db.Set.findOrCreate({where: {setname: 'cats'}})
//         .complete(function(err, results){
//           db.Message.create({
//             rank: 0
//           });
//         });

var photos = [{url: "http://upload.wikimedia.org/wikipedia/commons/2/22/Turkish_Van_Cat.jpg"},{url: "http://aplusanimalhospital.com/wp-content/uploads/2013/08/projectcat.jpg"},{url: 'http://desktopwallpapers.biz/wp-content/uploads/2014/09/Animal-Cat-Wallpapers.jpg'}];

var getPhotos = function(setname) {
  $.ajax({
        url: 'http://127.0.0.1:3000/photos/' + setname,
        type: 'GET',
        data: {},
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
          photos = data;
          console.log(photos);
          photoVoting(setname);
          // $('#main').prepend('<select id="sets"><option value="default">--</option></select>');
          // data.forEach(function(item, index, collection) {
          //   $('#sets').append('<option value="' + item.setname + '">' + item.setname + '</option>');
          // });
          // $('#sets').on('change', function() {
          //   if ($('#sets').val() !== 'default') {
          //     console.log($('#sets').val());
          //   }
          // });
          // Trigger a fetch to update the messages, pass true to animate
          // app.fetch();
        },
        error: function (data) {
          console.error('chatterbox: Failed to send message');
        }
      });
};

var init = function() {
  $('#main').html('');
  $('.title').html('Select a Photo Set:');
$.ajax({
        url: 'http://127.0.0.1:3000/sets',
        type: 'GET',
        data: {},
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
          console.log(data);
          $('#main').prepend('<select id="sets"><option value="default">--</option></select>');
          data.forEach(function(item, index, collection) {
            $('#sets').append('<option value="' + item.setname + '">' + item.setname + '</option>');
          });
          $('#sets').on('change', function() {
            if ($('#sets').val() !== 'default') {
              // console.log($('#sets').val());
              getPhotos($('#sets').val());
            }
          });
          // Trigger a fetch to update the messages, pass true to animate
          // app.fetch();
        },
        error: function (data) {
          console.error('chatterbox: Failed to send message');
        }
      });
};

var voted = [];

var urlSubmit = function(setname) {
  $('.title').html('Submit an image');
    $('#main').html('<input id="formUrl" type="url"></input>&nbsp;<button id="submitUrl">Submit URL</button>');
    $('#submitUrl').on('click', function() {
      console.log($('#formUrl').val());
      $.ajax({
          url: 'http://127.0.0.1:3000/photos/add',
          type: 'POST',
          data: JSON.stringify({setname: setname, formUrl: $('#formUrl').val() }),
          contentType: 'application/json',
          success: function (data) {
          },
          error: function (data) {
            console.error('chatterbox: Failed to send message');
          }
        });
      setInterval(init(),2000);
    });
};

var voting = function(temp, counter, setname) {
  counter = counter || 0;
  $('#main').html('<div class="photo1"><img class="single-photo" src="' + temp.url + '"></div><div class="photo2"><img class="single-photo" src="' + photos[counter].url + '"></div>');
  $('#main').prepend('<button id="newPhoto">Add a new photo</button><br /><br />');
  $('#newPhoto').on('click', function() { urlSubmit(setname); });
  $('.photo1').on('click', function() {
    if (temp.rank) { temp.rank += 1; } else { temp.rank = 1; } 
    if (!photos[counter].rank) { photos[counter].rank = 0; }
    if (counter < photos.length - 1) {
      counter += 1;
      voting(temp,counter,setname);
    } else {
      voted.push(temp);
      choices(setname);
    }
  });
  $('.photo2').on('click', function() {
    if (photos[counter].rank) { photos[counter].rank += 1; } else { photos[counter].rank = 1; } 
    if (!temp.rank) { temp.rank = 0; } 
    if (counter < photos.length - 1) {
      counter += 1
      voting(temp,counter,setname);
    } else {
      voted.push(temp);
      choices(setname);
    }
  });
};



var choices = function(setname) {
  var temp = photos.pop();
  if (photos.length > 0) {
    voting(temp, 0, setname);
  } else {
    voted.push(temp);
    voted.sort(function(a, b) { return b.rank - a.rank; });
    $('.title').html('Results');
    $('#main').html('<ol id="results"></ol>')
    for (var i = 0; i < voted.length; i++) {
      if (i === 0) {
        $('#results').append('<li class="photo"><img class="single-photo winner" src="' + voted[i].url + '"></li>');     
      } else {
        $('#results').append('<li class="photo"><img class="photo" src="' + voted[i].url + '"></li>');
      }
    }
    for (var i = 0; i < voting.length; i++) {
      $.ajax({
          url: 'http://127.0.0.1:3000/photos/' + voted[i].id,
          type: 'POST',
          data: JSON.stringify(voted[i]),
          contentType: 'application/json',
          success: function (data) {
          },
          error: function (data) {
            console.error('chatterbox: Failed to send message');
          }
        });
    }
    // console.log(voted);
  }
};

var photoVoting = function(setname) {
  if (photos.length === 1) {
    $('.title').html('Cutest Photo');
    $('#main').html('<img class="single-photo" src="' + photos[0].url + '">');
  } else if (photos.length > 1) {
    $('.title').html('Vote:');
    choices(setname);
  }
};
init();