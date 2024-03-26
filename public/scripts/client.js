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
      $('.error-message').text('⚠ Cannot post an empty tweet! ⚠').slideDown();
      return false; 
    }


    if (tweetContent.length > 140) {
        $('.error-message').text('⚠ Cannot post a tweet with over 140 characters ⚠').slideDown();
        return false; 
    }
    clearError();

    const formData = $(this).serialize();
    $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: formData
    })
    .done(function(response) {
      $('textarea').val('');
      loadTweets();
    })
    .fail(function(error) {
        console.error('tweet cannot be posted', error);
    });
  });

  $('textarea').on('input', function() {
    clearError();
  });


    function showError(message) {
      const $errorMessage = $('.error-message');
      $errorMessage.text(message).slideDown();
    }
  

    function clearError() {
      const $errorMessage = $('.error-message');
      $errorMessage.slideUp();
    }
  

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

