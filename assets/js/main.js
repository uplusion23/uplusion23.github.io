let global = {
  posts: {}
}

$('[data-link]').on('click', function() {
  let link = $(this).data('link');
  window.open(link);
});

$('body').on('click', '[data-post]', function() {
  let postID = $(this).data('post');
  let postData = global.posts[postID + '.json'];
  $('[data-postinfo="title"]').text(postData.title);
  $('[data-postinfo="header"]').css({
    "background-image": "url('" + postData.header + "')"
  });
  $('[data-postinfo="body"]').html(postData.body);
  $('.post-popup').addClass('active');
});

$('[data-dialog]').on('click', function() {
  let action = $(this).data('dialog');
  let dialog = $('.post-popup');
  switch (action) {
    case "close":
      dialog.removeClass('active');
      break;
  }
});

$(document).ready(() => {
  $.ajax({
    url: 'posts/main.json',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      if (typeof data.posts !== "undefined") {
        for (var x = 0; x < Object.keys(data.posts).length; x++) {
          let postFile = Object.keys(data.posts)[x];
          let postObject = data.posts[Object.keys(data.posts)[x]];
          loadPost(postFile, (postData) => {
            if (postData.success === false || typeof postData === 'undefined') {
              alert('Uh oh! Failed to load the post! [' + postFile + ']');
              console.log(postData.error)
            } else {
              global.posts[postFile] = postData;
              $('[data-list="updates"]').append(`
                <div class="post" data-post="one" style="background-image: url('${postData.header}')">
                  <span class="description">
                    <span class="category">Announcement</span>
                    ${postData.smallDescription}
                  </span>
                  <span class="title">
                    <span>${postData.title}</span>
                  </span>
                </div>
                `);
            }
          });
        }
      } else {
        console.error('Received unknown json for posts.');
      }
    },
    error: function(e) {
      console.log(e);
    }
  });
  setTimeout(() => {
    $('body').addClass('scroll-remove');
    // Is three seconds too long? Maybe I'll just wait for user input or something later on.
  }, 3000);
});

const convertDate = (timestamp) => {
  let date = new Date(timestamp);
  let pm = date.getHours() >= 12;
  let hour12 = date.getHours() % 12;
  if (!hour12)
    hour12 += 12;
  let minute = date.getMinutes();
  let today = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
  let dateTime = `${today} - ${hour12}:${minute} ${pm ? 'PM' : 'AM'}`
  console.log(dateTime);
}

// new Date().getTime();

const loadPost = (postID, callback) => {
  $.ajax({
    url: 'posts/' + postID,
    type: 'GET',
    dataType: 'json',
    async: false, // Ensures we get the post information before passing the result.
    success: function(postData) {
      console.log(postData)
      callback(postData);
    },
    error: function(e) {
      console.log(e)
      callback({"success": false, "error": e})
    },
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    }
  });
}
