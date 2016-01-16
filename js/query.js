        function parseIt(it, section) {
              if (section == "Tracks") {
                  next_tracks = it.next;
                  previous_tracks = it.previous;
                  var total_tracks = it.total;
                  var limit_tracks = it.limit;
                  var offset_tracks = it.offset;
                  if (total_tracks < limit_tracks) {
                      limit_tracks = total_tracks;
                  }
                  $.each(it.items, function(key, value) {
                      if (value.album.images.length !== 0) {
                           var image = value.album.images[value.album.images.length - 1].url;
                      } else {
                           var image = 'http://www.icon2s.com/img64/64x64-circle-spotify-icon.png';
                      }
                      var name = value.name;
                     /*
                      var artists = [];
                      i = value.artists.length - 1;
                      while(i--) {
                          artists.push(value.artists[i].name);
                      }
		     */
                      var type = value.type;
                      var preview_url = value.preview_url;
                      $('#tracks').append('<a href="'+preview_url+'"><img src="'+image+'">'+name.substring(0,43)+'</a><br>');
                  });
                  if (previous_tracks !== null) {
                      $('#tracks').append('<button id="previousbutton" class="btn btn-primary" onclick="paginate(previous_tracks, \'Tracks\');">PREVIOUS</button>');
                  }
                  if (next_tracks !== null) {
                      $('#tracks').append('<button id="nextbutton" class="btn btn-primary" onclick="paginate(next_tracks, \'Tracks\');">NEXT</button>');
                  }
                  if (offset_albums+limit_albums > total_albums) {
                      $('#tracks').append('<p>'+(offset_tracks+1).toString()+'-'+total_tracks.toString()+'/'+total_tracks.toString()+'</p>');
                  } else {
                      $('#tracks').append('<p>'+(offset_tracks+1).toString()+'-'+(offset_tracks+limit_tracks).toString()+'/'+total_tracks.toString()+'</p>');
		  }
               } else if (section == "Albums") {
                     next_albums = it.next;
                     previous_albums = it.previous;
                     var total_albums = it.total;
                     var limit_albums = it.limit;
                     var offset_albums = it.offset;
                     if (total_albums < limit_albums) {
                         limit_albums = total_albums;
                     }
		     $.each(it.items, function(key, value) {
                         if (value.images.length !== 0) {
                             var image = value.images[value.images.length - 1].url;
                         } else {
                             var image = 'http://www.icon2s.com/img64/64x64-circle-spotify-icon.png';
                         }
 		         var name = value.name;
			 var type = value.type;
                        // var album_url = value.href;
                         var album_url = value.external_urls.spotify;
                         $('#albums').append('<a href="'+album_url+'"><img src="'+image+'">'+name.substring(0,43)+'</a><br>');
		     });
                     if (previous_albums !== null) {
                         $('#albums').append('<button id="previousbutton" class="btn btn-primary" onclick="paginate(previous_albums, \'Albums\');">PREVIOUS</button>');
                     }
                     if (next_albums !== null) {
                         $('#albums').append('<button id="nextbutton" class="btn btn-primary" onclick="paginate(next_albums, \'Albums\');">NEXT</button>');
                     }
                     if (offset_albums+limit_albums > total_albums) {
                         $('#albums').append('<p>'+(offset_albums+1).toString()+'-'+total_albums.toString()+'/'+total_albums.toString()+'</p>');
                     } else {
                         $('#albums').append('<p>'+(offset_albums+1).toString()+'-'+(offset_albums+limit_albums).toString()+'/'+total_albums.toString()+'</p>');
                     }
	       } else if (section == "Artists") {
	           next_artists = it.next;
                   previous_artists = it.previous;
                   var total_artists = it.total;
                   var limit_artists = it.limit;
                   var offset_artists = it.offset;
                   if (total_artists < limit_artists) {
		       limit_artists = total_artists;
                   }
                   $.each(it.items, function(key, value) {
                       if (value.images.length !== 0) {
                           var image = value.images[value.images.length - 1].url;
                       } else {
                           var image = 'http://www.icon2s.com/img64/64x64-circle-spotify-icon.png';
                       }
		       var name = value.name;
		       var type = value.type;
                      // var artist_url = value.href;
                       var artist_url = value.external_urls.spotify;
                       $('#artists').append('<a href="'+artist_url+'"><img src="'+image+'">'+name.substring(0,43)+'</a><br>');
                    });
                   if (previous_artists !== null) {
                       $('#artists').append('<button id="previousbutton" class="btn btn-primary" onclick="paginate(previous_artists, \'Artists\');">PREVIOUS</button>');
                   }
                   if (next_artists !== null) {
                       $('#artists').append('<button id="nextbutton" class="btn btn-primary" onclick="paginate(next_artists, \'Artists\');">NEXT</button>');
                   }
                   if (offset_artists+limit_artists > total_artists) {
                       $('#artists').append('<p>'+(offset_artists+1).toString()+'-'+total_artists.toString()+'/'+total_artists.toString()+'</p>');
                   } else {
                       $('#artists').append('<p>'+(offset_artists+1).toString()+'-'+(offset_artists+limit_artists).toString()+'/'+total_artists.toString()+'</p>');
		   }
	       }
        }

        function search() {
          var phrase = document.getElementById("searchbox").value;
          if (phrase !== "") {
            $.ajax({
                  url: 'https://api.spotify.com/v1/search?q=' + phrase + '&type=artist,album,track',
                  success: function(response) {
                        tracks = response.tracks;
                        albums = response.albums;
			artists = response.artists;
                        $('#searchresults').remove();
                        $('#search').append('<div id="searchresults" style="text-align: left;"></div>');
                        $('#searchresults').append('<div id="tracks"><h1 style="text-align: center;">Tracks</h1></div><br>');
                        $('#searchresults').append('<div id="albums"><h1 style="text-align: center;">Albums</h1></div><br>');
                        $('#searchresults').append('<div id="artists"><h1 style="text-align: center;">Artists</h1></div><br>');
                        parseIt(tracks, 'Tracks');
			parseIt(albums, 'Albums');
			parseIt(artists, 'Artists');
                    }
               });
          }
         }

        function paginate(url, section) {
            if (url !== null) {
                $.ajax({
                      url: url,
                      success: function(response) {
                          if (section == "Tracks") {
                              var tracks = response.tracks;
                              $('#tracks').empty();
                              $('#tracks').append('<h1 style="text-align: center;">Tracks</h1>');
                              parseIt(tracks, "Tracks");
                          } else if (section == "Albums") {
                              var albums = response.albums;
                              $('#albums').empty();
                              $('#albums').append('<h1 style="text-align: center;">Albums</h1>');
                              parseIt(albums, "Albums");
                          } else if (section == "Artists") {
                              var artists = response.artists;
                              $('#artists').empty();
                              $('#artists').append('<h1 style="text-align: center;">Artists</h1>');
                              parseIt(artists, "Artists");
                          }
                      }
                });
            }
	}
