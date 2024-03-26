/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    const tweetContent = $(this).find('textarea').val().trim();

    if (!tweetContent) {
        alert('Cannot post an empty tweet!');
        return false; 
    }


    if (tweetContent.length > 140) {
        alert('Cannot post a tweet with over 140 characters');
        return false; 
    }

    const formData = $(this).serialize();
    $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: formData
    })
    .done(function(response) {
      const $tweet = createTweetElement(response); 
      $('.tweets-container').prepend($tweet); 
      $('textarea').val('');
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
                  <p class="tweet-time">${timeago.format(tweetData.created_at)}</p>
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

  function loadTweets() {
    $.ajax({
        url: '/tweets',
        method: 'GET',
        dataType: 'json',
        success: function(tweets) {
            renderTweets(tweets);
        },
        error: function(error) {
            console.error('tweet cannot be loaded', error);
        }
    });
}


  function renderTweets(tweets) {
    $('.tweets-container').empty();
    tweets.forEach(tweet => {
        const $tweet = createTweetElement(tweet);
        $('.tweets-container').prepend($tweet);
    });
    timeago().render(document.querySelectorAll('.tweet-time'));
}

    
    loadTweets();
});

