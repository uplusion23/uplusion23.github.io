let global = {
  posts: {}
}

$('[data-link]').on('click', function() {
  let link = $(this).data('link');
  window.open(link);
});

$('[data-dialog]').on('click', function() {
  let action = $(this).data('dialog');
  let dialog = $('.post-popup');
  switch (action) {
    case "close":
      dialog.removeClass('active');
      $('[data-postinfo="body"]').empty();
      break;
  }
});

$('.container').scroll(function () {
  if ($(this).scrollTop() >= 40) {
    $('body').addClass('scroll');
  }
  if ($(this).scrollTop() < 40) {
    $('body').removeClass('scroll');
  }
});

$('body').on('click', '[data-post]', function() {
  let postID = $(this).data('post');
  let postData = global.posts[postID];
  $('[data-postinfo="title"]').text(postData.title);
  $('[data-postinfo="date"]').text(convertDate(postData.date));
  $('[data-postinfo="category"]').text(postData.category);
  $('[data-postinfo="description"]').text(postData.smallDescription);
  $('[data-postinfo="header"]').css({
    "background-image": "url('" + postData.header + "')"
  });
  $('[data-postinfo="body"]').html('<a class="image" style="background-image: url(' + postData.header + ');" href="' + postData.header + '"></a>' + postData.body);
  $('.post-popup').addClass('active');
});

$(document).ready(() => {
  getPosts();
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
  let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  let today = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
  let dateTime = `${today} - ${hour12}:${minute} ${pm ? 'PM' : 'AM'}`
  return dateTime;
}

// new Date().getTime();

const changeTheme = (theme) => {
  switch (theme) {
    case "day":
      console.warn('Theme: ', 'Are you insane..?');
      console.log('Theme: ', 'Day Mode');
      $(':root').removeClass();
      $(':root').addClass('theme-day');
      break;
    case "night":
      console.log('Theme: ', 'Night Mode');
      $(':root').removeClass();
      break;
    case "blue":
      console.log('Theme: ', 'Blue Mode');
      $(':root').removeClass();
      $(':root').addClass('theme-blue');
      break;
    default:
      console.warn('Theme: ', 'Invalid theme specified.');
      break;
  }
}
