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

$(document).ready(function() {
// returns the the HTML structure of the tweet
  const createTweetElement = function(tweet) {
    const date = Date(tweet.created_at);
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

  // event listener for form submission
  // sends the input tweet as a query string
  $("#post-tweet").on('submit', function(event) {
    event.preventDefault();
    
    const input = $(this.children[0]).val(); 

    if (input.length > 140) {
      alert("Character count is over 140!");
    } else if (input === null) {
      alert("Input is null");
    } else if (!input) {
      alert("Input is an empty string");
    } else {
      const queryString = $(this).serialize();
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: queryString
      });
    }
  });

  // renders data from /tweets onto the main page
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
    .then((data) => {
      renderTweets(data);
    });
  }; 
  loadTweets();
});
