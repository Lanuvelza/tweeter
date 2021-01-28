$(document).ready(function() {
  // --- our code goes here ---
  const num = $(".counter").val();

  $("#post-tweet").on('keyup', function() {
    let string = $(this.children[0]).val();
    const counter = $(this.children[1].children[1]);
    counter.val(num - string.length);
    let count = num - string.length;
    if (count < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "#545149");
    }
  });

});