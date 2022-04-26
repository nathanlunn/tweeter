/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const createTweetElement = function(tweet) {
    const html = `
    <article class="existing-tweet">
            <header>
              <div>
                <img src="${tweet.user.avatars}">
                ${tweet.user.name}
              </div>
              <div class="user-handle">
                ${tweet.user.handle}
              </div>
            </header>
            <main>
              ${tweet.content.text}
            </main>
            <footer>
              <div class="timestamp">${(Math.floor((new Date() - tweet.created_at) / 1000 / 60 / 60 / 24))} days ago</div>
              <div class="share-icons">
                <a href=""><i class="fa-solid fa-flag"></i></a>  <a href=""><i class="fa-solid fa-retweet"></i></a>  <a href=""><i class="fa-solid fa-heart"></i></a>
              </div>
            </footer>
          </article>
    `;
    return html;
  };

  const renderTweets = function(arrayOfTweets) {
    for (let tweet of arrayOfTweets) {
      $('.tweet-list').append(createTweetElement(tweet));
    }
  };

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  // const $tweet = createTweetElement(tweetData);
  // // console.log($tweet); // to see what it looks like
  // $('.tweet-list').append($tweet);
  renderTweets(data);

});