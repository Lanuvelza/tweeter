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
  $(".new-tweet").hide();

  // returns the the HTML structure of the tweet
  const createTweetElement = function(tweet) {
    // uses jQuery timeago to change the timestamps formatted to the time passed from when tweet is posted
    // example ("4 minutes ago" or "1 day ago")
    const date = $.timeago(new Date(tweet.created_at));
    const markup = ` 
    <article>
      <header class="tweet-header">
        <span class="user"><img src=${tweet.user.avatars}> ${tweet.user.name}</span>
        <span class="usertag">${tweet.user.handle}</span>
      </header>
      <section>${escape(tweet.content.text)}</section>
      <footer>
        ${date}
        <div class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
   `;
    return markup;
  };

  // appends the tweet into the container
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $(".tweet-feed").prepend(createTweetElement(tweet));
    }
  };

  // event listener for form submission
  // sends the input tweet as a query string
  $("#post-tweet").on('submit', function(event) {
    event.preventDefault();
    const input = $(this.children[0]).val().trim();
    // checks to validate input if requirements are met
    if (input.length > 140) {
      showError("Error! : Character count is over 140!");
    } else if (input === null) {
      showError("Error! : Input is null");
    } else if (!input) {
      showError("Error! : Cannot be empty!");
    } else {
      hideError();
      const queryString = $(this).serialize();
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: queryString
      })
        .done(() => {
          loadRecentTweet();
          // resets the form
          $(this.children[0]).val("");
          $(this.children[1].children[1]).val(140);
        })
        .fail(error => console.log(error));
    }
  });

  // renders data from /tweets onto the main page
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
      .done((data) => {
        renderTweets(data);
      })
      .fail(error => console.log(error));
  };

  loadTweets();

  // renders the most recent tweet
  const renderRecentTweet = function(tweet) {
    $(".tweet-feed").prepend(createTweetElement(tweet));

  };

  // loads the most recent tweet
  const loadRecentTweet = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
      .done((data) => {
        renderRecentTweet(data[data.length - 1]);
      })
      .fail(error => console.log(error));
  };

  // escape function to prevent cross-site scripting
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // displays error message if invalid
  const showError = function(message) {
    $(".tweet-error").slideUp(() => {
      $(".tweet-error").slideDown().text(message);
    });
  };

  // hides error message if valid
  const hideError = function() {
    $(".tweet-error").slideUp();
  };

  // displays or hides the form on click of write a tweet button
  $(".tweet").on('click', function() {
    $(".new-tweet").slideToggle();
    hideError();
    $("#tweet-text").focus();
  });

  // displays or hides scroll button depending how far down the main page
  $(document).scroll(function() {
    $(".scroll button").hide();
    let scroll = $(window).scrollTop();
    if (scroll >= 300) {
      $(".scroll button").show();
      $(".tweet").hide();
      $(".new-tweet").slideUp();
    } else {
      $(".scroll button").hide();
      $(".tweet").show();
    }
  });

  // scrolls back to the top of the page when clicking scroll button
  $(".scroll button").on('click', function() {
    $(document).scrollTop(0);
    $(".new-tweet").slideDown();
    $("#tweet-text").focus();
  });

});
