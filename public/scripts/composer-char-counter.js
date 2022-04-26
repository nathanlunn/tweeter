
$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let counter = $(this).siblings('div').children('output').get();
    $(counter).text(140 - $(this).val().length);
    if ($(counter).text() < 0) {
      $(counter).addClass('red');
    } else {
      $(counter).removeClass('red');
    }
  });

});
