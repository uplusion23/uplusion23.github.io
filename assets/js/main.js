$.ajaxSetup({
  headers : {
    'Access-Control-Allow-Origin' : '*'
  }
});

$('[data-link]').on('click', function() {
  let link = $(this).data('link');
  window.open(link);
});

const getPostContent = (postID) => {

}

const loadPost = (postID) => {
  $.ajax({
    url: 'posts/' + postID + '.json',
    type: 'GET',
    dataType: 'json',
    success: function(postData) {
      console.log(postData)
    },
    error: function(e) {
      console.log(e);
    },
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    }
  });
}
