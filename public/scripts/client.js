/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.


// Fake data taken from initial-tweets.json
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

// returns the the HTML structure of the tweet
const createTweetElement = function(tweet) {
  const date = Date(tweet.created_at);
  console.log(date);
  console.log(typeof date);
  const markup = ` 
    <article>
      <header class="tweet-header">
        <span class="user"><img src=${tweet.user.avatars}> ${tweet.user.name}</span>
        <span class="usertag">${tweet.user.handle}</span>
      </header>
      <section>${tweet.content.text}</section>
      <footer>${date} days ago</footer>
    </article>
   `;
  return markup;
};

// appends the tweet into the container
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $(".container").append(createTweetElement(tweet));
  }
};

$(document).ready(function() {
  renderTweets(data);
});
