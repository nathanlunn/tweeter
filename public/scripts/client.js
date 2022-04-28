/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  // create the html that will appended to the #tweet-list for each tweet in the database
  const createTweetElement = function(tweet) {
    let $article = $('<article>').addClass('existing-tweet');
    let $header = $('<header>');
    let $nameDiv = $('<div>');
    let $handleDiv = $('<div>').addClass('user-handle');
    let $main = $('<main>');
    let $footer = $('<footer>');
    let $timeDiv = $('<div>').addClass('timestamp');
    let $iconDiv = $('<div>').addClass('share-icons');

    $iconDiv.append('<a href=""><i class="fa-solid fa-flag"></i></a>  <a href=""><i class="fa-solid fa-retweet"></i></a>  <a href=""><i class="fa-solid fa-heart"></i></a>');
    $timeDiv.text(timeago.format(tweet.created_at));
    $footer.append($timeDiv, $iconDiv);

    $main.text(tweet.content.text);

    $nameDiv.append(`<img src="${tweet.user.avatars}">`, tweet.user.name);
    $handleDiv.text(tweet.user.handle);
    $header.append($nameDiv, $handleDiv);

    $article.append($header, $main, $footer);

    return $article;
  };

  // keep track of tweets already added to the page
  const rendered = [];
  // creates html with createTweetElement for each tweet in the database that hasn't been added already
  const renderTweets = function(arrayOfTweets) {
    for (let tweet of arrayOfTweets) {
      if (!rendered.includes(tweet.user.handle)) {
        $('.tweet-list').prepend(createTweetElement(tweet));
        rendered.push(tweet.user.handle);
      }
    }
    loadTweets();
  };

  //requests tweets from the database using AJAX and adds them to the page with renderTweets
  const loadTweets = function() {
    $.ajax('/tweets').then(data => renderTweets(data));
  };
  loadTweets();

  //creates custom error messages when something has gone wrong in the tweet submission
  const createErrorMessage = function(error) {
    let $errorDiv = $('<div>').addClass('error');
    let $iconDiv = $('<div>').addClass('red');
    $iconDiv.append('<i class="fa-solid fa-circle-exclamation"></i>');
    $errorDiv.append(error, $iconDiv);
    $('#submit-error').append($errorDiv);
  };

  // adds a tweet to the database if no errors and immediately adds it to the page via loadTweets.
  $('.tweet-form').submit(function(event) {
    event.preventDefault();
    if ($('#tweet-text').val().length === 0) {
      $('.error').remove();
      createErrorMessage('Tweet must not be empty!');
      return;
    }
    if ($('#tweet-text').val().length > 140) {
      $('.error').remove();
      createErrorMessage('Tweet must be 140 characters or less!');
      return;
    }
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(this).serialize(),
    });
    $('.error').remove();
    loadTweets();

  });
  
  // reveals the tweet submission form when a user clicks the write tweet button in the nav
  $('.write').on('click', () => {
    $('.new-tweet').toggleClass('show');
  });

  // reveals the "go to top" button when the user scrolls down
  // $('document').scroll(() => console.log('yes'));
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 200) {
      document.querySelector('.to-top').classList.add('show-to-top')
    } else {
      document.querySelector('.to-top').classList.remove('show-to-top');
    }
  });

  // sends user to the top of the page and focuses on the textarea for tweet form when "go to top" button is clicked
  $('.to-top').on('click', () => {
    $('.new-tweet').addClass('show');
    window.scrollTo(0, 0);
    $('#tweet-text').focus();
  });
});