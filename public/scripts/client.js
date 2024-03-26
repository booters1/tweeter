/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: formData
    })
    .done(function(response) {
        renderTweets([response]);
    })
    .fail(function(error) {
        console.error('tweet cannot be posted', error);
    });
  });
  

    function createTweetElement(tweetData) {
      const $tweet = $(`
          <article class="tweet">
                  <div class="user-info">
                      <img src="${tweetData.user.avatars}" alt="Avatar" class="avatar">
                      <div class="user-details">
                          <h3 class="username">${tweetData.user.name}</h3>
                          <p class="handle">${tweetData.user.handle}</p>
                      </div>
                  </div>
              <section class="tweet-content">
                  <p>${tweetData.content.text}</p>
              </section>
              <footer>
                  <p class="tweet-time">${tweetData.created_at}</p>
                  <div class="tweet-icons">
                      <i class="fa-solid fa-retweet"></i>
                      <i class="fa-solid fa-heart"></i>
                      <i class="fa-solid fa-flag"></i>
                  </div>
              </footer>
          </article>
      `);
  
      return $tweet;
  }
  


  function renderTweets(tweets) {
    tweets.forEach(tweet => {
        const $tweet = createTweetElement(tweet);
        $('.tweets-container').prepend($tweet);
    });
}


    const data = [
        {
            "user": {
                "name": "Newton",
                "avatars": "https://i.imgur.com/73hZDYK.png",
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
                "handle": "@rd"
            },
            "content": {
                "text": "Je pense , donc je suis"
            },
            "created_at": 1461113959088
        }
    ];
    
    renderTweets(data);
});

