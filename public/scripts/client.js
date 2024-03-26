/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


function createTweetElement(tweetData) {
  const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="user-info">
          <img src="${tweetData.user.avatars}" alt="Avatar" class="avatar">
          <h3 class="username">${tweetData.user.name}</h3>
          <h3 class="handle">${tweetData.user.handle}</h3>
        </div>
      </header>
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


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": "2016-04-20T21:24:27Z"
};

const $tweet = createTweetElement(tweetData);

// TEST
console.log($tweet); 
$('.tweets-container').append($tweet); 
