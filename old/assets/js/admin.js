$('[data-action]').on('click', function() {
  let action = $(this).data('action');
  switch (action) {
    case "signin":
      requestSignIn();
      break;
  }
});
