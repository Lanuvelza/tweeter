$(document).ready(function() {
  // --- our code goes here ---  
  const num = $(".counter").val(); 
  $("#tweet-text").on('keyup', function() {
    let string = $(this).val(); 
    $(".counter").val(num - string.length);
    let count = num - string.length;
    if (count <= 0) {
      $(".counter").css("color", "red")
    } else {
      $(".counter").css("color", "#545149");
    }
  });
});